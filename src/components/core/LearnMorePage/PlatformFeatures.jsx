import React from "react";
import HighlightText from "../HomePage/HighlightText";
import {
  FaVideo,
  FaComments,
  FaMobileAlt,
  FaChartLine,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const platformFeatures = [
  { icon: FaVideo, title: "HD Video Lectures", desc: "Crisp, downloadable lessons you can rewatch anytime." },
  { icon: FaComments, title: "Live Doubt Support", desc: "Get unstuck fast with mentor Q&A sessions." },
  { icon: FaMobileAlt, title: "Learn on Mobile", desc: "Fully responsive experience across every device." },
  { icon: FaChartLine, title: "Progress Tracking", desc: "Visual dashboards that show exactly where you stand." },
  { icon: FaShieldAlt, title: "Secure Payments", desc: "Industry-standard encryption on every transaction." },
  { icon: FaHeadset, title: "24/7 Support", desc: "A support team that's always just a message away." },
];

const PlatformFeatures = () => {
  return (
    <section className="bg-richblack-900 py-20">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Platform <HighlightText text={"Features"} />
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformFeatures.map((f, i) => (
            <div
              key={i}
              data-reveal
              className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-richblack-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-yellow-50">
                <f.icon className="text-lg" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-richblack-5">{f.title}</h3>
                <p className="mt-1 text-[13px] leading-6 text-richblack-300">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
