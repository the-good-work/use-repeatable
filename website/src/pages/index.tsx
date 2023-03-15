import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { featuresData } from "../components/featuresData.js";
import { monsterData } from "../components/monsterData.js";
import "animate.css";
import { RepeatableList } from "@thegoodwork/use-repeatable";
import { CopyBlock, CodeBlock, a11yLight, a11yDark } from "react-code-blocks";
import { useState } from "react";
import { filter } from "lodash";

type Monster = {
  name: string;
  power: string;
  type: string;
  number: string;
  image: string;
};

// para monsters = user created array of monsters
// m = individual monster in the monsters array
// the sequencer function looks for monsters that are NOT present in the user created array
// and put this list of monsters in an array called filteredMonsters
// it then returns the 1st monster that is in the filteredMonsters list

function randomizer(monsters: Monster[]) {
  const randomIndex = Math.floor(Math.random() * monsters.length);

  if (randomIndex === monsters.length) {
    return monsters[randomIndex - 1];
  }
  // floor of (0/1 * 4(no. of monsters index)-1)

  console.log(monsters[randomIndex], randomIndex);
  return monsters[randomIndex];

  //   const filteredMonsters = monsterData.filter((m) => {
  //     return monsters.indexOf(m) === -1;
  //   });
  //   return filteredMonsters[0];
}

export default function Home(): JSX.Element {
  const [monsters, setMonsters] = useState<(Monster & { id: string })[]>([]);
  // when things are added into the repeater, it will generate a new id for the item added
  const [disable, setDisable] = useState(false);

  // newItem={sequencer()}

  // const arrOfMonsters = monsters;
  // const uniqueMon = arrOfMonsters.filter((item, index) => {
  //   return arrOfMonsters.indexOf(item) === index;
  // });

  const monster: Monster = {
    name: "Potamus",
    power: "Sword Crusher",
    type: "Heavyweight",
    number: "001",
    image: "/img/mon-potamus.svg",
  };
  //default new item: default 1st monster, empty state of sort
  // add randomizer, utility function to initialize, on the Recruit button, or standard sequence

  const initialMonster = [
    {
      name: "Potamus",
      power: "Sword Crusher",
      type: "Heavyweight",
      number: "001",
      image: "/img/mon-potamus.svg",
    },
  ];

  const { siteConfig } = useDocusaurusContext();
  // const { items, removeItem, addItem, moveItem } = useRepeatable({
  //   newItem: monster,
  //   initialState: initialMonster,
  // });
  // const { items, removeItem, addItem, moveItem } = useRepeatable({
  //   newItem: monster,
  //   initialState: initialMonster,
  // });
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
                  <h2>
                    <h2>
                      A plug-and-play React library to create repeatable fields
                      effortlessly.
                    </h2>
                  </h2>
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
                  showLineNumbers={true}
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
                  showLineNumbers={true}
                  text={`npm install @thegoodwork/use-repeatable npm run start`}
                  language={`bash`}
                  codeBlock
                />
              </div>

              <section className={styles.demo}>
                <div className={styles.repeatableContainer}>
                  <RepeatableList
                    onChange={(items) => {
                      setMonsters(items);
                    }}
                    initialState={[]}
                    newItem={randomizer(monsterData)}
                    Card={({
                      DragHandle,
                      item,
                      items,
                      index,
                      removeItem,
                      addItem,
                      moveItem,
                    }) => (
                      <div>
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
                            <MonsterCard monsterData={item} />
                          </div>

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

                        {/* {monsterData.map((monsterData) => {
                            return ();
                          })} */}
                      </div>
                    )}
                    Layout={({ Cards, items, addItem }) => {
                      if (items.length >= 5) {
                        setDisable(true);
                      } else {
                        setDisable(false);
                      }

                      return (
                        <>
                          <div id="demo-list" className={styles.demoList}>
                            {Cards}
                          </div>

                          <button
                            className={styles.addButton}
                            disabled={disable}
                            onClick={() => {
                              addItem();
                            }}
                          >
                            Recruit More Monsters!
                          </button>
                        </>
                      );
                    }}
                  />
                </div>

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
                  <div className={styles.demoWindowDarkMode}>
                    <img
                      src="./img/darkmode/demo-area-dm.svg"
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
                      text={`import {useRepeatable} from '@thegoodwork/use-repeatable'
                    
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

                  <div className={styles.codeBlockDarkMode}>
                    <CodeBlock
                      className={styles.codeBlockCode}
                      theme={a11yDark}
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
                      text={`import {useRepeatable} from '@thegoodwork/use-repeatable'

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

                  <div className={styles.codeBlockDarkMode}>
                    <CodeBlock
                      language={`bash`}
                      codeBlock
                      theme={a11yDark}
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
// when theres object involve, use { monsterData }: { monsterData: Monster },
// { monsterData } has the type of { monsterData: Monster }, which in turns have its own specificied type within the object;  Monster
function MonsterCard({ monsterData }: { monsterData: Monster }) {
  return (
    <div className={styles.monsterCard}>
      <div className={styles.monsterCardBackground}>
        <div className={styles.monsterImage}>
          <img src={monsterData.image} alt={monsterData.name} />
        </div>
        <div className={styles.monsterInfo}>
          <div className={styles.monsterIndex}>
            <h6>Monster Information</h6>
            <h5>{monsterData.number}</h5>
          </div>
          {/* <hr className={styles.horizontalLine}/> */}

          <div className={styles.monsterName}>
            <h5>{monsterData.name}</h5>
            <h6>Name</h6>
          </div>

          <div className={styles.monsterPower}>
            <h5>{monsterData.power}</h5>
            <h6>Power</h6>
          </div>

          <div className={styles.monsterType}>
            <h5>{monsterData.type}</h5>
            <h6>Type</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

// className={clsx("col col--10", styles.section)

///////////////////////////////////////// no duplicates /////////////////
// how to use array.find() / array.filter() to check if the monster already exists (if remove button is used)
// indexOf()

// if index of monster is greater than -1, it means the monster is present.

// if a specific MonsterCard is present, then when the <AddButton/> is clicked again, it should skip that index and add the next index in line

// const MonstersPresent = MonstersAvailable.filter(MonstersAvailable => index > -1)

// Disabler
// How to: Disable recuit monster button if <MonsterCard/>.length >= 5
// if <MonsterCard/>.length = 5, <AddButton/> disabled = true
// if (<MonsterCard/>.length = 5)? <AddButton/> disabled : <AddButton/> enabled
//  measure length of clicks? if <AddButton/> clicked = 5, disable button

// function disabler(items) {
//   items.length >= 5 ? disable : null;
//   // if (items.length >= 5) {
//   //   return (disableButton = true);
//   // } else {
//   //   return (disableButton = false);
//   // }
// }

function Button({ AddButton }) {
  return (
    <>
      <button>Recruit More Monsters!</button>
    </>
  );
}
