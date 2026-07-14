import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (response?.data?.success) {
          setReviews(response?.data?.allReviews || []);
        }
      } catch (error) {
        console.log("Review Fetch Error => ", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="text-white w-full">
      <div className="my-10 w-full">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {reviews.length > 0 ? (
            reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-richblack-800/80 p-5 text-[14px] text-richblack-25 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]">

                  {/* User info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="User"
                      className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-[13px] text-richblack-5 leading-tight">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </h1>
                      <h2 className="text-[11px] text-richblack-400 mt-0.5 leading-tight line-clamp-1">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/[0.06]" />

                  {/* Review text */}
                  <p className="text-[13px] leading-6 text-richblack-200">
                    {review?.review?.split(" ").length > truncateWords
                      ? `${review?.review?.split(" ")?.slice(0, truncateWords)?.join(" ")} ...`
                      : review?.review}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-auto">
                    <h3 className="font-bold text-yellow-50 text-[13px]">
                      {review?.rating?.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review?.rating}
                      size={14}
                      edit={false}
                      activeColor="#FFD60A"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center text-richblack-400 py-8">
              No Reviews Found
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
