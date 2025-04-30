let hope = (p) => {
    let lights = []; // 儲存光芒效果
  
    p.setup = () => {
      p.createCanvas(400, 380).parent("hope");
      p.noStroke();
  
      // 初始化光芒的位置
      for (let i = 0; i < 10; i++) {
        lights.push(new LightSource(p.random(p.width), p.random(p.height)));
      }
    };
  
    p.draw = () => {
      // 黑暗背景
      p.background(10, 10, 30);
  
      // 繪製並更新光芒
      for (let light of lights) {
        light.update();
        light.display();
      }
  
      // 滑鼠互動光源
      if (p.mouseIsPressed) {
        lights.push(new LightSource(p.mouseX, p.mouseY));
      }
    };
  
    // 光源類
    class LightSource {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseSize = p.random(50, 80); // 光芒的基礎大小
        this.pulseSpeed = p.random(0.05, 0.1); // 光芒的脈動速度
        this.timeOffset = p.random(p.TWO_PI); // 時間偏移量，用於動態閃爍
        this.intensity = 0; // 透明度變化
      }
  
      update() {
        // 計算大小的變化（脈動效果）
        this.size = this.baseSize + p.sin(p.frameCount * this.pulseSpeed + this.timeOffset) * 10;
  
        // 如果滑鼠靠近光源，增加亮度
        let distance = p.dist(p.mouseX, p.mouseY, this.x, this.y);
        if (distance < 100) {
          this.intensity = p.map(distance, 0, 100, 255, 50);
        } else {
          this.intensity = p.lerp(this.intensity, 50, 0.05);
        }
      }
  
      display() {
        for (let i = 10; i > 0; i--) {
          let alpha = this.intensity / i + p.sin(p.frameCount * 0.1 + this.timeOffset) * 20; // 閃爍效果
          p.fill(255, 165, 0, alpha); // 暖橘色光芒
          p.ellipse(this.x, this.y, this.size * i * 0.1);
        }
      }
    }
  };
  
  new p5(hope);
  