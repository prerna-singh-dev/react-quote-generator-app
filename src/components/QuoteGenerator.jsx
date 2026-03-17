import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Button from "./Button";

function QuoteGenerator() {
  const url = "https://dummyjson.com/quotes";
  const [{ data, loading }] = useFetch(url);
  const [quote, setQuote] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      setQuote(data[0]);
    }
  }, [data]);

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 800);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  const generateQuote = () => {
    if (!data?.length) return;
    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * data.length);
    setQuote(data[randomIndex]);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleCopy = () => {
    if (!navigator) return;
    navigator.clipboard.writeText(quote.quote);
    setCopied(true);
  };

  return (
    <>
      {loading && (
        <div className="loader" aria-label="Loading quotes">
          <div className="loader__spinner" />
          <span className="loader__text">Loading wisdom…</span>
        </div>
      )}

      {!loading && quote && (
        <div className="quoteBlock">
          <h1 className="quoteBlock__title">Quote Generator</h1>
          <blockquote
            className={`quoteCard ${isAnimating ? "quoteCard--fade" : ""}`}
            key={quote.id}
          >
            <span className="quoteCard__mark">"</span>
            <button
              className="quoteCard__copyBtn"
              onClick={handleCopy}
              title="Copy"
              aria-label="
                Copy Quote"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            {copied && <span className="quoteCard__tootip">Copied!</span>}
            <p className="quoteCard__text">{quote.quote}</p>
            <footer className="quoteCard__author">
              <cite>— {quote.author}</cite>
            </footer>
          </blockquote>

          <Button handleClick={generateQuote}>New Quote</Button>
        </div>
      )}
    </>
  );
}

export default QuoteGenerator;
