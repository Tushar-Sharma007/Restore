import { Fragment } from "react/jsx-runtime";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";

export default function Catalog() {
  const {data, isLoading} = useFetchProductsQuery();
  if (isLoading || !data) return <div>Loading products...</div>;
  return (
    <Fragment>
      <ProductList products={data} />
    </Fragment>
  )
}