import { useEffect } from "react";
import CatCard from "../components/category/catCard"
import { getCategories, getCategoryPagination } from "../redux/slice/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../helper/Spinner";
import CustomePagination from "../utils/Pagination";

const CategoryPage = () => {
    const dispatch = useDispatch()
    const { category, isLoading } = useSelector(state => state.category)
    useEffect(() => {
        dispatch(getCategories(8))
    }, []);
    let pageCount = 0;

    try {
        if (category.paginationResult) {
            pageCount = category.paginationResult.numberOfPages;
        }
        else {
            pageCount = 0
        }
    } catch (e) {
        console.log(e)
    }
    const handelOnSelectPage = (page) => {
        dispatch(getCategoryPagination(page));
    }
    return (
        <div className="container ">

            {
                isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-16 gap-4 py-8  ">
                        {
                            category.data ? (category.data.map((category) => {
                                return (
                                    <CatCard key={category.id} name={category.name} image={category.image} />
                                )
                            })) : (
                                <p>no product found</p>
                            )
                        }
                    </div>
                )
            }
            <CustomePagination handelOnSelectPage={handelOnSelectPage} pageCount={pageCount} />
        </div>
    )
}

export default CategoryPage