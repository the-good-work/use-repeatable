import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { featuresData } from "./featuresData.js";

import {
  CopyBlock,
  CodeBlock,
  dracula,
  atomOneLight,
  a11yLight,
  a11yDark,
} from "react-code-blocks";

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

        <section className={styles.npmSection}>
          <div className={styles.brickBackground}>
            <div className={styles.npmContainer}>
              <CopyBlock
                className={styles.npmcodeBlock}
                theme={atomOneLight}
                showLineNumbers={true}
                text={`npm install @thegoodwork/use-repeatable
npm run start`}
                language={`bash`}
                codeBlock
              />
            </div>
          </div>
        </section>
        <section className={styles.usage}>
          <div className={styles.meadowTop}>
            <div className={styles.meadowBottom}>
              <div className={styles.usageLayout}>
                <div className={styles.copyBlockContainer}>
                  <h3>Using The Hook</h3>
                  <img src="/img/stag.svg" className={styles.stag} />
                  <div className={styles.copyBlock}>
                    <CodeBlock
                      className={styles.copyBlockCode}
                      theme={a11yLight}
                      showLineNumbers={true}
                      customStyle={{
                        fontFamily: "input-mono-narrow, monospace",
                        height: "auto",
                        overflow: "scroll",
                        borderRadius: "20px",
                        fontSize: "14px",
                        padding: "0",
                        borderWidth: 0,
                        margin: 0,
                        boxShadow: "none",
                      }}
                      text={`import {useRepeatable} from 'use-repeatable'

type Fruit = { color: string; name: string }; 
                
// default new item is required 
const fruit: Fruit = { color: "red", name: "apple" }; 
                
// optionally initialise with collection of objects
const initialFruits = [ 
      { color: "red", name: "apple" }, 
      { color: "orange", name: "orange" }, 
  ];
                
function App() {
const { items, removeItem, addItem, moveItem } = useRepeatable({
      newItem: fruit,
      initialState: initialFruits, 
    }); 
... 
}`}
                      language={`bash`}
                      codeBlock
                    />
                  </div>
                </div>

                <div className={styles.copyBlockContainer}>
                  <h3>Using The Component</h3>
                  <div className={styles.copyBlock}>
                    <CodeBlock
                      language={`bash`}
                      codeBlock
                      theme={a11yLight}
                      showLineNumbers={true}
                      customStyle={{
                        fontFamily: "input-mono-narrow, monospace",
                        height: "auto",
                        overflow: "scroll",
                        borderRadius: "20px",
                        fontSize: "14px",
                        padding: "0",
                        borderWidth: 0,
                      }}
                      text={`import {useRepeatable} from 'use-repeatable'

type Fruit = { color: string; name: string }; 
                    
// default new item is required 
const fruit: Fruit = { color: "red", name: "apple" }; 
                    
// optionally initialise with collection of objects
const initialFruits = [ 
    { color: "red", name: "apple" }, 
    { color: "orange", name: "orange" }, 
  ];
                    
function App() {
return <RepeatableList 
    onChange={() => null}
    newItem={fruit}
    initialState={initialFruits}
  ... />
  }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.ocean}>
            <div className={styles.featuresLayout}>
              <h3>Features</h3>
              <img src="/img/jelly.svg" className={styles.jelly} />

              <div className={styles.gridContainer}>
                {featuresData.map((featuresData) => {
                  return <FeatureCard data={featuresData} />;
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function FeatureCard({ data }) {
  return (
    <div className={styles.featureCard}>
      <h4>{data.header}</h4>
      <p>{data.info}</p>
    </div>
  );
}

// className={clsx("col col--10", styles.section)
