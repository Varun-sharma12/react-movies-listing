//Component for showing the error message
export default function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span></span>
      {message}
    </p>
  );
}
