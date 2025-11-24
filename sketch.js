let frames = [];
const FRAME_COUNT = 14;
let currentFrame = 0;
let lastChange = 0;
const FRAME_INTERVAL = 100; // milliseconds per frame (10 FPS)
let frames2 = [];
const FRAME2_COUNT = 14;
const FRAME2_START = 14; // folder 2 files are named 14.png..27.png
let currentFrame2 = 0;
let lastChange2 = 0;
let frames3 = [];
const FRAME3_COUNT = 21;
const FRAME3_START = 28; // folder 3 files are named 28.png..48.png
let currentFrame3 = 0;
let lastChange3 = 0;

function preload() {
  // 檔案名稱是 0.png ~ 13.png（共 14 張），因此從 0 開始載入
  for (let i = 0; i < FRAME_COUNT; i++) {
    frames.push(loadImage(`1/${i}.png`));
  }
  // 載入資料夾 2 的影格（從 14.png 開始）
  for (let i = FRAME2_START; i < FRAME2_START + FRAME2_COUNT; i++) {
    frames2.push(loadImage(`2/${i}.png`));
  }
  // 載入資料夾 3 的影格（從 28.png 開始，共 21 張）
  for (let i = FRAME3_START; i < FRAME3_START + FRAME3_COUNT; i++) {
    frames3.push(loadImage(`3/${i}.png`));
  }
  // (純動畫版：不載入音訊)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  // (純動畫版：不建立音訊控制 UI)
}

// (已移除：檔案上傳處理)

// (已移除：生成音樂相關函式)

// (已移除：自動搜尋與載入專案根目錄音訊)

function draw() {
  background('#ffc8dd');

  if (frames.length === 0) return;
  if (frames2.length === 0) {
    // 若第二組影格不存在，僅顯示第一組
  }

  // 固定幀間隔（純動畫版）
  const dynamicInterval = FRAME_INTERVAL;

  const cy = height / 2;

  // 計算放大後尺寸
  const img1 = frames[currentFrame];
  const drawW1 = img1.width * 5;
  const drawH1 = img1.height * 5;

  let drawW3 = 0;
  let drawH3 = 0;
  if (frames3.length > 0) {
    const imgA = frames3[currentFrame3];
    drawW3 = imgA.width * 5;
    drawH3 = imgA.height * 5;
  }

  let drawW2 = 0;
  let drawH2 = 0;
  if (frames2.length > 0) {
    const imgB = frames2[currentFrame2];
    drawW2 = imgB.width * 5;
    drawH2 = imgB.height * 5;
  }

  const spacing = 100; // 兩動畫之間的間距（已放大）
  // 計算三個動畫的總寬度（若不存在某組則跳過）
  const groupW = (drawW3 > 0 ? drawW3 : 0) + (drawW3 > 0 ? spacing : 0) + drawW1 + (drawW2 > 0 ? spacing + drawW2 : 0);
  const leftX = width / 2 - groupW / 2;

  // 第一組（左邊）: frames3
  if (frames3.length > 0) {
    const cx3 = leftX + drawW3 / 2;
    image(frames3[currentFrame3], cx3, cy, drawW3, drawH3);
  }

  // 第二組（中間）: frames (全部的圖 吸氣)
  const cx1 = leftX + (drawW3 > 0 ? drawW3 + spacing + drawW1 / 2 : drawW1 / 2);
  image(img1, cx1, cy, drawW1, drawH1);

  // 第三組（右邊）: frames2
  if (frames2.length > 0) {
    const cx2 = leftX + (drawW3 > 0 ? drawW3 + spacing : 0) + drawW1 + spacing + drawW2 / 2;
    image(frames2[currentFrame2], cx2, cy, drawW2, drawH2);
  }

  if (millis() - lastChange > dynamicInterval) {
    currentFrame = (currentFrame + 1) % FRAME_COUNT;
    lastChange = millis();
  }
  if (frames2.length > 0 && millis() - lastChange2 > dynamicInterval) {
    currentFrame2 = (currentFrame2 + 1) % FRAME2_COUNT;
    lastChange2 = millis();
  }
  if (frames3.length > 0 && millis() - lastChange3 > dynamicInterval) {
    currentFrame3 = (currentFrame3 + 1) % FRAME3_COUNT;
    lastChange3 = millis();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
