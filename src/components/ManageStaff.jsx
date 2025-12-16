import React, { useEffect, useState } from "react";
import ManagementComponentHeader from "./UI/ManagementComponentHeader";
import InputField from "./forms/InputField";
import { manageStaffService } from "../services/manageStaffService";
import LoadingComponents from "./UI/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageStaff() {
  const [staffs, setStaffs] = useState();
  const [filteredStaffs, setFilteredStaffs] = useState();
  const [rolesFilter, setRolesFilter] = useState("");
  const [searchString, setSearchString] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const rows = 10;

  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = filteredStaffs?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(staffs?.length / rows);

  const navigate = useNavigate();

  const headers = ["S/N", "Full Name", "Email", "Role"];

  const handlePageChange = (v) => setCurrentPage(v);

  const applyFilter = (a) => {
    const searcByString = (searchedValue, item) => {
      const b = item.firstName.concat(item.lastName, item.email).toLowerCase();
      if (b.includes(searchedValue.toLowerCase())) {
        return true;
      }
      return false;
    };

    if (searchString && rolesFilter) {
      return a.filter(
        (e) =>
          searcByString(searchString, e) &&
          rolesFilter.toLowerCase() == e.role.toLowerCase()
      );
    }

    if (rolesFilter) {
      return a.filter((e) => rolesFilter.toLowerCase() == e.role.toLowerCase());
    }
    if (searchString) {
      return a.filter((e) => searcByString(searchString, e));
    }
    return a;
  };

  const deleteStaff = (email) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      manageStaffService.delete(email).then(() => {
        toast.success("Staff deleted successfully");
        setStaffs(staffs.filter(s => s.email !== email));
      }).catch(err => toast.error(err));
    }
  };

  useEffect(() => {
    const fetchStaffData = () => {
      manageStaffService.get().then((a) => {
        console.log(a);
        setStaffs(a);
        setFilteredStaffs(a);
        setLoading(false);
      });
    };

    fetchStaffData();
  }, []);

  useEffect(() => {
    if (staffs) {
      setFilteredStaffs(applyFilter(staffs));
    }
  }, [searchString, rolesFilter]);

  if (loading) {
    return (
      <div className=" flex h-full justify-center items-center ">
        {" "}
        <LoadingComponents type="dots" />{" "}
      </div>
    );
  }

  return (
    <>
      <div
        className="flex flex-col"
        style={{
          display: showAddModal ? "none" : "flex",
        }}
      >
        <ManagementComponentHeader
          title="Staff"
          name="+ Add Staff"
          setShowAddModal={setShowAddModal}
        />

        <div className="flex flex-col gap-2  lg:flex-row lg:gap-3">
          <div>
            <input
              type="search"
              placeholder=" search..."
              className="p-1 bg-bg-secondary-light dark:bg-bg-secondary-dark"
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <div>
            {/* Roles */}
            <select
              className="p-1 bg-bg-secondary-light dark:bg-bg-secondary-dark"
              onChange={(e) => setRolesFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="ACCOUNTANT">Accountant</option>
              <option value="REGISTRAR">Registrar</option>
              <option value="DEAN">Dean</option>
              <option value="HOD">HOD</option>
            </select>
          </div>
        </div>

        <div className="md:mt-5">
          <div className="flex flex-col lg:items-center">
            <div className="  overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    {headers.map((h, id) => (
                      <th key={id}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, id) => (
                    <tr
                      key={id}
                      className="hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark"
                    >
                      <td className="text-center">{id + 1}</td>
                      <td> {`${item.firstName} ${item.lastName}`}</td>
                      <td> {item.email}</td>
                      <td>{item.role}</td>
                      <td
                        className=""
                        onClick={() => deleteStaff(item.email)}
                      >
                        {" "}
                        <span className="uppercase cursor-pointer text-sm p-2 font-black text-error-light dark:text-error-dark">
                          Delete
                        </span>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className=" flex justify-center p-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                      padding: "5px 10px",
                      margin: "0 5px",
                      cursor: "pointer",
                      backgroundColor:
                        currentPage === index + 1 ? "#007bff" : "#ccc",
                      color: currentPage === index + 1 ? "white" : "black",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
