/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import LoadingSpinner from "../../helper/Spinner";
import BrandCard from "../brand/BrandCard";
import CustomeButton from "../../utils/CustomeButton";
const BrandContainer = ({ brands, brandLoading }) => {
  return (
    <>
      <CustomeButton pathname="/brand" title="All Brands" />
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {brandLoading ? (
          <LoadingSpinner />
        ) : (
          brands.data &&
          brands.data.map((cat) => {
            return (
              <SwiperSlide key={cat.id}>
                <BrandCard name={cat.name} image={cat.image} />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </>
  );
};

export default BrandContainer;
