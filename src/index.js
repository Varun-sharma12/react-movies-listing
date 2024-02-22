import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import './index.css';
import App from './App';
function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="brown" maxRating={"10"} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StarRating messages={["Terrible", "Bad", "okay", "Good", "Amazing"]} />
    <StarRating
      maxRating={15}
      messages={["Terrible", "Bad", "okay", "Good", "Amazing"]}
      defaultRating={3}
    /> */}
    {/* <StarRating maxRating={24} color="red" size={20} className="test" /> */}
    {/* <Test /> */}
    {/* <StarRating /> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
