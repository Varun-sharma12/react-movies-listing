import { useEffect, useState } from "react";
// import TextExpander from "./TextExpander";
import WatchedList from "./components/WatchedList";
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovie from "./components/SelectedMovie";
import List from "./components/List";
import Box from "./components/Box";
import NavBar from "./components/NavBar";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Search from "./components/Search";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";
//Static demo data for the initial stage of the app
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

//Static demo data of watched movie.
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

//App component.
export default function App() {
  //Initial states required in the app
  const [query, setQuery] = useState(""); // State for storing the query string typed in search box.
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const {movies, isLoading, error} = useMovies(query);
  // const [watched, setWatched] = useState([]); // State for holding the data of watched movies.
  const [selectedId, setSelectedId] = useState(null); // State for holding the id of the selected movie to display its information.

  //Function passes the id of the selected movie .
  function selectMovie(id) {
    setSelectedId((selected) => (id === selected ? null : id));
  }

  //Close a particular selected movie by clickin on it again or by back button.
  function closeMovie() {
    setSelectedId(null);
  }

  //function to add a movie to watch list
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]); // Adding the new movie in the watched state

    // localStorage.setItem('watched', JSON.stringify([...watched,movie]))
  }

  //Function to remove a movie from the watched list
  function removeMovie(id) {
    const leftMovies = watched.filter((item) => id !== item.imdbID); //Movies left after removint the current movie from watched list
    setWatched(leftMovies); // Setting the state of watched movies with the left movies.
  }
 
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <List onSelectMovie={selectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={closeMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList onRemoveMovie={removeMovie} watched={watched} />
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
