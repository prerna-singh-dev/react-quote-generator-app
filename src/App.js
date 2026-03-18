import AddQuote from "./components/AddQuote";
import QuoteGenerator from "./components/QuoteGenerator";

function App() {
  return (
    <div className="container">
      <div className="main">
        <QuoteGenerator />
      </div>
      <AddQuote />
    </div>
  );
}

export default App;
