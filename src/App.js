import decair from "./decair.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Would i survive titanic?</p>
        by
        <img
          style={{ width: "20%", height: "20%" }}
          src={decair}
          className="App-logo"
          alt="logo"
        />
      </header>
    </div>
  );
}

export default App;
