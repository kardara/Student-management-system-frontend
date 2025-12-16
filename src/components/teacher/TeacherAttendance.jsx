import React, { useState } from 'react'
import { manageTeachersService } from '../../services/manageTeachersService';
import { manageStudentRegistrationService } from '../../services/manageStudentRegistrationService';

export default function TeacherAttendance() {

  const data = useAuth();
    const user = data?.user;
  
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentsLists, setStudentsLists] = useState([]);
  
    useEffect(() => {
      if (user?.uuid) {
        manageTeachersService.getTeacherCourse(user.uuid).then((a) => {
          console.log(a);
          setCourses(a || []);
          setLoading(false);
        }).catch((error) => {
          console.error('Error fetching courses:', error);
          setLoading(false);
        });
      }
    }, [user?.uuid]);

     useEffect(() => {
      if (courses) {
        const temp = [];
        Promise.all(courses.map((course) => manageStudentRegistrationService.getStudentByOfferedCourse(course.id)))
        .then((a) => {
          a.forEach(element => {
            temp.push({courseName: courses.find(c => c.id == element.courseId).name, list: element});
          });
          
        })
        manageStudentRegistrationService.getStudentByOfferedCourse().then((a) => {
          console.log(a);
          setCourses(a || []);
          setLoading(false);
        }).catch((error) => {
          console.error('Error fetching courses:', error);
          setLoading(false);
        });
      }
    }, [courses]);

    

  
  return (
    <div>StudentAttendance</div>
  )
}
