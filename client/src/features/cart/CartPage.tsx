import { Grid, Typography } from "@mui/material";
import { useFetchCartQuery } from "./cartApi"
import CartItem from "./CartItem";
import OrderSummary from "../../app/shared/components/OrderSummary";

export default function CartPage() {
    const {data,isLoading} = useFetchCartQuery();
    if(isLoading) return <Typography>Loading Cart...</Typography>

    if(!data || data.items.length === 0) return <Typography variant="h3">Your basket is empty</Typography>
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {data.items.map(item => (
            <CartItem item={item} key={item.productId}></CartItem>
        ))}
      </Grid>
      <Grid size={4}>
        <OrderSummary/>
      </Grid>
    </Grid>
  )
}