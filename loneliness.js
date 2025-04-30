let loneliness = (p) => {
  let rotationSpeed = 0.01; // 初始旋轉速度
  p.setup = () => {
    p.createCanvas(400, 380, p.WEBGL).parent("loneliness");
    p.angleMode(p.DEGREES);
  };

  p.draw = () => {
    p.background(10, 20, 40); // 深藍背景突顯孤獨

    // 檢查滑鼠是否在畫布內
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      rotationSpeed = 0.05; // 提升旋轉速度
    } else {
      rotationSpeed = 0.01; // 恢復正常速度
    }

    // 繪製縮小的中心球體
    p.push();
    p.noStroke();
    p.fill(50, 100, 200, 200); // 冷色調球體
    p.translate(0, 0, 0); // 位於中心
    p.sphere(20); // 縮小的球體
    p.pop();

    // 空間層疊球體結構，帶有動態旋轉速度
    p.push();
    p.noFill();
    p.stroke(100, 150, 255, 120); // 冷藍色光暈線條
    p.strokeWeight(0.5);
    for (let i = 0; i < 6; i++) {
      p.rotateX(p.frameCount * rotationSpeed); // 使用動態旋轉速度
      p.rotateY(p.frameCount * rotationSpeed);
      p.sphere(40 + i * 15); // 層次球體結構
    }
    p.pop();

    // 背景星光
    p.push();
    p.noStroke();
    for (let i = 0; i < 80; i++) {
      let x = p.random(-200, 200);
      let y = p.random(-200, 200);
      let z = p.random(-400, -100); // 深遠位置
      p.fill(255, 255, 255, 100); // 微光
      p.ellipse(x, y, 2, 2); // 小型星光
    }
    p.pop();
  };
};

new p5(loneliness);
