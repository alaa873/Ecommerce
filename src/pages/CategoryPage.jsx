import { useEffect, useState } from "react";
import CatCard from "../components/category/catCard";
import {
  getCategories,
  getCategoryPagination,
} from "../redux/slice/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../helper/Spinner";
import CustomePagination from "../utils/Pagination";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { category, isLoading } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategories(8));
  }, []);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    try {
      if (category.paginationResult) {
        setPageCount(category.paginationResult.numberOfPages);
      }
    } catch (e) {
      console.log(e);
    }
  }, [category]);

  const handelOnSelectPage = (page) => {
    dispatch(getCategoryPagination(page));
  };
  return (
    <div className="container ">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-16 gap-4 py-8  ">
          {category.data ? (
            category.data.map((category) => {
              return (
                <CatCard
                  key={category.id}
                  name={category.name}
                  image={category.image}
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

export default CategoryPage;
