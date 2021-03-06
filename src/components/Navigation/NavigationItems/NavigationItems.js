import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NaviagtionItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders"> Orders </NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth"> Login </NavigationItem>
      ) : (
        <NavigationItem link="/logout"> Logout </NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
