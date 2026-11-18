const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
// 기존 코드: const numberOfParticles = 100;
// 변경 코드: 화면 크기가 768px 이하(모바일)이면 파티클 수를 40개로, PC면 100개로 설정
const numberOfParticles = window.innerWidth < 768 ? 40 : 100;

// 마우스 위치 추적
let mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// script.js 내 파티클 색상과 선 색상을 보라색 계열로 업데이트
class Particle {
    // ... 기존 코드 동일
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#af52de'; /* 파티클 점을 보라색으로 변경 */
        ctx.fill();
    }
    // ... 이하 생략
}

function connect() {
    // ... 기존 코드 동일
    if (distance < (canvas.width/7) * (canvas.height/7)) {
        let opacityValue = 1 - (distance / 20000);
        /* 연결 선(네트워크)을 투명도가 적용된 보라색으로 변경 */
        ctx.strokeStyle = 'rgba(175, 82, 222,' + opacityValue * 0.5 + ')'; 
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
    }
}
// 파티클 배열 초기화
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = '#00d2ff';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// 노드 연결 선 그리기
function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            // 거리가 가까운 노드끼리 선 연결
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                let opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(0, 210, 255,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();