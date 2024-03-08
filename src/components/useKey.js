import { useEffect } from "react";
export function useKey(key, action){
  useEffect(
    function () {
      //Close the selected movie on pressing the Escape key
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action]
  );
}