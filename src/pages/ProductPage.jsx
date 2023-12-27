import { useEffect, useState } from "react";
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
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    if (products.data) {
      setAllProducts(products.data);
    }
  }, [products]);

  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    try {
      if (products.paginationResult) {
        setPageCount(products.paginationResult.numberOfPages);
      }
    } catch (e) {
      console.log(e);
    }
  }, [products]);

  const handelOnSelectPage = (page) => {
    dispatch(getProductsPagination(page));
  };

  return (
    <div className="container text-center py-8 ">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-18 py-4 gap-8  ">
          {allProducts ? (
            allProducts.map((product) => {
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
