import React from "react";
import clsx from "clsx";
import peterDragon from "@site/static/img/peter-dragon-black.svg";
import styles from "./App.module.css";

export default function App() {
  return (
    <section>
      <div className="heading-container">
        <div>
          <h1>
            One <span>hook</span> to <span>repeat</span> them all
          </h1>
          <p>
            Create repeatable fields effortlessly. A plug-and-play React
            hook/component.
          </p>
        </div>
      </div>
      <div>
        <img src={peterDragon} alt="null" />
      </div>
    </section>
  );
}
