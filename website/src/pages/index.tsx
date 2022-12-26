import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`useRepeater ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <section className={styles.splash}>
          <div className={styles.clouds}>
            <div className={styles.textColumn}>
              <div className={styles.splashLayout}>
                <div className={styles.splashText}>
                  <h1>
                    One <span className={styles.orangeh1}>hook</span> to{" "}
                    <span className={styles.orangeh1}>repeat</span> them all
                  </h1>
                  <h2>
                    A plug-and-play React library to create repeatable fields
                    effortlessly.
                  </h2>
                </div>

                <div className={styles.mascot}>
                  <img
                    src="img/peter-dragon-black.svg"
                    alt="Peter the dragon, mascot of useRepeatable"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.splashSection}>
          <div className={styles.cloudBackground}>
            <div className={styles.headerContainer}>
              <div className={styles.headings}>
                <h1>
                  One <span className={styles.orangeh1}>hook</span> to{" "}
                  <span className={styles.orangeh1}>repeat</span> them all
                </h1>
                <p>
                  Create repeatable fields effortlessly.
                  <br />A plug-and-play React hook/component.
                </p>
              </div>

              <div className={styles.dragonContainer}>
                <img
                  src="img/peter-dragon-black.svg"
                  alt="null"
                  className={styles.dragonImage}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles.npmSection}>
          <div className={styles.brickBackground}>
            <div className={styles.npmContainer}>
              <h6>npm install @thegoodwork/use-repeatable</h6>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

// className={clsx("col col--10", styles.section)

{
  /* <div className={styles.background}>
          <section className={clsx("col col--8", styles.section)}>
            <div className={clsx("col col--6", styles.headercontainer)}>
              <div className={styles.headings}>
                <h1>
                  One <span className={styles.orangeh1}>hook</span> to{" "}
                  <span className={styles.orangeh1}>repeat</span> them all
                </h1>
                <p>
                  Create repeatable fields effortlessly. A plug-and-play React
                  hook/component.
                </p>
              </div>
              <div className={styles.npmcontainer}>
                <h6>npm install @thegoodwork/use-repeatable</h6>
              </div>
            </div>

            <div className={clsx("col col--7", styles.dragoncontainer)}>
              <img
                src="img/peter-dragon-black.svg"
                alt="null"
                className={styles.dragonimage}
              />
            </div>
          </section>
        </div> */
}
