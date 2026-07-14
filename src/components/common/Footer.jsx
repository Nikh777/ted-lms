import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

import TedLogo from "./TedLogo";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <footer className="bg-richblack-800 border-t border-white/[0.06]">

      {/* Main footer grid */}
      <div className="mx-auto w-11/12 max-w-maxContent py-14">
        <div className="flex flex-col lg:flex-row border-b border-white/[0.07] pb-10 gap-8">

          {/* Left half */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-white/[0.07] lg:pr-8 gap-6">

            {/* Company */}
            <div className="w-[30%] min-w-[120px] flex flex-col gap-4 mb-4">
              <TedLogo size="sm" />
              <div>
                <h3 className="text-richblack-50 font-semibold text-[13px] uppercase tracking-wider mb-3">
                  Company
                </h3>
                <div className="flex flex-col gap-2">
                  {["About", "Careers", "Affiliates"].map((ele, i) => (
                    <Link
                      key={i}
                      to={ele.toLowerCase()}
                      className="text-[13px] text-richblack-400 hover:text-richblack-50 transition-colors duration-150"
                    >
                      {ele}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 text-richblack-400 mt-1">
                {[FaFacebook, FaGoogle, FaTwitter, FaYoutube].map((Icon, i) => (
                  <Icon
                    key={i}
                    className="text-[16px] hover:text-richblack-50 cursor-pointer transition-colors duration-150"
                  />
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="w-[30%] min-w-[120px] mb-4">
              <h3 className="text-richblack-50 font-semibold text-[13px] uppercase tracking-wider mb-3">
                Resources
              </h3>
              <div className="flex flex-col gap-2">
                {Resources.map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[13px] text-richblack-400 hover:text-richblack-50 transition-colors duration-150"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
              <h3 className="text-richblack-50 font-semibold text-[13px] uppercase tracking-wider mt-6 mb-3">
                Support
              </h3>
              <Link
                to="/help-center"
                className="text-[13px] text-richblack-400 hover:text-richblack-50 transition-colors duration-150"
              >
                Help Center
              </Link>
            </div>

            {/* Plans + Community */}
            <div className="w-[30%] min-w-[120px] mb-4">
              <h3 className="text-richblack-50 font-semibold text-[13px] uppercase tracking-wider mb-3">
                Plans
              </h3>
              <div className="flex flex-col gap-2">
                {Plans.map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[13px] text-richblack-400 hover:text-richblack-50 transition-colors duration-150"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
              <h3 className="text-richblack-50 font-semibold text-[13px] uppercase tracking-wider mt-6 mb-3">
                Community
              </h3>
              <div className="flex flex-col gap-2">
                {Community.map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[13px] text-richblack-400 hover:text-richblack-50 transition-colors duration-150"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right half */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:pl-8 gap-6">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-[30%] min-w-[120px] mb-4">
                <h3 className="text-richblack-50 font-semibold text-[13px] uppercase tracking-wider mb-3">
                  {ele.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {ele.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.link}
                      className="text-[13px] text-richblack-400 hover:text-richblack-50 transition-colors duration-150"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-6 gap-4 text-[12px] text-richblack-400">
          <div className="flex flex-row flex-wrap gap-1">
            {BottomFooter.map((ele, i) => (
              <span key={i} className="flex items-center">
                <Link
                  to={ele.split(" ").join("-").toLowerCase()}
                  className="px-3 hover:text-richblack-50 transition-colors duration-150"
                >
                  {ele}
                </Link>
                {i < BottomFooter.length - 1 && (
                  <span className="text-richblack-600">|</span>
                )}
              </span>
            ))}
          </div>
          <div className="text-richblack-400 text-center">
            Made with ❤️ by Codevive © 2026 Vaini
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
