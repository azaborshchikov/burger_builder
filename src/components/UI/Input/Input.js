import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElem = null;

  switch (props.elementType) {
    case "input":
      inputElem = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElem = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElem = (
        <select
          onChange={props.changed}
          className={classes.InputElement}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElem = (
        <input
          onChange={props.changed}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElem}
    </div>
  );
};

export default Input;
