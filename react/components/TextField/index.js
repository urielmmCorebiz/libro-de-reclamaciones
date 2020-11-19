// Librerías
import React, { useState } from "react";
const assign = Object.assign;

import "./textField.css";

export default function TextField(props) {
  const [focus, setFocus] = useState(false);
  const overwrite = {};
  const inputData = props.input || {};
  const toolTipContent = props.toolTipContent;
  const propsInput = inputData.input || inputData || {};
  const isNewHook = !!inputData.input;

  var open = false;
  if (!focus) {
    overwrite.placeholder = "";
    open = false;
  } else open = true;
  if (propsInput.value || propsInput.defaultValue) open = true;

  const inputAttributes = assign(
    {},
    propsInput,
    {
      onFocus: (e) => {
        if (propsInput.onFocus) propsInput.onFocus(e);
        setFocus(true);
      },
      onBlur: (e) => {
        if (propsInput.onBlur) propsInput.onBlur(e);
        setFocus(false);
      },
    },
    overwrite
  );

  return (
    <div
      className={`TextFieldRoot ${(open && "open") || "close"} ${
        (focus && "focus") || ""
      } ${(!!props.input.error && "error") || ""} ${
        (inputAttributes.disabled && "disabled") || ""
      } ${props.className || ""}`}
    >
      <label className="inputLabel" htmlFor={inputData.id || ""}>
        {props.label}
      </label>
      <input
        {...inputAttributes}
        value={isNewHook ? inputData.displayValue : inputAttributes.value}
        autoComplete="off"
      />
      {isNewHook && (
        <input
          className={"realInput"}
          {...inputAttributes}
          id={inputData.id}
          name={inputData.name}
          autoComplete="off"
        />
      )}
      {!propsInput.error && !!inputAttributes.value && (
        <div className="doneIconText">
          <div className="leftLineText"></div>
          <div className="rightLineText"></div>
        </div>
      )}
      {!!propsInput.error && (
        <div className="errorDescription">{propsInput.error}</div>
      )}
    </div>
  );
}
