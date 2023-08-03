import React from "react";
import "../Navigation/styles.css";


const Navigation = ({ page, total, back, next }) => {
  return (
    <div className="botones1">
      <button onClick={back}>back</button>
      <p>
        {page} de {total}

      </p>
 
      <button onClick={next}>next</button>
    </div>
  );
};

export default Navigation;
