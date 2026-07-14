import React, { useEffect, useState } from "react";
import UserTable from "../../components/admin/UserTable";
import { apiConnector } from "../../services/apiconnector";
import { adminEndpoints } from "../../services/apis";

const { ADMIN_USERS_API } = adminEndpoints;

const Users = () => {

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {

      const token = localStorage.getItem("adminToken");

      const response = await apiConnector(
        "GET",
        ADMIN_USERS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setUsers(response.data.data || response.data.users || []);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">
          Users
        </h1>

        <p className="mt-1 text-sm text-richblack-300">
          All registered platform users.
        </p>
      </div>

      <UserTable users={users} />

    </div>
  );
};

export default Users;
