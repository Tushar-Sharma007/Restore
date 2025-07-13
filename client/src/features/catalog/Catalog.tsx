import { Fragment } from "react/jsx-runtime";
import type { Product } from "../../app/models/product";

import ProductList from "./ProductList";

type Props = {
  products : Product[];  
}

export default function Catalog({products} : Props) {
  return (
    <Fragment>
      <ProductList products={products} />
    </Fragment>
  )
}