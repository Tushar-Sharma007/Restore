import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorhandling } from "../../app/api/baseApi";

export const errorApi = createApi({
    reducerPath: "errorApi",
    baseQuery: baseQueryWithErrorhandling,
    endpoints: (builder) => ({
        get400Error : builder.query<void, void>({
            query: () => ({url : 'buggy/bad-request'})
        }),
        get401Error : builder.query<void, void>({
            query: () => ({url : 'buggy/unauthorized'})
        }),
        get402Error : builder.query<void, void>({
            query: () => ({url : 'buggy/not-found'})
        }),
        get500rror : builder.query<void, void>({
            query: () => ({url : 'buggy/server-error'})
        }),
        getValidationError : builder.query<void, void>({
            query: () => ({url : 'buggy/validation-error'})
        }),
    })
});

export const{
    useLazyGet400ErrorQuery,
    useLazyGet401ErrorQuery,
    useLazyGet402ErrorQuery,
    useLazyGet500rrorQuery,
    useLazyGetValidationErrorQuery
} = errorApi;