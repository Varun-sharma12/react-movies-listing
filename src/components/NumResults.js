//Number of results shown after searching a particular query from search box.
export default function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}
