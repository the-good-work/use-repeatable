import { Monster } from "../types/monster";
import styles from "../pages/index.module.css";
import React from "react";

export function MonsterCard({ monster }: { monster: Monster }) {
  return (
    <div className={styles.monsterCard}>
      <img
        className={styles.monsterImage}
        src={monster.image}
        alt={monster.name}
      />

      <div className={styles.monsterInfo}>
        <div className={styles.monsterIndex}>
          <h6>Monster Information</h6>
          <h5>{monster.number}</h5>
        </div>

        <div className={styles.monsterName}>
          <h6>Name</h6>
          <h5>{monster.name}</h5>
        </div>

        <div className={styles.monsterPower}>
          <h6>Power</h6>
          <h5>{monster.power}</h5>
        </div>

        <div className={styles.monsterType}>
          <h6>Type</h6>
          <h5>{monster.type}</h5>
        </div>
      </div>
    </div>
  );
}
