import React, { useEffect, useState } from "react";
import HighlightText from "../HomePage/HighlightText";
import CourseCard from "../Catalog/Course_Card";
import { apiConnector } from "../../../services/apiconnector";
import { courseEndpoints } from "../../../services/apis";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API);
        setCourses(res?.data?.data || []);
      } catch (error) {
        console.log("Could not fetch featured courses.", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="bg-richblack-900 py-20">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Featured <HighlightText text={"Courses"} />
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-[280px] animate-pulse rounded-2xl border border-white/[0.06] bg-richblack-800/50" />
            ))
          ) : courses.length > 0 ? (
            courses
              .slice(0, 6)
              .map((course) => (
                <div
                  key={course._id}
                  data-reveal
                  className="rounded-2xl border border-white/[0.07] bg-richblack-800/50 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.14]"
                >
                  <CourseCard course={course} Height="h-[180px]" />
                </div>
              ))
          ) : (
            <p className="col-span-full text-center text-richblack-400">No courses available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
