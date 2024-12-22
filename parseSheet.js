const fs = require("fs");

const uuid = require("uuid");

fs.readFile("./fighters.csv", "utf8", function (err, data) {
  const output = [];
  const source = data.split(/\r?\n/);

  source.forEach((name) => {
    output.push(
      JSON.stringify({
        id: uuid.v4(),
        name: name.trim(),
      }),
    );
  });

  const file = `
  import {type TFighter} from '../types';
  export const fighters: TFighter[] = [
    ${output.join(",\n")}
  ];
  `;

  fs.writeFileSync("./config/staticFighters.ts", file);
});
