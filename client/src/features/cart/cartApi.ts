import { createApi } from "@reduxjs/toolkit/query/react";
import { Item, type Cart } from "../../app/models/Cart";
import { baseQueryWithErrorhandling } from "../../app/api/baseApi";
import type { Product } from "../../app/models/product";

function isCartItem(product: Product | Item): product is Item{
    return (product as Item).quantity !== undefined;
}

export const cartApi = createApi({
    reducerPath : 'cartApi',
    baseQuery : baseQueryWithErrorhandling,
    tagTypes: ['Cart'],
    endpoints : (builder) => ({
        fetchCart : builder.query<Cart, void>({
            query : () => 'cart',
            providesTags: ['Cart'] 
        }),
        addCartItem : builder.mutation<Cart, {product : Product | Item, quantity : number}>({
            query : ({product, quantity}) => {
                const productId = isCartItem(product) ? product.productId: product.id;
                return{
                    url: `cart?productId=${productId}&quantity=${quantity}`,
                    method : 'POST'
                } 
            },
            onQueryStarted: async ({product, quantity}, {dispatch, queryFulfilled}) => {
                let isNewBasket = false;
                const patchResults = dispatch(
                    cartApi.util.updateQueryData('fetchCart', undefined, (draft) => {
                        const productId = isCartItem(product) ? product.productId: product.id;

                        if (!draft?.cartId) isNewBasket = true;

                        if(!isNewBasket){
                            const existingItem = draft.items.find(item => item.productId === productId);
                            if(existingItem) existingItem.quantity += quantity;
                            else draft.items.push(isCartItem(product)? product : {...product, productId : product.id, quantity});
                        }    
                    })
                )

                try{
                    await queryFulfilled;
                    if(isNewBasket) dispatch(cartApi.util.invalidateTags(['Cart']));
                }
                catch(error){
                    console.log(error);
                    patchResults.undo();
                }
            }
        }),
        removeBasketItem : builder.mutation<void, {productId : number, quantity : number}>({
            query: ({productId, quantity}) => ({
                url : `cart?productId=${productId}&quantity=${quantity}`,
                method : 'DELETE'
            }),
            onQueryStarted: async ({productId, quantity}, {dispatch, queryFulfilled}) => {
                const patchResults = dispatch(
                    cartApi.util.updateQueryData('fetchCart',undefined, (draft) => {
                        const itemIndex = draft.items.findIndex(item => item.productId === productId);
                        if(itemIndex >= 0){
                            draft.items[itemIndex].quantity -= quantity;
                            if(draft.items[itemIndex].quantity <= 0){
                                draft.items.splice(itemIndex,1);
                            }
                        }
                    })
                )
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                    patchResults.undo();
                }
            }
        })
    })
});

export const {useFetchCartQuery,useAddCartItemMutation, useRemoveBasketItemMutation} = cartApi;