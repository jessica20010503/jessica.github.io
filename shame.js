let shame = (p) => {
    let meteors = [];
    let sparks = [];
    let fragments = [];
    let distanceValue = 100; // 初始超音波數值
    let serial; // Web Serial 變數

    p.setup = () => {
        p.createCanvas(400, 400).parent("shame");
        document.getElementById("connectButton").addEventListener("click", connectSerial);
    };

    p.draw = () => {
        p.background(0);

        // 更新火花
        for (let i = sparks.length - 1; i >= 0; i--) {
            sparks[i].update();
            sparks[i].display();
            if (sparks[i].alpha <= 0) sparks.splice(i, 1);
        }

        // 更新隕石
        for (let i = meteors.length - 1; i >= 0; i--) {
            meteors[i].update();
            meteors[i].display();
            if (meteors[i].alpha <= 0) meteors.splice(i, 1);
        }

        // 更新碎片
        for (let i = fragments.length - 1; i >= 0; i--) {
            fragments[i].update();
            fragments[i].display();
            if (fragments[i].alpha <= 0) fragments.splice(i, 1);
        }

        // 隨機生成新的隕石
        if (p.frameCount % 30 === 0) {
            meteors.push(new Meteor(p.random(p.width), -20, p.random(30, 60), p.random(2, 6)));
        }
    };

    class Meteor {
        constructor(x, y, d, speed) {
            this.x = x;
            this.y = y;
            this.d = d;
            this.speed = speed;
            this.gravity = 0.15;
            this.alpha = 255;
            this.bounced = false;
            this.timeToSplit = p.random(20, 50);
        }

        update() {
            this.speed += this.gravity;
            this.y += this.speed;

            // 產生紅色火花
            for (let i = 0; i < 1; i++) {
                sparks.push(new Spark(this.x, this.y + this.d / 2));
            }

            this.timeToSplit--;
            if (this.timeToSplit <= 0) {
                this.splitPiece();
                this.timeToSplit = p.random(10, 30);
            }

            if (this.y > p.height - this.d / 2 && !this.bounced) {
                this.speed = -this.speed * 0.5;
                this.y = p.height - this.d / 2;
                this.bounced = true;
            } else if (this.bounced) {
                this.split();
            }

            this.alpha -= 1.5;
        }

        display() {
            p.noStroke();
            let glow = p.map(this.alpha, 255, 0, 50, 0);

            // **當 distanceValue > 50，保持白色，<= 50 則變藍**
            let stoneColor = distanceValue > 50 
                ? p.color(255, 255, 255) 
                : p.lerpColor(p.color(255, 255, 255), p.color(0, 150, 255), p.map(distanceValue, 5, 50, 1, 0, true));

            let glowColor = p.color(0, 150, 255, glow * (distanceValue <= 50 ? 1 : 0));

            p.fill(glowColor);
            drawHexagon(this.x, this.y, this.d + 5);

            p.fill(stoneColor);
            drawHexagon(this.x, this.y, this.d);
        }

        splitPiece() {
            if (this.d > 10) {
                let fragmentSize = this.d * 0.3;
                fragments.push(new Fragment(this.x + p.random(-10, 10), this.y, fragmentSize));
                this.d *= 0.85;
            }
        }

        split() {
            for (let i = 0; i < 6; i++) {
                sparks.push(new Spark(this.x, this.y));
            }
            this.alpha = 0;
        }
    }

    class Fragment {
        constructor(x, y, d) {
            this.x = x;
            this.y = y;
            this.d = d;
            this.vx = p.random(-2, 2);
            this.vy = p.random(1, 3);
            this.alpha = 255;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= 3;
        }

        display() {
            p.noStroke();
            let fragmentColor = distanceValue > 50 
                ? p.color(255, 255, 255) 
                : p.lerpColor(p.color(255, 255, 255), p.color(0, 150, 255), p.map(distanceValue, 5, 50, 1, 0, true));

            p.fill(fragmentColor);
            drawHexagon(this.x, this.y, this.d);
        }
    }

    class Spark {
        constructor(x, y) {
            this.x = x + p.random(-5, 5);
            this.y = y + p.random(0, 5);
            this.vx = p.random(-2, 2);
            this.vy = p.random(-3, -1);
            this.alpha = 255;
            this.size = p.random(2, 5);
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= 5;
        }

        display() {
            p.noStroke();
            let fireGlow = p.color(255, p.random(50, 100), 0, this.alpha);
            p.fill(fireGlow);
            drawHexagon(this.x, this.y, this.size);
        }
    }

    function drawHexagon(x, y, radius) {
        p.beginShape();
        for (let i = 0; i < 6; i++) {
            let angle = p.PI / 3 * i;
            let vx = x + radius * p.cos(angle);
            let vy = y + radius * p.sin(angle);
            p.vertex(vx, vy);
        }
        p.endShape(p.CLOSE);
    }

    // Web Serial 連接
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

new p5(shame);
