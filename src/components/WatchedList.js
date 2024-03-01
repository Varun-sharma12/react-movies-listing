//Component shows the list of watched movie.
export default function WatchedList({ watched, onRemoveMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          onRemoveMovie={onRemoveMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
//Component to show the layout of each watched movie in the watched list
function WatchedMovie({ movie, onRemoveMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
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
        <button
          className="btn-delete"
          onClick={() => onRemoveMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
