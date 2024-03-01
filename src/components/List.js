//List component for displaying the list of movies.
export default function List({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie selectMovie={onSelectMovie} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

//Component to display the singl movie.
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