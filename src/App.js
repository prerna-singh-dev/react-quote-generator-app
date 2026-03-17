import AddQuote from "./components/AddQuote";
import QuoteGenerator from "./components/QuoteGenerator";

function App() {
  return (
    <div className="container">
      <div className="main">
        <QuoteGenerator />
        <AddQuote />
      </div>
    </div>
  );
}

export default App;
