import React from "react";
import "./App.css";

function App() {
  React.useEffect(() => {
    window.location.href = "https://vandalvision.ru/";
  }, []);

  return <div className="App"></div>;
}

export default App;
