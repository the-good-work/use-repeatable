import type { Monster } from "../types/monster";

export function randomMonster(monsters: Monster[]) {
  const randomIndex = Math.floor(Math.random() * monsters.length);

  if (randomIndex === monsters.length) {
    return monsters[randomIndex - 1];
  }

  return monsters[randomIndex];
}
