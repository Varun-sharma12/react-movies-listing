import { useState } from "react";
import "./style.css";

function TextExpander({
  expand = false,
  collapsedNumWords = 10,
  expandButtonText = "Show text",
  collapseButtonText = "Collapse text",
  buttonColor = "#ff6622",
  className = "box",
  children,
}) {
  const buttonStyle = {
    border: "none ",
    fontSize: "15px",
    cursor: "pointer",
    color: buttonColor,
  };
  const [expanded, setExpanded] = useState(expand);
  return (
    <div className={className}>
      {
        <span>
          {!expanded
            ? children.split(" ").slice(0, collapsedNumWords).join(" ") + "..."
            : children}
        </span>
      }
      <button
        style={buttonStyle}
        onClick={() => {
          setExpanded((expanded) => !expanded);
        }}
      >
        {expanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

export default TextExpander;
