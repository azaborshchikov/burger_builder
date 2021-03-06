import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return { ...oldState, purchased: false };
    case actionTypes.PURCHASE_BURGER_START:
      return { ...oldState, loading: true };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, id: action.orderId };
      return {
        ...oldState,
        loading: false,
        purchased: true,
        orders: oldState.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...oldState,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return { ...oldState, loading: true };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...oldState, orders: action.orders, loading: false };
    case actionTypes.FETCH_ORDERS_FAIL:
      return { ...oldState, loading: false };
    default:
      return oldState;
  }
};
export default reducer;
