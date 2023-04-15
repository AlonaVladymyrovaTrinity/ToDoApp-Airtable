import React from "react";
import style from "../css/About.module.css"; // Local CSS module
import baseStyles from "../css/base.module.css"; // Shared CSS module

const About = () => {
  return (
    <div className={`${baseStyles.container}`}>
      <h1 className={`${baseStyles.header} ${style.header}`}>About</h1>
      <div className={`${baseStyles.ListItem} ${style.ListItem}`}>
        <div>
          <h2>Welcome to the "To-do List App"</h2>
          <p>
            A powerful and user-friendly application designed to streamline your
            task management process. Our fast and responsive app allows you to
            easily create and store different lists, helping you stay organized
            and on top of your daily to-do's across all your devices, from
            phones to desktops.
          </p>
        </div>
        <div>
          <h2>Features</h2>
          <p>
            Our app comes equipped with an intuitive interface, allowing you to
            easily add new list items, delete list items, and edit existing
            items. You can even cancel editing or save your changes with ease.
            Plus, with the ability to search and sort through your items,
            finding what you need has never been easier.
          </p>
          <p>
            At a glance, you can view how many items are in each list, helping
            you stay on top of your progress. You can also view how many lists
            you have, along with the number of tasks associated with each one.
          </p>
          <p>
            But that's not all - our app also includes a separate page for
            adding notes. Whether you need to jot down a quick thought or a
            detailed plan, our note-taking feature has you covered.
          </p>
        </div>
        <div>
          <h2>Optimized for a seamless experience</h2>
          <p>
            To ensure seamless functionality, our fast app made on React uses
            AirTable for data storage and manipulation is done through REST API.
            Developed by Alona Vladymyrova, this app is optimized for a seamless
            and efficient experience, helping you stay on top of your to-do's
            without missing a beat.
          </p>
        </div>
        <div>
          <h2>Thank you for choosing the "To-do List App"</h2>
          <p>
            Thank you for choosing the "To-do List App". We're confident that
            our app will help you stay organized and productive, no matter what
            your to-do list entails.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
