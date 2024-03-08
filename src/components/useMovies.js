import { useState, useEffect } from "react";
import * as constants from "./Constants";
export function useMovies(query){
  const [movies, setMovies] = useState([]); // State for holding the data of movies list.
  const [error, setError] = useState(""); // State for holding the error messages.
  const [isLoading, setIsLoading] = useState(false); // State for holding the loading stated
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        //Exception handeling for fetching the data through  the api.
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${constants.key}&s=${query}`,{signal: controller.signal}
          );
          if (!res.ok)
            throw new Error("something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if(err.name !== "AbortError"){
            setError(err.message);
          }
          // setError(err.message);
        } finally {
          setIsLoading(false); //Finally set the loading false.
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      // closeMovie();
      fetchMovies();
      //Clean up function to abort the fetch request between the re-renders
      return function(){
        controller.abort();
      }
    },
    [query]
  );
  return {movies, isLoading, error};
}