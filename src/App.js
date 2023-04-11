import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./TodoContainer";
import style from "./TodoListItem.module.css";
import ResizeAnimationStopper from "./ResizeAnimationStopper";
import CreateCustomTodoList from "./CreateCustomTodoList";

function App() {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const handleMenuClick = () => {
    setIsNavigationVisible(!isNavigationVisible);
  };
  const tableName = "Default";

  return (
    <>
      <ResizeAnimationStopper>
        <header className={`${style["primary-header"]} ${style.flex}`}>
          <div>
            <img
              className={style.logo}
              src="./task-list-white.svg"
              alt="Notebook and pen | todo list logo"
            />
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

            <span className={style["sr-only"]}>Menu</span>
          </button>
          <BrowserRouter>
            <nav className={style.navigation}>
              <ul
                id="primary-navigation"
                className={`${style["primary-navigation"]} ${style.flex} ${
                  !isNavigationVisible ? style["primary-navigation-hidden"] : ""
                }`}
              >
                <li>
                  <Link to="/">My Todo Lists</Link>
                </li>
                <li className={style.active}>
                  <Link className={style["ff-sans-cond"]} to="/Default">
                    Todo List
                  </Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<CreateCustomTodoList />} />
              <Route
                path="/Default"
                element={<TodoContainer tableName={tableName} />}
              />
            </Routes>
          </BrowserRouter>
        </header>
      </ResizeAnimationStopper>
    </>
  );
}

export default App;
