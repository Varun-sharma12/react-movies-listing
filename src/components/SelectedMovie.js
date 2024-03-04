import { useState, useEffect } from "react";
import StarRating from "../StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import * as constants from "./Constants";
//Component for showing the currently selected movie detail
export default function SelectedMovie({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  //Initial states for showing the data of selected movies
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false); //State for showing loader while fetching movie.
  const [error, setError] = useState(""); //Showing error due to api fetch.
  const [userRating, setUserRating] = useState(""); // stores the rating provided by a user to a movie.
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId); //Check whether the watched list contains the selected movie
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating; //Getting the userrating of the slected movie if it exists in the watched list
  // const checkWatched = watched.filter((item) => item.imdbID === selectedId );

  const {
    Title: title,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Poster: poster,
  } = movie;
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  //This useeffect will run whenever user type something in search box.
  useEffect(
    function () {
      function callback (e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);
      return function(){
        document.removeEventListener('keydown',callback);
      }
    },
    [onCloseMovie]
  );
  useEffect(
    function () {
      setIsLoading(true); // Making the loading state true before fetching movie data
      setError("");

      async function getMovieDetail() {
        //Handeling Exception while fetching the movie data through api.
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${constants.key}&i=${selectedId}`
          );
          if (!res.ok)
            throw new Error("something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false); //Finally Setting loading state false after fetching.
        }
      }

      getMovieDetail();
    },
    [selectedId]
  );

  //Change the document title with the selected movie title.
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      // Cleanup function to reset the title whenever the movie is deselected.
      return function () {
        document.title = "UsePopcorn";
      };
    },
    [title]
  );

  //Render the movie detail only if loading is false and there is no error.
  return !isLoading && !error ? (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie} Movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {" "}
            {released} &bull; {runtime}{" "}
          </p>
          <p>
            {" "}
            <span>🌟</span> {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={30}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              This movie is rated with {watchedUserRating} <span>🌟</span>{" "}
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors} </p>
        <p>Directed by {director} </p>
      </section>
    </div>
  ) : isLoading ? (
    <Loader /> // Calling the Loader component before displaying the movie data.
  ) : (
    <ErrorMessage message={error} /> //Calling the Error component if any error occur while fetching.
  );
}
