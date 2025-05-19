import { ToastContainer } from 'react-toastify';
import './App.css';
import Context from './context';
import { useDispatch } from 'react-redux';
import SummaryApi from './common';
import { setUserDetails } from './store/userSlice';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount , setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method : SummaryApi.current_user.method,
      credentials : 'include'
    });

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data));
    }
  }

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    });

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  }

  useEffect(()=>{
    // user Details
    fetchUserDetails();

    // user Details cart product 
    fetchUserAddToCart();
  },[]);

  return (
    <>
        <Context.Provider   value={{
            fetchUserDetails,  // user detail fetch
            cartProductCount, // current user add to cart product count,
            fetchUserAddToCart
        }}
        >
             <ToastContainer
                   position='top-center'
             />

             <Header />
             <main className='pt-16'>
               <Outlet/>
             </main>
             <Footer />
        </Context.Provider>
    </>
  );
}

export default App;
