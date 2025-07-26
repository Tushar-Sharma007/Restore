import AppPagination from "../../app/shared/components/AppPagination";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import { Grid, Typography } from "@mui/material";
import { setPageNumber } from "./catalogSlice";
import Filters from "./Filters";

export default function Catalog() {
  const productParams = useAppSelector(state => state.catalog)
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filtersData, isLoading: filtersLoading } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();
  if (isLoading || !data || !filtersData || filtersLoading) return <div>Loading products...</div>;
  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters filtersData={filtersData}/>
      </Grid>
      <Grid size={9}>
        {data.items && data.items.length > 0 ? (
          <>
          <ProductList products={data.items} />
          <AppPagination
            metadata={data.pagination}
            onPageChange={(page: number) => {
              dispatch(setPageNumber(page));
              window.scrollTo({top:0, behavior:'smooth'})
            }}
          />
        </>
        ) : (
          <Typography variant="h5">There are no results</Typography>
        )}
      </Grid>
    </Grid>
  )
}