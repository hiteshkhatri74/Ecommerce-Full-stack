import SummaryApi from "../common"

const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
        method : SummaryApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        }),
    });

    const dataResponse = await response.json();
    console.log("data Response", dataResponse);
    return dataResponse;
}

export default fetchCategoryWiseProduct;