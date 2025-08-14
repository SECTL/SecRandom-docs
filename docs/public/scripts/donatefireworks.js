export function initFireworks(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random()-0.5)*6;
      this.vy = (Math.random()-1.5)*6;
      this.alpha = 1;
      this.color = color;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.02;
    }
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x,this.y,3,0,Math.PI*2);
      ctx.fill();
    }
  }

  let particles = [];
  function createFirework() {
    const x = Math.random()*canvas.width;
    const y = Math.random()*canvas.height/2;
    const colors = ['#ff4d4d','#ffb84d','#fff066','#4dff4d','#4dffff','#ff4dff'];
    for(let i=0;i<30;i++){
      particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)]));
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,index)=>{
      p.update();
      p.draw();
      if(p.alpha<=0) particles.splice(index,1);
    });
    requestAnimationFrame(animate);
  }

  setInterval(createFirework, 800);
  animate();
}
