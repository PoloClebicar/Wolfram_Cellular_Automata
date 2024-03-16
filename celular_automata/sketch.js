const width = 900;
const height = 600;

let rule = 225;
let ruleArray = Array.from(binaryRule(rule));

const collNum = 450;
const rowNum = 150;
let rowNumBuffer = 1;

let count = 0;

const gridSizeX = width/collNum;
const gridSizeY = height/rowNum;

let currentX = 0;
let currentY = 0;

let a;
let b;
let c;

let cells = new Array(collNum);
let fullRow =new Array(rowNum);

let currentRow = 1;

function setup() {
 // put setup code here
  console.log(ruleArray);
  frameRate(45);
  createCanvas(width, height);
  background(255);

  //console.log("Cells ", cells);
  //console.log("Rows ", fullRow);
  
  for (i = 0; i < collNum; i++){
    if(i === Math.floor(collNum/2)){
      cells[i] = 1;
    }else{
      cells[i] = 0;
    }
  }

  fullRow[0] = cells.slice();

  for (j = 0; j < rowNum - 1; j ++){
    fullRow[j + 1] = fillArray(j);
  }
  let currentRow = 1;
}

function draw() {
  //noLoop()
  //count++;

  if(count >= (rowNum * 0.5)){
    randomRule();
    ruleArray = Array.from(binaryRule(rule));
    count = 0;
    console.log("Rule: ", rule);
  }
  for(currentLine = 0; currentLine < rowNumBuffer; currentLine++){
    for (currentBox = 0; currentBox < collNum; currentBox++){
    noStroke();
    fill((255 - (fullRow[currentLine][currentBox] * 255)));
    rect(currentX, currentY, gridSizeX, gridSizeY);
    currentX += gridSizeX;
    }
    currentY += gridSizeY
    currentX = 0;
  }
  currentY = 0;


  if(rowNumBuffer < rowNum){
    rowNumBuffer++;
  }else{ 

    for (j = 0; j < rowNum - 1; j ++){
      fullRow[j] = fullRow[j + 1];
    }
      fullRow[rowNum - 1] = fillArray(rowNum - 2);
  }
  
 }

function fillArray(j){
    for(i = 0; i < collNum; i ++){
      if(i === 0){
      a = fullRow[j][collNum - 1];
      b = fullRow[j][i];
      c = fullRow[j][i + 1];
      }else if( i === collNum - 1){
      a = fullRow[j][i - 1];
      b = fullRow[j][i];
      c = fullRow[j][0];
      }else{
      a = fullRow[j][i - 1];
      b = fullRow[j][i];
      c = fullRow[j][i + 1];
      }
      cells[i] = cellAuto(a, b, c);
     }
  return cells.slice();
}
function randomize(){
  return Math.floor(Math.random() * 2);
}

function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}

function binaryRule(rule) {
    return (rule.toString(2).padStart(8, "0"));
    
}
 function randomRule(){
    rule = Math.floor(Math.random() * 254) + 1;
}

function cellAuto(a,b,c){
  let nH;
  nH = "" + a + b + c;

    switch (nH) {
    case "000":
      if(ruleArray[7] === "0"){
        return 0;
      }else{ return 1; }
      break;
    case "001":
      if(ruleArray[6] === "0"){
        return 0;
      }else{ return 1; }
      break;
    case "010":
      if(ruleArray[5] === "0"){
        return 0;
      }else{ return 1; }
      break;
    case "011":
      if(ruleArray[4] === "0"){
        return 0;
      }else{ return 1; }
    case "100":
      if(ruleArray[3] === "0"){
        return 0;
      }else{ return 1; }
    case "101":
      if(ruleArray[2] === "0"){
        return 0;
      }else{ return 1; }
    case "110":
      if(ruleArray[1] === "0"){
        return 0;
      }else{ return 1; }
    case "111":
      if(ruleArray[0] === "0"){
        return 0;
      }else{ return 1; }
    default:
      break;
  }
}
