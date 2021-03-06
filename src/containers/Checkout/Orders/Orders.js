import React, { useEffect } from "react";
import Order from "../../../components/Order/Order";
import { connect } from "react-redux";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";

const Orders = (props) => {
  const { token, userId, onFetchOrders } = props; //!
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [token, userId, onFetchOrders]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
  }
  return <div>{orders}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => {
      dispatch(actions.fetchOrders(token, userId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
