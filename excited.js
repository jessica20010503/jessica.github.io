let excited = (p) => {
  let circlesTension = [];
  let intensityTension = 0;
  let flickerTension = 0;
  let colorsTension;
  let distanceValue = 100; // 預設距離值
  let serial; // Web Serial 變數

  class JitterCircle {
      constructor(x, y, d) {
          this.x = x;
          this.y = y;
          this.d = d;
          this.color = p.random(colorsTension);
      }

      update() {
          // 距離小時 → 晃動小，距離大時 → 晃動大
          let shakeFactor = p.map(distanceValue, 5, 200, 0.2, 3, true);

          this.x += p.random(-shakeFactor, shakeFactor);
          this.y += p.random(-shakeFactor, shakeFactor);
          this.d += p.random(-intensityTension * shakeFactor, intensityTension * shakeFactor);
      }

      display() {
          p.noFill();
          p.stroke(this.color);
          p.strokeWeight(3);

          let distance = p.dist(p.mouseX, p.mouseY, this.x, this.y);
          let waveFactor = 0;

          if (distance < this.d / 2 + 10) {
              waveFactor = p.sin(p.frameCount * 0.2) * 5;
          }

          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += p.PI / 12) {
              let xOff = p.cos(a) * (this.d / 2 + waveFactor * p.sin(a * 4));
              let yOff = p.sin(a) * (this.d / 2 + waveFactor * p.cos(a * 4));
              p.vertex(this.x + xOff, this.y + yOff);
          }
          p.endShape(p.CLOSE);
      }
  }

  p.setup = () => {
      let cnv1 = p.createCanvas(400, 400);
      cnv1.parent("excited");
      colorsTension = [
          p.color(0, 255, 255), // 螢光藍
          p.color(255, 0, 255), // 螢光粉
          p.color(255, 255, 0)  // 螢光黃
      ];

      // 初始化 Web Serial
      document.getElementById("connectButton").addEventListener("click", connectSerial);
  };

  p.draw = () => {
      flickerTension = p.noise(p.frameCount * 0.1) * 30;
      p.background(10, 10, 50 + flickerTension);

      // **根據距離調整圖形數量**
      let targetCircleCount = p.map(distanceValue, 5, 200, 3, 15, true);
      while (circlesTension.length < targetCircleCount) {
          circlesTension.push(new JitterCircle(p.random(p.width), p.random(p.height), p.random(40, 80)));
      }
      while (circlesTension.length > targetCircleCount) {
          circlesTension.pop();
      }

      for (let circle of circlesTension) {
          circle.update();
          circle.display();
      }

      p.stroke(255, p.random(100, 255));
      p.strokeWeight(p.random(1, 3));
      p.line(p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height));

      intensityTension = p.sin(p.frameCount * 0.1) * 10;
  };

  // Web Serial 連接函式
  async function connectSerial() {
      try {
          serial = await navigator.serial.requestPort();
          await serial.open({ baudRate: 9600 });
          readSerialData();
      } catch (err) {
          console.error("無法連接到 Serial 裝置", err);
      }
  }

  // 讀取 Serial 數據
  async function readSerialData() {
      const reader = serial.readable.getReader();
      let decoder = new TextDecoder();

      while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          let data = decoder.decode(value).trim();
          if (!isNaN(data)) {
              distanceValue = parseFloat(data);
              console.log("超音波距離:", distanceValue);
          }
      }
      reader.releaseLock();
  }
};

new p5(excited);
