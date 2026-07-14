import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 mx-auto lg:grid-cols-2">
          <div className="w-full max-w-[450px] mx-auto lg:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-tight tracking-tight text-richblack-5 break-words lg:text-[2.1rem]">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem] break-words">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative w-full max-w-[450px] mx-auto lg:mx-0 order-first lg:order-last">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className="w-full h-auto"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10 w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template