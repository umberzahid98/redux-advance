
import { uiActions } from "./ui-slice"
import { cartActions } from "./cart-slice"

export const fetchCartData = ()=>{
  return async (dispatch)=> {
    // putting fetch data in seperate fucntion so i can have try catch block
    const fetchData = async ()=>{
      const response = await fetch('https://redux-f30bf-default-rtdb.firebaseio.com/cart.json')// get request is default
      if (!response.ok){
        throw new Error ('could not fetch data ')
      }
      const data = await response.json()
      return data
    }
    try{
      const cartData = await fetchData()
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
      }))

    }catch(error){
      dispatch(uiActions.setNotification({
        status: "Error",
        title: "Error!!",
        message: "fetching cart data failed!"
      }))
    }

  }
}
export const sendCartData= (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.setNotification({
      status: "pending",
      title: "sending...",
      message: "Sending cart data!"
    }))

    const sendRequest = async() =>{
      const response = await fetch('https://redux-f30bf-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT', body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity })} // put will update the existing data unlike post that will add the data in the list
      )
      if(!response.ok){ //if the there was an error
        throw new Error('sending cart data failed')
      }
    }
    try {
      await sendRequest()
      dispatch(uiActions.setNotification({
        status: "success",
        title: "Success",
        message: "Sent cart data successfully!"
      }))
    } catch(error) {
      dispatch(uiActions.setNotification({
        status: "Error",
        title: "Error!!",
        message: "Sending cart data failed!"
      }))}}}
