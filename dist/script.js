import React, { useState, useEffect, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function App() {
  const [numberGroup, setNumberGroup] = useState("");
  const [expression, setExpression] = useState("");
  const [display, setDisplay] = useState("");
  const [answer, setAnswer] = useState("");
  const [showApproxSign, setShowApproxSign] = useState(false);

  /* RULES
  -  Expression must start with a number, ., or negative sign (done)
  -  Expression cannot contain two operators in a row unless second operator is a minus sign
  -  A group of numbers can only contain one decimal
  -  Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation
  -  Pressing a number immediately following = should start a new calculation
  -  Handles 5 decimal places of precision with rouding
  */

  useEffect(() => {
    console.log({ numberGroup });
  }, [numberGroup]);

  useEffect(() => {
    console.log({ expression });
  }, [expression]);

  useEffect(() => {
    if (/\s[\*\/\+\-]\s\s[\*\/\+\-]\s$/.test(expression)) {
      console.log("Use of double operators");
      const newestOperator = expression.match(/\s[\*\/\+\-]\s$/); // grab last operator
      console.log(newestOperator);
      setExpression(prev => prev.split("").slice(0, prev.length - 6).join("") + newestOperator);
    } else {
      setDisplay(expression);
    }
  }, [expression]);

  const handleNumber = symbol => {
    if (answer !== "") {// if a number is selected and answer is not blank, clear answer
      setAnswer("");
      setExpression("");
    }
    setNumberGroup(prev => prev + symbol);
    setExpression(prev => prev + symbol);
  };

  const handleZero = symbol => {
    if (/^0/.test(numberGroup)) {// if a number group starts with a zero, 
      // make sure it isn't immediately followed by another zero
      // do nothing
    } else {
      setNumberGroup(prev => prev + symbol);
      setExpression(prev => prev + symbol);
    }
  };

  const handleDecimal = symbol => {
    if (numberGroup === "") {
      setNumberGroup("0.");
    } else if (/\./.test(numberGroup)) {// make sure number group can only contain one zero
      // do nothing      
    } else {
      setNumberGroup(prev => prev + symbol);
      setExpression(prev => prev + symbol);
    }
  };

  const handleMinus = symbol => {
    if (numberGroup === "") {
      setNumberGroup("-");
      setExpression(prev => prev + "-");
    } else {
      handleOperator(symbol);
    }
  };

  const handleOperator = symbol => {
    console.log({ expression });
    if (expression === "") {
      // do nothing
    } else if (/\s=/.test(expression)) {
      setExpression(answer + symbol);
      setAnswer("");
    } else {
      setExpression(prev => prev + symbol);
      setNumberGroup("");
    }
  };

  const calculate = () => {
    if (expression.length > 0) {
      let value = String(eval(expression));
      if (/\./.test(value)) {
        console.log("Count: ", value.match(/(?:\.\d*)/)[0].length);
        if (value.match(/(?:\.\d*)/)[0] > 6)
        console.log("long");
        value = String(eval(expression).toPrecision(5));
        setShowApproxSign(true);
      }
      console.log({ value });
      setAnswer(value);
      setExpression(prev => prev + " =");
    }
  };

  const allClear = () => {
    setExpression("");
    setAnswer("");
  };

  const clear = () => {
    setExpression(prev => prev.split("").slice(0, prev.length - 1).join(""));
    setAnswer("");
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
  React.createElement("div", { className: "container" }, /*#__PURE__*/
  React.createElement("div", { className: "grid" }, /*#__PURE__*/
  React.createElement("div", { id: "display" }, /*#__PURE__*/
  React.createElement("input", { type: "text", value: display, placeholder: "0", disabled: true }), /*#__PURE__*/
  React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
  showApproxSign ? /*#__PURE__*/React.createElement("div", { className: "approx-sign" }, "~") : /*#__PURE__*/React.createElement("div", { className: "no-approx-sign" }), /*#__PURE__*/
  React.createElement("div", { className: "total" }, answer === "" ? /*#__PURE__*/React.createElement("span", null, "\xA0\xA0") : answer))), /*#__PURE__*/


  React.createElement("div", { onClick: allClear, className: "padButton tomato", id: "clear" }, "AC"), /*#__PURE__*/
  React.createElement("div", { onClick: clear, className: "padButton tomato", id: "backspace" }, "C"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleOperator(" / "), className: "padButton", id: "divide" }, "/"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleOperator(" * "), className: "padButton", id: "multiply" }, "x"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("7"), className: "padButton dark-gray", id: "seven" }, "7"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("8"), className: "padButton dark-gray", id: "eight" }, "8"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("9"), className: "padButton dark-gray", id: "nine" }, "9"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleMinus(" - "), className: "padButton", id: "subtract" }, "-"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("4"), className: "padButton dark-gray", id: "four" }, "4"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("5"), className: "padButton dark-gray", id: "five" }, "5"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("6"), className: "padButton dark-gray", id: "six" }, "6"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleOperator(" + "), className: "padButton", id: "add" }, "+"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("1"), className: "padButton dark-gray", id: "one" }, "1"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("2"), className: "padButton dark-gray", id: "two" }, "2"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleNumber("3"), className: "padButton dark-gray", id: "three" }, "3"), /*#__PURE__*/
  React.createElement("div", { onClick: calculate, className: "padButton custom-blue", id: "equals" }, "="), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleZero("0"), className: "padButton dark-gray", id: "zero" }, "0"), /*#__PURE__*/
  React.createElement("div", { onClick: () => handleDecimal("."), className: "padButton dark-gray", id: "decimal" }, "."))));



}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));