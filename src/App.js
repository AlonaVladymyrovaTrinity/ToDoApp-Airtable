import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import style from "./css/App.module.css";
import baseStyles from "./css/base.module.css";
import ResizeAnimationStopper from "./components/ResizeAnimationStopper";
import CreateCustomTodoList from "./components/CreateCustomTodoList";
import logo from "./assets/task-list-white.svg";
import About from "./components/About";
import CreateNotes from "./components/CreateNotes";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const handleMenuClick = () => {
    setIsNavigationVisible(!isNavigationVisible);
  };

  return (
    <BrowserRouter>
      <ResizeAnimationStopper>
        <header className={`${style["primary-header"]} ${style.flex}`}>
          <div>
            <Link to="/" className={style["app-name-wrapper"]}>
              <img className={style.logo} src={logo} alt="Todo List Logo" />
              <span className={style["app-name"]}>Todo List</span>
            </Link>
          </div>
          <button
            className={`${style["mobile-nav-toggle"]} ${
              !isNavigationVisible ? style["mobile-nav-toggle-close"] : ""
            }`}
            onClick={handleMenuClick}
          >
            {/* The CSS class "sr-only" for span Menu is used to hide element 
            visually from sighted users while still making them accessible to 
            assistive technologies such as screen readers (SR), making website 
            more inclusive for all users. That's why the name of the class is 
            "sr-only", which means "for Screen Readers only".  */}

            <span className={baseStyles["sr-only"]}>Menu</span>
          </button>
          <nav className={style.navigation}>
            <ul
              id="primary-navigation"
              className={`${style["primary-navigation"]} ${style.flex} ${
                !isNavigationVisible ? style["primary-navigation-hidden"] : ""
              }`}
            >
              <li className={style.active}>
                <Link to="/">My Todo Lists</Link>
              </li>
              <li className={style.active}>
                <Link to="/notes">Notes</Link>
              </li>
              <li className={style.active}>
                {/* <Link to={`/${tableName}`}> */}
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
          {/* I'm using react-router-dom version 6.10, which replaced Switch with the Routes component*/}
          <Routes>
            <Route path="/" element={<CreateCustomTodoList />} />
            <Route
              // path={`/${tableName}`}
              path="/todolist/:tableName"
              element={<TodoContainer />}
            />
            <Route path="/notes" element={<CreateNotes />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<PageNotFound />} />{" "}
            {/* Handling Page Not Found errors */}
          </Routes>
        </header>
      </ResizeAnimationStopper>
    </BrowserRouter>
  );
}

export default App;
