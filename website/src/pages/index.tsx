import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { featuresData } from "../utils/featuresData.js";
import { monsterList } from "../utils/monsterList.js";
import "animate.css";
import { RepeatableList } from "@thegoodwork/use-repeatable";
import { CopyBlock, CodeBlock, a11yLight, a11yDark } from "react-code-blocks";
import { useState } from "react";
import {
  repeatableListCodeblock,
  useRepeatableCodeblock,
} from "../utils/codeblocks";
import { randomMonster } from "../utils/randomMonster";
import type { Monster } from "../types/monster";
import { MonsterCard } from "../components/MonsterCard";
import { FeatureCard } from "../components/FeatureCard";

export default function Home(): JSX.Element {
  const [monsters, setMonsters] = useState<(Monster & { id: string })[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
                  <h4>
                    A plug-and-play React library to create repeatable fields
                    effortlessly.
                  </h4>
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
                  customStyle={{
                    borderRadius: "15px",
                    background: "white",
                    padding: "20px",
                    border: 0,
                  }}
                  codeContainerStyle={{
                    border: 0,
                    background: "none",
                  }}
                  className={styles.npmCodeBlock}
                  theme={a11yLight}
                  showLineNumbers={false}
                  text={`npm install @thegoodwork/use-repeatable npm run start`}
                  language={`bash`}
                  codeBlock
                />
              </div>
              <div className={styles.npmSectionDarkMode}>
                <CopyBlock
                  customStyle={{
                    borderRadius: "15px",
                    background: "rgb(43, 43, 43)",
                    padding: "20px",
                    border: 0,
                  }}
                  codeContainerStyle={{
                    border: 0,
                    background: "none",
                  }}
                  className={styles.npmCodeBlock}
                  theme={a11yDark}
                  showLineNumbers={false}
                  text={`npm install @thegoodwork/use-repeatable npm run start`}
                  language={`bash`}
                  codeBlock
                />
              </div>

              <section className={styles.demo}>
                <RepeatableList
                  initialState={[]}
                  newItem={randomMonster(monsterList)}
                  Card={({ item, index, removeItem, DragHandle }) => (
                    <div className={styles.monsterItem}>
                      <div className={styles.cardButtons}>
                        <div>
                          <DragHandle>
                            <img
                              src="./img/drag-handle.svg"
                              alt="drag handle"
                              className={styles.dragHandle}
                            />
                          </DragHandle>
                        </div>
                        <div>
                          <MonsterCard monster={item} />
                        </div>

                        <div>
                          <button
                            onClick={() => removeItem(index)}
                            className={styles.removeButton}
                          >
                            <img
                              src="./img/remove-button.svg"
                              alt="Remove Monster"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  Layout={({ Cards, items, addItem }) => {
                    if (items.length >= 5) {
                      setButtonDisabled(true);
                    } else {
                      setButtonDisabled(false);
                    }

                    return (
                      <div id="demo-list" className={styles.demoList}>
                        <div className={styles.cardsContainer}>
                          {items.length > 0 ? (
                            Cards
                          ) : (
                            <div className={styles.cardsEmptyState}>
                              <h3>No monsters recruited!</h3>
                              <p>
                                Click on the button below to recruit some
                                monsters!
                              </p>
                            </div>
                          )}
                        </div>
                        <button
                          className={styles.addButton}
                          disabled={buttonDisabled}
                          onClick={() => {
                            addItem();
                          }}
                        >
                          Recruit More Monsters!
                        </button>
                      </div>
                    );
                  }}
                />

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
                    <h3>Castle Staff List</h3>
                    <p>Non-scary Demo</p>
                  </div>
                  <div className={styles.demoWindow}>
                    <img src="./img/demo-area.svg" alt="demo area" />
                  </div>
                  <div className={styles.demoWindowMobile}>
                    <img src="./img/demo-area-mobile.svg" alt="demo area" />
                  </div>
                  <div className={styles.demoWindowDarkMode}>
                    <img
                      src="./img/darkmode/demo-area-dm.svg"
                      alt="demo area"
                    />
                  </div>
                  <div className={styles.demoWindowDarkModeMobile}>
                    <img
                      src="./img/darkmode/demo-area-mobile-dm.svg"
                      alt="demo area"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className={styles.usage}>
          <div className={styles.meadowTop}>
            <img src="/img/meadow-top2.svg" alt="Grass illustration" />
          </div>
          <div className={styles.meadowTopDarkMode}>
            <img
              src="/img/darkmode/meadow-top-dm2.svg"
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
                  <h3>Using The Hook</h3>

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
                        background: "white",
                      }}
                      text={useRepeatableCodeblock}
                      language={`bash`}
                      codeBlock
                    />
                  </div>

                  <div className={styles.codeBlockDarkMode}>
                    <CodeBlock
                      className={styles.codeBlockCode}
                      theme={a11yDark}
                      showLineNumbers={true}
                      codeContainerStyle={{
                        border: 0,
                        padding: "10px",
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
                      text={useRepeatableCodeblock}
                      language={`tsx`}
                      codeBlock
                    />
                  </div>
                </div>
              </div>

              <div className={styles.codeBlockContainer}>
                <div className={styles.codeBlockBase}>
                  <h3>Using The Component</h3>

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
                      text={repeatableListCodeblock}
                    />
                  </div>

                  <div
                    className={styles.codeBlockDarkMode}
                    style={{ fontFamily: "IBM Plex Mono" }}
                  >
                    <CodeBlock
                      language={"tsx"}
                      codeBlock
                      theme={a11yDark}
                      wrapLongLines={true}
                      showLineNumbers={true}
                      codeContainerStyle={{
                        border: 0,
                        padding: "10px",
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
                      text={repeatableListCodeblock}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.oceanTop}>
            <img src="./img/ocean-top.svg" alt="Waves illustration" />
          </div>
          <div className={styles.oceanTopDarkMode}>
            <img
              src="./img/darkmode/ocean-top-dm2.svg"
              alt="Waves illustration"
            />
          </div>
          <div
            className={`${styles.oceanBottom} ${styles.oceanBottomDarkMode}`}
          >
            <div className={styles.featuresLayout}>
              <div className={styles.featuresContainer}>
                <h3>Features</h3>
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
                <h1>Adventure Awaits!</h1>
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
