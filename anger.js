let anger = (p) => {
    p.setup = () => {
      p.createCanvas(400, 380).parent("anger");
      p.angleMode(p.DEGREES);
      p.noFill();
    };
  
    p.draw = () => {
      p.background(20, 0, 0); // 暗色背景增強情緒張力
      p.translate(p.width / 2, p.height / 2); // 將原點移動到畫布中心
  
      // 爆炸感旋轉矩形
      for (let i = 0; i < 15; i++) {
        let offset = i * 15;
        p.stroke(255, p.random(50, 100) + i * 10, 50); // 隨機紅色調
        p.strokeWeight(1); // 細線條突顯鋒利感
        p.push();
        p.rotate(p.frameCount * (i + 1) * 0.8); // 不同層次的旋轉速度
        p.rectMode(p.CENTER);
        p.rect(offset, offset, 80 + i * 5, 80 - i * 5); // 建立層疊動態
        p.pop();
      }
  
      // 隨機閃電效果，象徵怒火失控
      if (p.random() > 0.85) {
        p.stroke(255, 255, 0, 200); // 明亮黃色閃電
        p.strokeWeight(2 + p.random(-0.5, 0.5)); // 更細緻的線條
        let startX = p.random(-150, 150);
        let startY = p.random(-150, 150);
        let endX = startX + p.random(-50, 50);
        let endY = startY + p.random(-50, 50);
        p.line(startX, startY, endX, endY); // 隨機生成的閃電
      }
    };
  };
  
  new p5(anger);
  