import { useState, useRef } from "react";
import colorNames from "colornames";

function App() {
  const [color, setColor] = useState("");
  const [hexValue, setHexValue] = useState("");
  const [darkText, setDarkText] = useState(false);
  const [copied, setCopied] = useState(false);

  const focusInput = useRef("");

  const handleSetDarkText = () => {
    setDarkText(!darkText);
  };

  const copyToClipboard = () => {
    hexValue &&
      navigator.clipboard
        .writeText(hexValue)
        .then(() => {
          setCopied(true);
        })
        .catch((error) => {
          alert("Error copying to the clipboard.", error);
        });
  };

  return (
    <div className="py-50px">
      <div className="container">
        <div
          className={
            hexValue && copied
              ? "color-name clipboard copied"
              : hexValue
              ? "color-name clipboard"
              : "color-name"
          }
          style={{
            backgroundColor: color ? color : "var(--color-secondary)",
            color: darkText ? "black" : "white",
          }}
          onClick={() => {
            copyToClipboard();
            focusInput.current.focus();
          }}
        >
          {color ? color.toUpperCase() : "Color Name"}
          {hexValue && (
            <>
              <br />
              {hexValue}
            </>
          )}
        </div>
        <form className="form mt-20px" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="color-name"
            id="color-name"
            className="input"
            ref={focusInput}
            autoFocus
            placeholder="Type in Color Code"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              setHexValue(colorNames(e.target.value));
              setCopied(false);
            }}
          />
        </form>
        <button
          className="btn btn--add mt-20px w-100"
          onClick={handleSetDarkText}
        >
          Reverse Text Color
        </button>
      </div>
    </div>
  );
}

export default App;
