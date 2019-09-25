import React from "react";

function Errors(props) {
  return (
    <>
      {props.error && (
        <div data-testid="error">Oh no! Couldn’t retrieve your data</div>
      )}
    </>
  );
}

export default Errors;
