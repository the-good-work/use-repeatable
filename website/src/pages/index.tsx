import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { featuresData } from "../components/featuresData.js";
import "animate.css";
import { useState } from "react";

import {
  CopyBlock,
  CodeBlock,
  atomOneLight,
  a11yLight,
  a11yDark,
} from "react-code-blocks";
import { docusaurusVersion } from "@generated/site-metadata";

// function HomepageHeader() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <header className={clsx("hero hero--primary", styles.heroBanner)}>
//       <div className="container">
//         <h1 className="hero__title">{siteConfig.title}</h1>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro"
//           >
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`useRepeater ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <section className={styles.splash}>
          <div className={` ${styles.clouds} ${styles.cloudsDarkMode}`}>
            <div className={styles.textColumn}>
              <div className={styles.splashLayout}>
                <div className={styles.splashText}>
                  <h1>
                    One <span className={styles.coloredh1}>hook</span> to{" "}
                    <span className={styles.coloredh1}>repeat</span> them all
                  </h1>
                  <h3>
                    A plug-and-play React library to create repeatable fields
                    effortlessly.
                  </h3>
                </div>

                <div className={styles.mascot}>
                  <img src="/img/peter-dragon.svg" alt="Peter the Dragon" />
                </div>
                <div className={styles.mascotDarkMode}>
                  <img
                    src="/img/darkmode/peter-dragon-dm.svg"
                    alt="Peter the Dragon"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.npm}>
          <div
            className={`${styles.brickBackground} ${styles.brickBackgroundDarkMode}`}
          >
            <div className={styles.container}>
              <div className={styles.npmSection}>
                <CopyBlock
                  customStyle={{}}
                  codeContainerStyle={{
                    border: 0,
                    padding: "20px",
                    background: "none",
                  }}
                  className={styles.npmCodeBlock}
                  theme={atomOneLight}
                  showLineNumbers={true}
                  text={`npm install @thegoodwork/use-repeatable
npm run start`}
                  language={`bash`}
                  codeBlock
                />
              </div>

              <section className={styles.demo}>
                <div className={styles.demoLayout}>
                  <div className={styles.trialElements}>
                    <img
                      src="./img/fireball.svg"
                      alt="Fireball"
                      className={styles.fireball}
                    />
                    <img
                      src="./img/darkmode/fireball-dm.svg"
                      alt="Fireball"
                      className={styles.fireballDarkMode}
                    />
                    <img
                      src="./img/sword.svg"
                      alt="Sword"
                      className={styles.sword}
                    />
                    <img
                      src="./img/darkmode/sword-dm.svg"
                      alt="Sword"
                      className={styles.swordDarkMode}
                    />
                    <img
                      src="./img/shield.svg"
                      alt="Shield"
                      className={styles.shield}
                    />
                    <img
                      src="./img/darkmode/shield-dm.svg"
                      alt="Shield"
                      className={styles.shieldDarkMode}
                    />
                  </div>
                  <div className={styles.demoArea}>
                    <div className={styles.demoHeading}>
                      <h4>Trial of The Repeater</h4>
                      <p>Test It Out!</p>
                    </div>
                    <div className={styles.demoWindow}>
                      <img src="./img/demo-area.svg" alt="demo area" />
                    </div>
                    <div className={styles.demoWindowDarkMode}>
                      <img
                        src="./img/darkmode/demo-area-dm.svg"
                        alt="demo area"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className={styles.usage}>
          <div className={styles.meadowTop}>
            <img src="/img/meadow-top.png" alt="Grass illustration" />
          </div>
          <div className={styles.meadowTopDarkMode}>
            <img
              src="/img/darkmode/meadow-top-dm.png"
              alt="Grass illustration"
            />
          </div>
          <div
            className={`${styles.meadowBottom} ${styles.meadowBottomDarkMode}`}
          >
            <div className={styles.usageLayout}>
              <div className={styles.codeBlockContainer}>
                <img src="/img/stag.svg" className={styles.stag} />
                <img
                  src="/img/darkmode/stag-dm.svg"
                  className={styles.stagDarkMode}
                />

                <div className={styles.codeBlockBase}>
                  <h4>Using The Hook</h4>

                  <div className={styles.codeBlock}>
                    <CodeBlock
                      className={styles.codeBlockCode}
                      theme={a11yLight}
                      showLineNumbers={true}
                      codeContainerStyle={{
                        border: 0,
                        padding: "30px",
                        background: "none",
                      }}
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
              </div>

              <div className={styles.codeBlockContainer}>
                <div className={styles.codeBlockBase}>
                  <h4>Using The Component</h4>

                  <div className={styles.codeBlock}>
                    <CodeBlock
                      language={`bash`}
                      codeBlock
                      theme={a11yLight}
                      showLineNumbers={true}
                      codeContainerStyle={{
                        border: 0,
                        padding: "30px",
                        background: "none",
                      }}
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
          <div className={styles.oceanTop}>
            <img src="./img/ocean-top.png" alt="Waves illustration" />
          </div>
          <div className={styles.oceanTopDarkMode}>
            <img
              src="./img/darkmode/ocean-top-dm.png"
              alt="Waves illustration"
            />
          </div>
          <div
            className={`${styles.oceanBottom} ${styles.oceanBottomDarkMode}`}
          >
            <div className={styles.featuresLayout}>
              <div className={styles.featuresContainer}>
                <h4>Features</h4>
                <img src="/img/jelly.svg" className={styles.jelly} />
                <img
                  src="/img/darkmode/jelly-dm.svg"
                  className={styles.jellyDarkMode}
                />

                <div className={styles.gridContainer}>
                  {featuresData.map((featuresData) => {
                    return <FeatureCard data={featuresData} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.learnMore}>
          <div className={styles.brickTop}>
            <img src="./img/brick-top.png" alt="brick wall" />
          </div>
          <div className={styles.brickTopDarkMode}>
            <img src="./img/darkmode/brick-top-dm.png" alt="brick wall" />
          </div>
          <div
            className={`${styles.brickBottom} ${styles.brickBottomDarkMode}`}
          >
            <div className={styles.learnMoreLayout}>
              <div className={styles.learnMoreText}>
                <h2>Adventure Awaits!</h2>
                <p>
                  There is so much more to learn about useRepeatable, read our
                  documentation or visit our repository to discover more!
                </p>
              </div>
              <div className={styles.wingedCreature}>
                <img src="./img/winged.svg" alt="winged creature" />
              </div>

              <div className={styles.wingedCreatureDarkMode}>
                <img src="./img/darkmode/winged-dm.svg" alt="winged creature" />
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
    <div className={styles.featureCardBackground}>
      <div className={styles.featureCardContent}>
        <h5>{data.header}</h5>
        <p>{data.info}</p>
      </div>
    </div>
  );
}

// className={clsx("col col--10", styles.section)
