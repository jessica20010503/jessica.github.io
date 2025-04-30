let joy = (p) => {
    let ribbons = [];
    let colors = [
      p.color(255, 87, 34),   // 橙色
      p.color(255, 193, 7),   // 黃色
      p.color(255, 105, 180), // 粉紅
      p.color(0, 188, 212),   // 天藍
      p.color(76, 175, 80)    // 綠色
    ];
    let centerX, centerY;
  
    p.setup = () => {
      p.createCanvas(400, 380).parent("joy");
      
      centerX = p.width / 2;
      centerY = p.height / 2;
  
      // 產生初始彩帶
      for (let i = 0; i < 10; i++) {
        ribbons.push(new Ribbon(i * p.TWO_PI / 10));
      }
    };
  
    p.draw = () => {
      p.background(255, 245, 200); // **淡黃色背景**
      
      // 更新 & 顯示所有彩帶
      for (let ribbon of ribbons) {
        ribbon.update();
        ribbon.display();
      }
    };
  
    // **彩帶類 - 沿著圓形軌跡運動**
    class Ribbon {
      constructor(angle) {
        this.angle = angle;
        this.radius = p.random(50, 100);
        this.twist = p.random(0.01, 0.05); // **旋轉速度**
        this.waveAmplitude = p.random(5, 15); // **擺動幅度**
        this.waveFrequency = p.random(0.05, 0.2); // **擺動頻率**
        this.length = p.random(30, 80);
        this.width = p.random(5, 15);
        this.color = colors[p.floor(p.random(colors.length))];
      }
  
      update() {
        this.angle += this.twist; // **彩帶旋轉**
        this.radius += p.sin(p.frameCount * this.waveFrequency) * this.waveAmplitude; // **擺動效果**
      }
  
      display() {
        let x = centerX + this.radius * p.cos(this.angle);
        let y = centerY + this.radius * p.sin(this.angle);
  
        p.push();
        p.translate(x, y);
        p.rotate(this.angle);
        p.fill(this.color);
        p.noStroke();
        p.rect(0, 0, this.length, this.width, 10); // **彩帶形狀**
        p.pop();
      }
    }
  
    // **滑鼠點擊時，新增更多彩帶**
    p.mousePressed = () => {
      for (let i = 0; i < 5; i++) {
        ribbons.push(new Ribbon(p.random(p.TWO_PI)));
      }
    };
  };
  
  new p5(joy);
  