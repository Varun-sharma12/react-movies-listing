import { useEffect, useRef } from "react";
//Search component for searching a specific movie from the list.
export default function Search({ query, setQuery }) {
  //Focusing on input element after pressing the Enter key.
  const inputEl = useRef(null);
useEffect(function(){ 
  function callback(e){
    if(document.activeElement === inputEl.current) return;
    if(e.code === "Enter"){
    inputEl.current.focus();
    setQuery("");
    }
  }
  document.addEventListener("keydown", callback);
  return () => document.removeEventListener("keydown", callback);
}, [setQuery])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}