import { Children, useEffect, useState } from "react";
import { mockComponent } from "react-dom/test-utils";
import TextExpander from "./TextExpander";
import StarRating from "./StarRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "adc45703";
// const movieQuery = "interstellar";
export default function App() {

  //Initial states required in the app
  const [query, setQuery] = useState("");     // State for storing the query string typed in search box.
  const [movies, setMovies] = useState([]);   // State for holding the data of movies list.
  const [watched, setWatched] = useState([]); // State for holding the data of watched movies.
  const [error, setError] = useState("");     // State for holding the error messages.
  const [isLoading, setIsLoading] = useState(false); // State for holding the loading stated.
  const [selectedId, setSelectedId] = useState(null); // State for holding the id of the selected movie to display its information.


  //Function passes the id of the selected movie .
  function selectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

//Close a particular selected movie by clickin on it again or by back button.  
  function closeMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        //Exception handeling for fetching the data through  the api.
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`
          );
          if (!res.ok)
            throw new Error("something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false); //Finally set the loading false.
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        \{/* <Box element={element} /> */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <List onSelectMovie={selectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie selectedId={selectedId} onCloseMovie={closeMovie} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>

//Text Expander code commentd due to no use.
    // <div>
    //  <TextExpander>
    //     Space travel is the ultimate adventure! Imagine soaring past the stars
    //     and exploring   new worlds. It's the stuff of dreams and science fiction,
    //     but believe it or not, space travel is a real thing. Humans and robots
    //     are constantly venturing out into the cosmos to uncover its secrets and
    //     push the boundaries of what's possible.
    //   </TextExpander>

    //   <TextExpander
    //     collapsedNumWords={20}
    //     expandButtonText="Show text"
    //     collapseButtonText="Collapse text"
    //     buttonColor="#ff6622"
    //   >
    //     Space travel requires some seriously amazing technology and
    //     collaboration between countries, private companies, and international
    //     space organizations. And while it's not always easy (or cheap), the
    //     results are out of this world. Think about the first time humans stepped
    //     foot on the moon or when rovers were sent to roam around on Mars.
    //   </TextExpander>

    //   <TextExpander
    //     expand={true}
    //     className="box"
    //     collapsedNumWords={20}
    //     expandButtonText="Show text"
    //     collapseButtonText="Collapse text"
    //     buttonColor="#000"
    //   >
    //     Space missions have given us incredible insights into our universe and
    //     have inspired future generations to keep reaching for the stars. Space
    //     travel is a pretty cool thing to think about. Who knows what we'll
    //     discover next!
    //   </TextExpander>
    // </div>
  );
}
//Component for showing the error message 
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span></span>
      {message}
    </p>
  );
}

//Loader component for showing the loader.
function Loader() {
  return <p className="loader">Loading...</p>;
}

//Component displaying the nav bar and Logo called inside it.
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
//Number of results shown after searching a particular query from search box. 
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

//Display the logo by using the component
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
//Search component for searching a specific movie from the list.
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}


//Button component for making the button There is no need but i made it for future reusability.
function Button({ isOpen, setIsOpen, children }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {children}
    </button>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Movie({ selectMovie, movie }) {
  return (
    <li onClick={() => selectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen}>
        {isOpen ? "–" : "+"}
      </Button>
      {isOpen && children}
    </div>
  );
}


//List component for displaying the list of movies.
function List({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie selectMovie={onSelectMovie} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

//Component for showing the currently selected movie detail
function SelectedMovie({ selectedId, onCloseMovie }) {

  //Initial states for showing the data of selected movies
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false); //State for showing loader while fetching movie.
  const [error, setError] = useState(""); //Showing error due to api fetch.
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
  useEffect(
    function () {
      setIsLoading(true); // Making the loading state true before fetching movie data
      setError("");
      async function getMovieDetail() {

        //Handeling Exception while fetching the movie data through api.
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
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
          <StarRating maxRating={10} size={30} />
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

//Component shows the list of watched movie.
function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie} />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
