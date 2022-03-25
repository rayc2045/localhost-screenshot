const blocks = [];
const colors = [
  'red',
  'yellow',
  'blue',
  'gray',
  'white', 'white', 'white', 'white', 'white',
  'white', 'white', 'white', 'white', 'white',
];

for (let i = 0; i < 1000; i++) {
  generateBlock();
}

function generateBlock() {
  const [columnNum, rowNum] = [getRandomNum(2, 4), getRandomNum(2, 4)];
  const block = {
    style: getGridStyle(columnNum, rowNum),
    colors: getColors(columnNum * rowNum),
  };
  if (colorsRepeated(block.colors)) return generateBlock();
  blocks.push(block);
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getGridStyle(columnNum, rowNum) {
  let [column, row] = ['', ''];
  for (let i = 0; i < columnNum; i++)
    column += `${getRandomPositiveDecimal(2)}fr `;
  for (let i = 0; i < rowNum; i++) row += `${getRandomPositiveDecimal(2)}fr `;
  return `grid-template-columns: ${column.trim()}; grid-template-rows: ${row.trim()}`;
}

function getRandomPositiveDecimal(n) {
  return (
    getRandomNum(1, 9) +
    getRandomNum(0, 9) / 10 +
    getRandomNum(0, 9) / 100
  ).toFixed(n);
}

function getColors(n) {
  const newColors = [];
  for (let i = 0; i < n; i++) {
    newColors.push(
      colors[getRandomNum(0, colors.length - 1)]
    );
  }
  return newColors;
}

function colorsRepeated(colors) {
  let isRepeated = false;
  for (let i = 0; i < blocks.length; i++) {
    if (arraysEqual(blocks[i].colors, colors)) isRepeated = true;
  }
  return isRepeated;
}

function arraysEqual(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

const path = require('path');
const fs = require('fs');

fs.writeFileSync(
  `${__dirname}/blocks.json`,
  JSON.stringify(blocks)
);