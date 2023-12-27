import CustomeButton from "../utils/CustomeButton";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/slice/ProductSlice";
import { Suspense, lazy, useEffect, useState } from "react";
import LoadingSpinner from "../helper/Spinner";
import { getCategories } from "../redux/slice/CategorySlice";
import { getBrnads } from "../redux/slice/BrandSlice";
const Categorycontainer = lazy(() =>
  import("../components/home/Categorycontainer")
);
const BrandContainer = lazy(() => import("../components/home/BrandContainer"));
const ProductCard = lazy(() => import("../components/products/ProductCard"));
const Gallery = lazy(() => import("../components/home/Gallery"));

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);
  const [allProducts, setAllProducts] = useState([]);
  const { category } = useSelector((state) => state.category);
  const catLoading = useSelector((state) => state.category.isLoading);
  const { brands } = useSelector((state) => state.brand);
  const brandLoading = useSelector((state) => state.brand.isLoading);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories(10));
    dispatch(getBrnads(10));
  }, []);
  useEffect(() => {
    if (products.data) {
      setAllProducts(products);
    }
  }, [products]);

  return (
    <div className="container ">
      <Suspense fallback={<LoadingSpinner />}>
        <Gallery />
      </Suspense>
      <div className="py-4">
        <Suspense fallback={<LoadingSpinner />}>
          <Categorycontainer catLoading={catLoading} category={category} />
        </Suspense>
      </div>
      <CustomeButton
        name="Products"
        pathname="/products"
        title="All Products"
      />
      <Suspense fallback={<LoadingSpinner />}>
        {!error ? (
          isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid  grid-cols-18  py-4 gap-8  ">
              {allProducts.data ? (
                allProducts.data.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })
              ) : (
                <p>no product found</p>
              )}
            </div>
          )
        ) : (
          <span className="flex justify-center items-center my-4 p-4 bg-red-100 text-red-800 text-xl font-medium  py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            {error}
          </span>
        )}
      </Suspense>

      <div className="py-4">
        <Suspense fallback={<LoadingSpinner />}>
          <BrandContainer brandLoading={brandLoading} brands={brands} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;

// eslint-disable-next-line react-refresh/only-export-components
