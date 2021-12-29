const additionalSymbols = ["X", "O"];

const colorScheme = {
  X: "green",
  O: "red",
};

const winSchemas = [
  //horizontaly
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //verticaly
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonaly
  [0, 4, 8],
  [2, 4, 6],
];

const lineClassSchema = [
  "hor1",
  "hor2",
  "hor3",
  "ver1",
  "ver2",
  "ver3",
  "dig1",
  "dig2",
];

let win = false;
