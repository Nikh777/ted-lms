import React from "react"
import { Outlet } from "react-router-dom"
import AdminNavbar from "../components/admin/AdminNavbar"
import AdminSidebar from "../components/admin/AdminSidebar"

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-richblack-900">
      <AdminSidebar />
      <div className="min-h-screen lg:pl-64">
        <AdminNavbar />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
