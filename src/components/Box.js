import { useState } from "react";
//Component to display both the box of movie list and watched movie list
export default function Box({ children }) {
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
//Button component for making the button There is no need but i made it for future reusability.
function Button({ isOpen, setIsOpen, children }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {children}
    </button>
  );
}
