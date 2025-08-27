import React from "react";
import "./Container.css";

const Container = ({ children, size = "md" }) => {
  return <div className={`container ${size}`}>{children}</div>;
};

export default Container;
