import React from "react";
import { Provider } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { store } from "./redux/store/store";
import BookManagement from "./component/BookManagement/BookManagement";

function App() {
  console.log(process.env.REACT_APP_API_URL, "REACT_APP_API_URL");
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <div className="management-container" style={{ padding: "10px" }}>
          <BookManagement></BookManagement>
        </div>
      </div>
    </Provider>
  );
}

export default App;
