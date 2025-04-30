let sadness = (p) => {
    let paintDrops = []; // 油漆滴列表
    let ripples = []; // 漣漪效果列表
  
    p.setup = () => {
      p.createCanvas(400, 380).parent("sadness");
      p.noStroke();
    };
  
    p.draw = () => {
      // 背景漸變效果
      let gradient = p.drawingContext.createLinearGradient(0, 0, 0, p.height);
      gradient.addColorStop(0, "rgba(5, 10, 30, 1)"); // 深藍色
      gradient.addColorStop(1, "rgba(15, 20, 50, 1)"); // 更深的藍色
      p.drawingContext.fillStyle = gradient;
      p.rect(0, 0, p.width, p.height);
  
      // 更新和顯示油漆滴
      for (let i = paintDrops.length - 1; i >= 0; i--) {
        let drop = paintDrops[i];
        drop.update();
        drop.display();
  
        // 如果油漆滴到底，創建漣漪效果
        if (drop.y > p.height - 10) {
          ripples.push(new Ripple(drop.x, p.height));
          paintDrops.splice(i, 1); // 移除該油漆滴
        }
      }
  
      // 更新和顯示漣漪
      for (let i = ripples.length - 1; i >= 0; i--) {
        let ripple = ripples[i];
        ripple.expand();
        ripple.display();
        if (ripple.alpha <= 0) {
          ripples.splice(i, 1); // 移除淡化的漣漪
        }
      }
  
      // 定期生成新的油漆滴
      if (p.frameCount % 20 === 0) {
        paintDrops.push(new PaintDrop(p.random(p.width), 0, p.random(3, 6)));
      }
    };
  
    // 油漆滴類
    class PaintDrop {
      constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = p.random(10, 20);
      }
  
      update() {
        this.y += this.speed; // 下落速度
      }
  
      display() {
        p.fill(10, 20, 100, 180); // 深藍色
        p.ellipse(this.x, this.y, this.size, this.size * 1.5);
      }
    }
  
    // 漣漪類
    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0;
        this.alpha = 120; // 起始透明度
      }
  
      expand() {
        this.size += 2; // 漣漪擴大速度
        this.alpha -= 2; // 逐漸淡化
      }
  
      display() {
        p.noFill();
        p.stroke(50, 80, 150, this.alpha);
        p.strokeWeight(1.5);
        p.ellipse(this.x, this.y, this.size, this.size / 2);
      }
    }
  };
  
  new p5(sadness);
  