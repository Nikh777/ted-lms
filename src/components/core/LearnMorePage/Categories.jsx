import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLayerGroup } from "react-icons/fa";
import HighlightText from "../HomePage/HighlightText";
import { apiConnector } from "../../../services/apiconnector";
import { categories } from "../../../services/apis";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setCategoryList(res?.data?.data || []);
      } catch (error) {
        console.log("Could not fetch categories on Learn More page.", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="bg-richblack-900 py-20">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Explore <HighlightText text={"Categories"} />
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-[100px] animate-pulse rounded-2xl border border-white/[0.06] bg-richblack-800/50" />
            ))
          ) : categoryList.length > 0 ? (
            categoryList.slice(0, 6).map((cat) => (
              <Link
                key={cat._id}
                to={`/catalog/${cat.name?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                data-reveal
                className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-richblack-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-yellow-50">
                    <FaLayerGroup className="text-lg" />
                  </div>
                  <span className="text-[15px] font-semibold text-richblack-5">{cat.name}</span>
                </div>
                <FaArrowRight className="text-richblack-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-yellow-50" />
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-richblack-400">No categories found yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
