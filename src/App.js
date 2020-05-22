import React, { useEffect } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Checkout/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />

        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => {
      dispatch(actions.authCheckState());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
