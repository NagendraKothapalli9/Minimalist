import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActionInitiate } from "../redux/actions/getUserAction";
import { putUserDataActionInitiate } from "../redux/actions/updateUserAction";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const getUsersState = useSelector((state) => state.getuserdata);
  const existingUser = getUsersState?.data?.find((item) => item.email === user?.email);

  // 1. Fetch user data on mount
  useEffect(() => {
    dispatch(getUserDataActionInitiate());
  }, [dispatch]);

  // 2. Trigger clearing when existingUser is available and cart has items
  useEffect(() => {
    const clearCart = async (dispatch, existingUser) => {
      try {
        const clearedUser = { ...existingUser, cart: [] };
        await dispatch(putUserDataActionInitiate(clearedUser, existingUser.id));
        await dispatch(getUserDataActionInitiate());
        // Optional: clear the session flag so it doesn't run again unnecessarily
        localStorage.removeItem("processedTransactions"); 
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    };

    if (existingUser && existingUser.cart && existingUser.cart.length > 0) {
      clearCart(dispatch, existingUser);
    }
  }, [existingUser, dispatch]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Successful!</h1>
      <p>Your order has been placed and your cart is now empty.</p>
    </div>
  );
};

export default SuccessPage;