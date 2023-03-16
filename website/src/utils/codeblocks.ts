export const useRepeatableCodeblock = `
import {useRepeatable} from '@thegoodwork/use-repeatable'
                    
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

  return (
    <div className="repeatableList">
      {items.map((item, index) => {
        return (
          <MonsterCard
						key={item.id}
            moveItem={moveItem}
            item={item}
            index={index}
            removeItem={removeItem}
          />
        );
      })}
      <button
        className="addButton"
        onClick={() => {
          addItem();
        }}
      >
        Recruit More Monsters!
      </button>
    </div>
  );
}
`;

export const repeatableListCodeblock = `
import { RepeatableList } from "@thegoodwork/use-repeatable";
import React, { useState } from "react";
import { monsterList } from "utils/monsterList";

type Monster = {
	name: string;
	power: string;
	type: string;
	number: string;
	image: string;
};

function randomizer(monsters: Monster[]) {
	const randomIndex = Math.floor(Math.random() * monsters.length);

	if (randomIndex === monsters.length) {
		return monsters[randomIndex - 1];
	}
	return monsters[randomIndex];
}

export default function App() {
	const [monsters, setMonsters] = useState<(Monster & { id: string })[]>([]);

	return (
        <RepeatableList
            onChange={(items) => {
                setMonsters(items);
            }}
            initialState={[]}
            newItem={randomizer(monsterList)}
            Card={({ DragHandle, item, index, removeItem }) => (
                <div className={"monsterItem"}>
                    <div>
                        <DragHandle>
                            <img
                                src="./img/drag-handle.svg"
                                alt="drag handle"
                                className={"dragHandleImage"}
                            />
                        </DragHandle>
                    </div>
                    <div className={"monsterCard"}>
                        <img
                            className={"monsterImage"}
                            src={item.image}
                            alt={item.name}
                        />

                        <div className={"monsterInfo"}>
                            <div className={"monsterIndex"}>
                                <h6>Monster Information</h6>
                                <h5>{item.number}</h5>
                            </div>

                            <div className={"monsterName"}>
                                <h5>{item.name}</h5>
                                <h6>Name</h6>
                            </div>

                            <div className={"monsterPower"}>
                                <h5>{item.power}</h5>
                                <h6>Power</h6>
                            </div>

                            <div className={"monsterType"}>
                                <h5>{item.type}</h5>
                                <h6>Type</h6>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => removeItem(index)}
                        className={"removeButton"}
                    >
                        <img src="./img/remove-button.svg" alt="Remove monster" />
                    </button>
                </div>
            )}
            Layout={({ Cards, addItem }) => {
                return (
                    <div className={"repeatableList"}>
                        <div>{Cards}</div>
                        <button
                            className={"addButton"}
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
	);
}
`;
