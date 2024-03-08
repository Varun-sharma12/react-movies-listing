import { useEffect, useRef } from "react";
import { useKey } from "./useKey";
//Search component for searching a specific movie from the list.
export default function Search({ query, setQuery }) {
  //Focusing on input element after pressing the Enter key.
  const inputEl = useRef(null);
  useKey('Enter',function(){    
      if(document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");         
  });

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