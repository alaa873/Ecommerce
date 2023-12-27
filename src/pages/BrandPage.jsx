import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBrnads, getBrnadsPagination } from "../redux/slice/BrandSlice";
import CustomePagination from "../utils/Pagination";
import BrandCard from "../components/brand/BrandCard";
import LoadingSpinner from "../helper/Spinner";
const BrandPage = () => {
  const { brands, isLoading } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrnads(8));
  }, []);
  console.log(brands);
  let pageCount = 0;

  try {
    if (brands.paginationResult) {
      pageCount = brands.paginationResult.numberOfPages;
    } else {
      pageCount = 0;
    }
  } catch (e) {
    console.log(e);
  }
  const handelOnSelectPage = (page) => {
    dispatch(getBrnadsPagination(page));
  };
  return (
    <div className="container ">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-16 gap-4 py-8  ">
          {brands.data ? (
            brands.data.map((brand) => {
              return (
                <BrandCard
                  key={brand.id}
                  name={brand.name}
                  image={brand.image}
                />
              );
            })
          ) : (
            <p>no product found</p>
          )}
        </div>
      )}
      <CustomePagination
        handelOnSelectPage={handelOnSelectPage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default BrandPage;
