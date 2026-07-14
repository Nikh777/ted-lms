import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DemoRequestTable from "../../components/admin/DemoRequestTable";
import { apiConnector } from "../../services/apiconnector";
import { demoEndpoints } from "../../services/apis";

const { ADMIN_DEMO_REQUESTS_API } = demoEndpoints;

const DemoRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRequests = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await apiConnector("GET", ADMIN_DEMO_REQUESTS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (response.data.success) {
        setRequests(response.data.data || []);
      }
    } catch (error) {
      console.log("GET DEMO REQUESTS ERROR =", error);
      toast.error("Could not load demo requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleMarkCompleted = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await apiConnector(
        "PUT",
        `${ADMIN_DEMO_REQUESTS_API}/${id}`,
        { status: "Completed" },
        { Authorization: `Bearer ${token}` }
      );

      if (response.data.success) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: "Completed" } : r))
        );
        toast.success("Marked as completed.");
      }
    } catch (error) {
      console.log("UPDATE DEMO REQUEST ERROR =", error);
      toast.error("Could not update this request.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await apiConnector(
        "DELETE",
        `${ADMIN_DEMO_REQUESTS_API}/${id}`,
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (response.data.success) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
        toast.success("Request deleted.");
      }
    } catch (error) {
      console.log("DELETE DEMO REQUEST ERROR =", error);
      toast.error("Could not delete this request.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">Demo Requests</h1>
        <p className="mt-1 text-sm text-richblack-300">
          Leads who requested a live product demo.
        </p>
      </div>

      {loading ? (
        <p className="text-richblack-300">Loading requests...</p>
      ) : (
        <DemoRequestTable
          requests={requests}
          onMarkCompleted={handleMarkCompleted}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default DemoRequests;
