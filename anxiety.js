let anxiety = (p) => {
  let path = []; // 存放纏繞的線條點
  let noiseOffset = 0;
  let angle = 0;
  let speed = 0.2; // **旋轉速度**
  let rotationAngleX = 0; // **X 軸翻轉角度**
  let rotationAngleY = 0; // **Y 軸翻轉角度**
  let rotationSpeedX = 0.02; // **X 軸翻轉速度**
  let rotationSpeedY = 0.03; // **Y 軸翻轉速度**

  p.setup = () => {
    p.createCanvas(400, 400, p.WEBGL).parent("anxiety"); // **使用 WEBGL 來支援 3D 翻轉**
  };

  p.draw = () => {
    p.background(0); // 黑色背景
    p.stroke(255, 200); // 白色線條
    p.noFill();

    // **自主翻轉**
    rotationAngleX += rotationSpeedX;
    rotationAngleY += rotationSpeedY;

    // 計算新的軌跡點
    let radius = 50 + p.noise(noiseOffset) * 100; // **範圍變動**
    let x = (radius + p.random(-5, 5)) * p.cos(angle);
    let y = (radius + p.random(-5, 5)) * p.sin(angle);
    let z = p.sin(angle * 2) * 50; // **Z 軸深度變化**
    
    // 更新角度與噪音偏移
    angle += speed;
    noiseOffset += 0.05; // **加快雜亂變化速度**

    // 存入路徑
    path.push({ x, y, z });

    // 限制路徑長度，避免線條過多
    if (path.length > 800) { // **延長軌跡，讓線條更持續**
      path.shift();
    }

    // **開始 3D 翻轉並繪製線條**
    p.push();
    p.rotateX(rotationAngleX); // **X 軸翻轉**
    p.rotateY(rotationAngleY); // **Y 軸翻轉**
    
    // 繪製連續纏繞的線條
    p.beginShape();
    for (let i = 0; i < path.length; i++) {
      let pt = path[i];
      p.vertex(pt.x, pt.y, pt.z);
    }
    p.endShape();
    
    p.pop();
  };
};

new p5(anxiety);
