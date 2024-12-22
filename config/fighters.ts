import {
  uniqueNamesGenerator,
  type Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { v4 } from "uuid";

import { type TFighter } from "../types";

const makeRecord = () => {
  return Math.floor(Math.random() * (100 - 0) + 0);
};

export const getFighters = () => {
  const nameConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: " ",
    length: 2,
  };

  const FIGHTER_LIST = 100;
  const fighters: TFighter[] = [];

  for (let i = 0; i < FIGHTER_LIST; i++) {
    fighters.push({
      name: uniqueNamesGenerator(nameConfig),
      id: v4(),
    });
  }

  return fighters;
};
