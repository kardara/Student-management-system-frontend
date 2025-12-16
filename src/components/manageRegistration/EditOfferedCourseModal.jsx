import React, { useState, useEffect } from "react";
import { manageOfferedCoursesService } from "../../services/manageOfferedCoursesService";
import { toast } from "react-toastify";
import Button from "../forms/Button";
import InputField from "../forms/InputField";

export default function EditOfferedCourseModal({ isOpen, courseId, onClose }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen && courseId) {
      fetchCourse();
    }
  }, [isOpen, courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await manageOfferedCoursesService.getById(courseId);
      setCourse(response);
      setFormData({
        group: response.group || "",
        day: response.day || "",
        time: response.time || "",
        room: response.room || "",
        size: response.size || "",
      });
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Failed to load course details", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // Prepare the full offered course object with updated data
      const updatedCourse = {
        ...course,
        ...formData,
      };
      await manageOfferedCoursesService.update(
        updatedCourse,
        course.course.id,
        course.semester.id,
        course.teacher.id
      );
      toast.success("Course updated successfully", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
      onClose();
      // Refresh the parent component
      window.location.reload();
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-bg-light dark:bg-bg-dark rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
            Edit Offered Course
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-light dark:border-primary-dark"></div>
          </div>
        ) : course ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">
                Course: {course.course?.name} ({course.course?.code})
              </p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Teacher: {course.teacher?.firstName} {course.teacher?.lastName}
              </p>
            </div>

            <InputField
              value={formData.group}
              onChange={handleInputChange}
              name="group"
              placeholder="Group"
            />

            <InputField
              value={formData.day}
              onChange={handleInputChange}
              name="day"
              placeholder="Day (e.g., Monday)"
            />

            <InputField
              value={formData.time}
              onChange={handleInputChange}
              name="time"
              type="time"
              placeholder="Time"
            />

            <InputField
              value={formData.room}
              onChange={handleInputChange}
              name="room"
              placeholder="Room"
            />

            <InputField
              value={formData.size}
              onChange={handleInputChange}
              name="size"
              type="number"
              placeholder="Class Size"
            />

            <div className="flex gap-2 pt-4">
              <Button
                name="Save Changes"
                onClick={handleSave}
                loading={loading}
                className="flex-1"
              />
              <Button
                name="Cancel"
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600"
              />
            </div>
          </div>
        ) : (
          <p className="text-center py-8 text-text-secondary-light dark:text-text-secondary-dark">
            Course not found
          </p>
        )}
      </div>
    </div>
  );
}
