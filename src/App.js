import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData, fetchCartData } from './store/cart-actions';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
//this isInitial variable will not be initialized if the componet renders again
//  we do not want the empty cart to overwrite the cart in database when useeffect runs the first time
let isInitial = true;
function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const notification = useSelector(state=> state.ui.notification)


  useEffect(()=>{
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(()=>{ // dont write async with round brancket in this line , else create new function
    if (isInitial){
      isInitial = false
      return
    }
    if(cart.changed){
      dispatch(sendCartData(cart))
    }
}, [cart,dispatch])
  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
