let fear = (p) => {
    p.setup = () => {
      p.createCanvas(400, 380).parent("fear");
      p.angleMode(p.DEGREES);
    };
  
    p.draw = () => {
      // 創造閃爍的背景，紅黑交替
      if (p.frameCount % 10 < 5) {
        p.background(200, 0, 0); // 血紅色
      } else {
        p.background(0); // 黑色
      }
  
      p.translate(p.width / 2, p.height / 2); // 將原點移動到畫布中心
  
      // 隨機旋轉並增加緊張感
      let angle = p.frameCount * 5 + p.random(-10, 10);
      p.rotate(angle);
  
      // 閃爍的黑色矩形
      p.fill(0);
      p.noStroke();
      p.rectMode(p.CENTER);
      let size = p.random(80, 120); // 隨機變化的大小
      p.rect(0, 0, size, size);
    };
  };
  
  new p5(fear);
  