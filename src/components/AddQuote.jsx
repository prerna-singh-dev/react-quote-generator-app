import { useEffect, useState, useRef } from "react";
import Button from "./Button";
import styles from "./AddQuote.module.css";
import { downloadQuote } from "./DownloadQuote";

function AddQuote() {
  const [quoteDetails, setQuoteDetails] = useState({
    quoteText: "",
    textColor: "#000000",
    quoteBackground: "back1",
  });
  const [createQuote, setCreateQuote] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    if (quoteDetails.quoteBackground && quoteDetails.quoteText) {
      setCreateQuote(true);
    }
  }, [quoteDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.quoteForm}>
      <fieldset>
        <div className={styles.formBlock}>
          <label htmlFor="quoteText">Add Quote</label>
          <textarea
            name="quoteText"
            id="quoteText"
            value={quoteDetails.quoteText}
            onChange={handleChange}
            aria-label="Add quote"
          ></textarea>
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
        {/* <div className="form-block">
        <label>Select background color</label>
        <input type="color" name="textColor" id="textColor" required />
      </div> */}
        <div className={styles.formBlock}>
          <label htmlFor="quoteBackground">Select background image </label>
          <div>
            <input
              type="radio"
              name="quoteBackground"
              id="quoteBackground"
              value="back1"
              onChange={handleChange}
              aria-label="Select quote background image"
            />
            <img src="/back1.jpg" width="40" height="40" />

            <input
              type="radio"
              name="quoteBackground"
              value="back2"
              onChange={handleChange}
            />
            <img src="/back2.jpg" width="40" height="40" />

            <input
              type="radio"
              name="quoteBackground"
              value="back3"
              onChange={handleChange}
            />
            <img src="/back3.jpg" width="40" height="40" />

            <input
              type="radio"
              name="quoteBackground"
              value="back4"
              onChange={handleChange}
            />
            <img src="/back4.jpg" width="40" height="40" />

            <input
              type="radio"
              name="quoteBackground"
              value="back5"
              onChange={handleChange}
            />
            <img src="/back5.jpg" width="40" height="40" />
          </div>
        </div>
        <div className={styles.previewBlock} id="preview">
          {createQuote ? (
            <div className={styles.generateQuote} ref={previewRef}>
              <img src={`/${quoteDetails.quoteBackground}.jpg`} />
              <div className={styles.quoteOnImage}>
                <q style={{ color: quoteDetails.textColor }}>
                  {quoteDetails.quoteText}
                </q>
              </div>
            </div>
          ) : (
            <div>
              <p>Preview</p>
            </div>
          )}
        </div>

        <Button handleClick={() => downloadQuote(previewRef)}>
          Download Quote
        </Button>
      </fieldset>
    </div>
  );
}

export default AddQuote;
