import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/apiconnector";
import { adminEndpoints } from "../../services/apis";

const { ADMIN_LOGIN_API } = adminEndpoints;

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        ADMIN_LOGIN_API,
        formData
      );

      console.log(response);

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem(
          "admin",
          JSON.stringify(response.data.admin)
        );

        alert("Admin Login Successful");

        navigate("/admin/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
  console.log("FULL ERROR =>", error);
  console.log("RESPONSE =>", error.response);

  alert(
    JSON.stringify(error.response?.data, null, 2)
  );
}

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-richblack-900 px-4">
      <div className="w-full max-w-md rounded-lg border border-richblack-700 bg-richblack-800 p-8">

        <h1 className="text-2xl font-semibold text-richblack-5">
          Admin Login
        </h1>

        <p className="mt-2 text-sm text-richblack-300">
          Sign in to access Admin Panel
        </p>

        <form
          onSubmit={submitHandler}
          className="mt-8 space-y-5"
        >

          <label className="block">
            <span className="text-richblack-100">
              Email
            </span>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="mt-2 w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5"
            />
          </label>

          <label className="block">
            <span className="text-richblack-100">
              Password
            </span>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="mt-2 w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5"
  
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-yellow-50 py-3 font-semibold text-black"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default AdminLogin;