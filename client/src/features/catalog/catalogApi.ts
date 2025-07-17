import { createApi} from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/product";
import { baseQueryWithErrorhandling } from "../../app/api/baseApi";


export const catalogApi = createApi({
    reducerPath: "catalogApi",
    baseQuery: baseQueryWithErrorhandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[],void>({
            query: () => ({url: 'products'})
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (productId) => `products/${productId}`
        })
    })
});

export const {useFetchProductDetailsQuery, useFetchProductsQuery} = catalogApi;