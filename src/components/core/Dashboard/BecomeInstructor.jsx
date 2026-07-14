import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import IconBtn from "../../common/IconBtn"
import {
  getInstructorApplication,
  submitInstructorApplication,
} from "../../../services/operations/instructorApplicationAPI"

export default function BecomeInstructor() {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [application, setApplication] = useState(null)
  const [formData, setFormData] = useState({
    resume: null,
    linkedin: "",
    portfolio: "",
    experience: "",
    about: "",
  })

  useEffect(() => {
    const fetchApplication = async () => {
      if (!token) return

      const response = await getInstructorApplication(token)
      if (response.success) {
        setApplication(response.data)
      }
    }

    fetchApplication()
  }, [token])

  const handleChange = (event) => {
    const { name, value, files } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const data = new FormData()
    data.append("resume", formData.resume)
    data.append("linkedin", formData.linkedin)
    data.append("portfolio", formData.portfolio)
    data.append("experience", formData.experience)
    data.append("about", formData.about)

    const response = await submitInstructorApplication(data, token)
    if (response.success) {
      setApplication(response.data)
      setFormData({
        resume: null,
        linkedin: "",
        portfolio: "",
        experience: "",
        about: "",
      })
      event.target.reset()
    }

    setLoading(false)
  }

  const isPending = application?.status === "Pending"
  const isApproved = application?.status === "Approved"

  return (
    <div className="text-richblack-5">
      <h1 className="mb-8 text-3xl font-medium">Become an Instructor</h1>

      {application && (
        <div className="mb-6 rounded-md border border-richblack-700 bg-richblack-800 p-5">
          <p className="text-sm font-medium text-richblack-100">
            Application Status:{" "}
            <span className="text-yellow-50">{application.status}</span>
          </p>
          {isPending && (
            <p className="mt-2 text-sm text-richblack-300">
              Application submitted successfully. Waiting for Admin approval.
            </p>
          )}
          {isApproved && (
            <p className="mt-2 text-sm text-richblack-300">
              Your instructor application has been approved. Login again to
              access the instructor dashboard.
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-md border border-richblack-700 bg-richblack-800 p-6"
      >
        <label>
          <p className="mb-2 text-sm text-richblack-5">
            Resume Upload <sup className="text-pink-200">*</sup>
          </p>
          <input
            required={!isPending}
            disabled={isPending}
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full rounded-md bg-richblack-700 p-3 text-richblack-100 file:mr-4 file:rounded-md file:border-0 file:bg-yellow-50 file:px-4 file:py-2 file:font-semibold file:text-richblack-900"
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <label>
            <p className="mb-2 text-sm text-richblack-5">LinkedIn URL</p>
            <input
              disabled={isPending}
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full rounded-md bg-richblack-700 p-3 text-richblack-100 outline-none"
            />
          </label>

          <label>
            <p className="mb-2 text-sm text-richblack-5">Portfolio URL</p>
            <input
              disabled={isPending}
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              className="w-full rounded-md bg-richblack-700 p-3 text-richblack-100 outline-none"
            />
          </label>
        </div>

        <label>
          <p className="mb-2 text-sm text-richblack-5">
            Years of Experience <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            disabled={isPending}
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Example: 3 years"
            className="w-full rounded-md bg-richblack-700 p-3 text-richblack-100 outline-none"
          />
        </label>

        <label>
          <p className="mb-2 text-sm text-richblack-5">
            About Yourself <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            required
            disabled={isPending}
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="6"
            placeholder="Tell us about your teaching experience, expertise, and course ideas."
            className="w-full resize-none rounded-md bg-richblack-700 p-3 text-richblack-100 outline-none"
          />
        </label>

        <IconBtn
          type="submit"
          text={isPending ? "Application Pending" : "Submit Application"}
          disabled={loading || isPending}
          customClasses="w-fit"
        />
      </form>
    </div>
  )
}
