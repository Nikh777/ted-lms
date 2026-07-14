import React from "react"

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">Admin Profile</h1>
        <p className="mt-1 text-sm text-richblack-300">Admin account information.</p>
      </div>

      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 text-xl font-semibold text-richblack-900">
          A
        </div>
        <div className="mt-5 space-y-2">
          <p className="text-lg font-medium text-richblack-5">Admin</p>
          <p className="text-sm text-richblack-300">admin@ted-edu.com</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
