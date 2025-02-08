import React from "react";

const ErrorHandler = ({ error }) => {
  return error ? <p className="error">{error}</p> : null;
};

export default ErrorHandler;
