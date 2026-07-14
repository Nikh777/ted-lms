import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LearnMore from "./pages/LearnMore";
import BookDemo from "./pages/BookDemo";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error"
import Settings from "./components/core/Dashboard/Settings";
import { useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CatalogExplorer from "./pages/CatalogExplorer";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import AdminLayout from "./layouts/AdminLayout";
import BecomeInstructor from "./components/core/Dashboard/BecomeInstructor";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import InstructorRequests from "./pages/Admin/InstructorRequests";
import Instructors from "./pages/Admin/Instructors";
import Courses from "./pages/Admin/Courses";
import Payments from "./pages/Admin/Payments";
import Analytics from "./pages/Admin/Analytics";
import Profile from "./pages/Admin/Profile";
import DemoRequests from "./pages/Admin/DemoRequests";

import PrivacyPolicyPage from './pages/PrivacyPolicy';
import TermsOfServicePage from './pages/TermsOfService';
import CookiePolicyPage from './pages/CookiePolicy';
import CookieBanner from './components/common/CookieBanner';

function App() {

  const location = useLocation();

  const { user } = useSelector((state) => state.profile)


  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <a href="#main-content" className="skip-to-content">Skip to main content</a>
    {!location.pathname.startsWith("/admin") && <Navbar />}
    <main id="main-content" className="flex flex-1 flex-col">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/catalog" element={<CatalogExplorer/>} />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="courses/:courseId" element={<CourseDetails/>} />

      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

    <Route
          path="/about"
          element={

              <About />

          }
        />
    <Route path="/contact" element={<Contact />} />
    <Route path="/learn-more" element={<LearnMore />} />
    <Route path="/book-demo" element={<BookDemo />} />

    {/* Privacy / Terms / Cookie pages */}
    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    <Route path="/terms" element={<TermsOfServicePage />} />
    <Route path="/cookie-policy" element={<CookiePolicyPage />} />

    <Route
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />

      <Route path="dashboard/Settings" element={<Settings />} />


      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="dashboard/become-instructor" element={<BecomeInstructor />} />
          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />

          </>
        )
      }


    </Route>


      <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>

    {/* ===================== ADMIN ===================== */}

     <Route path="/admin/login" element={<AdminLogin />} />

<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="users" element={<Users />} />
  <Route path="instructor-requests" element={<InstructorRequests />} />
  <Route path="instructors" element={<Instructors />} />
  <Route path="courses" element={<Courses />} />
  <Route path="payments" element={<Payments />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="profile" element={<Profile />} />
  <Route path="demo-requests" element={<DemoRequests />} />
</Route>

    <Route path="*" element={<Error />} />


    </Routes>
    </main>

    {/* Modern Vercel-style cookie banner */}
    <CookieBanner />

   </div>
  );
}

export default App;