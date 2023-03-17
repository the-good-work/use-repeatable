import styles from "../pages/index.module.css";
import React from "react";

export function FeatureCard({ data }) {
  return (
    <div className={styles.featureCardBackground}>
      <div className={styles.featureCardContent}>
        <h5>{data.header}</h5>
        <p>{data.info}</p>
      </div>
    </div>
  );
}
