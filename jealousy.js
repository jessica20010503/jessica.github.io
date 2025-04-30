let jealousy = (p) => {
    let cols, rows;
    let scl = 20; // 網格大小
    let w = 400;
    let h = 400;
    let flying = 0; // 用來製造波浪的動畫效果
    let terrain = [];
  
    let cubeX, cubeY, cubeZ;
  
    p.setup = () => {
      p.createCanvas(400, 400, p.WEBGL).parent("jealousy"); // **使用 3D 模式**
      cols = w / scl;
      rows = h / scl;
  
      // 初始化地形數據
      for (let x = 0; x < cols; x++) {
        terrain[x] = [];
        for (let y = 0; y < rows; y++) {
          terrain[x][y] = 0; // 初始化為 0
        }
      }
    };
  
    p.draw = () => {
      p.background(10, 10, 50); // 深藍色背景
      p.rotateX(p.PI / 3); // 讓海面有視角感
      p.translate(-w / 2, -h / 4); // 移動視角到適當位置
  
      flying -= 0.05; // 讓海浪不停波動
  
      let yOffset = flying;
      for (let y = 0; y < rows; y++) {
        let xOffset = 0;
        for (let x = 0; x < cols; x++) {
          terrain[x][y] = p.map(p.noise(xOffset, yOffset), 0, 1, -10, 10);
          xOffset += 0.2;
        }
        yOffset += 0.2;
      }
  
      // **繪製波動的海面**
      p.stroke(0, 100, 200);
      p.strokeWeight(1);
      p.noFill();
      for (let y = 0; y < rows - 1; y++) {
        p.beginShape(p.TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
          p.vertex(x * scl, y * scl, terrain[x][y] * 5);
          p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1] * 5);
        }
        p.endShape();
      }
  
      // **計算紅色立方體的晃動位置**
      let cubeIndexX = p.floor(cols / 2);
      let cubeIndexY = p.floor(rows / 4);
      cubeX = cubeIndexX * scl;
      cubeY = cubeIndexY * scl;
      cubeZ = terrain[cubeIndexX][cubeIndexY] * 5 + 10; // 讓立方體浮動
  
      // **繪製漂浮的紅色立方體**
      p.push();
      p.translate(cubeX, cubeY, cubeZ);
      p.fill(200, 0, 0); // 紅色立方體
      p.stroke(255, 50, 50);
      p.box(20); // 立方體大小
      p.pop();
    };
  };
  
  new p5(jealousy);
  