import { useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getProductsPagination,
} from "../redux/slice/ProductSlice";
import LoadingSpinner from "../helper/Spinner";
import CustomePagination from "../utils/Pagination";

const ProductPage = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { products, isLoading, error } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  let pageCount = 0;

  try {
    if (products.paginationResult) {
      pageCount = products.paginationResult.numberOfPages;
    } else {
      pageCount = 0;
    }
  } catch (e) {
    console.log(e);
  }
  const handelOnSelectPage = (page) => {
    dispatch(getProductsPagination(page));
  };

  return (
    <div className="container text-center py-8 ">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-18 py-4 gap-8  ">
          {products.data ? (
            products.data.map((product) => {
              return <ProductCard key={product.id} product={product} />;
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

export default ProductPage;
