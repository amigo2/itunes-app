import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        syle={{ width: "200px", margin: " 40px auto", display: "block" }}
      />
    </div>
  );
};
