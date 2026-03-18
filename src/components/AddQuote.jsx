import { useEffect, useState, useRef } from "react";
import Button from "./Button";
import styles from "./AddQuote.module.css";
import { downloadQuote } from "./DownloadQuote";

const MAX_LENGTH = 350;

function AddQuote() {
  const [quoteDetails, setQuoteDetails] = useState({
    quoteText: "",
    textColor: "#000000",
    quoteBakgroundClr: "",
    quoteBackground: "",
  });
  const [createQuote, setCreateQuote] = useState(false);
  const [error, setError] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    if (
      (quoteDetails.quoteBackground || quoteDetails.quoteBakgroundClr) &&
      quoteDetails.quoteText
    ) {
      setCreateQuote(true);
    }else{
      setCreateQuote(false);
    }
  }, [quoteDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle quote text validation
    if (name === "quoteText") {
      if (value.length >= MAX_LENGTH) {
        setError(true);
        return;
      }
      setError(false);
    }

    setQuoteDetails((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "quoteText" && value.trim() === "") {
        updated.quoteBakgroundClr = "";
        updated.quoteBackground = "";
      }

      if (name === "quoteBackground") {
        updated.quoteBakgroundClr = "";
      }

      if (name === "quoteBakgroundClr") {
        updated.quoteBackground = "";
      }

      return updated;
    });
  };

  const isBtnDisabled = !(
    quoteDetails.quoteText &&
    (quoteDetails.quoteBackground || quoteDetails.quoteBakgroundClr)
  );

  return (
    <div className={styles.quoteForm}>
      <fieldset>
        <div>
          <div className={styles.formBlock}>
            <label htmlFor="quoteText">Add Quote</label>
            <div className={styles.quoteFieldBlock}>
              <textarea
                name="quoteText"
                id="quoteText"
                maxLength={MAX_LENGTH}
                value={quoteDetails.quoteText}
                onChange={handleChange}
                aria-label="Add quote"
                aria-describedby="quote-help quote-error"
              ></textarea>
              <p id="quote-help">
                {quoteDetails.quoteText.length + "/" + MAX_LENGTH}
              </p>
              {error && (
                <p className={styles.error}  role="alert" id="quote-error" aria-live="polite">
                  350 characters allowed
                </p>
              )}
            </div>
          </div>

          <div className={styles.formBlock}>
            <label htmlFor="quoteBakgroundClr">Select background color</label>
            <input
              type="color"
              name="quoteBakgroundClr"
              id="quoteBakgroundClr"
              value={quoteDetails.quoteBakgroundClr}
              onChange={handleChange}
              aria-label="Select Background Color"
            />
          </div>
          <div className={styles.formBlock}>
            <label htmlFor="quoteBackground">Select background image </label>
            <div className={styles.quoteBgImagesBlock}>
              <label>
                <input
                  type="radio"
                  name="quoteBackground"
                  id="quoteBackground"
                  value="back1"
                  onChange={handleChange}
                  aria-label="Background image 1"
                />
                <img
                  src="/back1.jpg"
                  width="40"
                  height="40"
                  alt="Select Backgound "
                />
              </label>

              <label>
                <input
                  type="radio"
                  name="quoteBackground"
                  value="back2"
                  onChange={handleChange}
                  aria-label="Background image 2"
                />
                <img
                  src="/back2.jpg"
                  width="40"
                  height="40"
                  alt="Select Backgound "
                />
              </label>

              <label>
                <input
                  type="radio"
                  name="quoteBackground"
                  value="back3"
                  onChange={handleChange}
                  aria-label="Background image 3"
                />
                <img
                  src="/back3.jpg"
                  width="40"
                  height="40"
                  alt="Select Backgound "
                />
              </label>

              <label>
                <input
                  type="radio"
                  name="quoteBackground"
                  value="back4"
                  onChange={handleChange}
                  aria-label="Background image 4"
                />
                <img
                  src="/back4.jpg"
                  width="40"
                  height="40"
                  alt="Select Backgound"
                />
              </label>

              <label>
                <input
                  type="radio"
                  name="quoteBackground"
                  value="back5"
                  onChange={handleChange}
                  aria-label="Background image 5"
                />
                <img
                  src="/back5.jpg"
                  width="40"
                  height="40"
                  alt="Select Backgound"
                />
              </label>
            </div>
          </div>
          <div className={styles.formBlock}>
            <label htmlFor="textColor">Select text color</label>
            <input
              type="color"
              name="textColor"
              id="textColor"
              value={quoteDetails.textColor}
              onChange={handleChange}
              aria-label="Select quote text color"
            />
          </div>
        </div>
        <div className={styles.previewBlock} id="preview">
          {createQuote &&
          quoteDetails["quoteText"] &&
          quoteDetails["textColor"] &&
          (quoteDetails["quoteBackground"] ||
            quoteDetails["quoteBakgroundClr"]) ? (
            <div className={styles.generateQuote} ref={previewRef}>
              {quoteDetails.quoteBackground && (
                <img
                  src={`/${quoteDetails.quoteBackground}.jpg`}
                  alt="Quote Background"
                />
              )}
              {quoteDetails.quoteBakgroundClr && (
                <div
                  className={styles.quoteOnBgColor}
                  style={{ backgroundColor: quoteDetails.quoteBakgroundClr }}
                ></div>
              )}
              <div className={styles.quoteOnImage}>
                <q style={{ color: quoteDetails.textColor }}>
                  {quoteDetails.quoteText}
                </q>
              </div>
            </div>
          ) : (
            <div className={styles.previewEmpty}>
              <p>Preview</p>
            </div>
          )}
        </div>

        <Button
          handleClick={() => downloadQuote(previewRef)}
          disabled={isBtnDisabled}
          aria-disabled={isBtnDisabled}
          aria-live="polite"
        >
          Download Quote
        </Button>
      </fieldset>
    </div>
  );
}

export default AddQuote;
