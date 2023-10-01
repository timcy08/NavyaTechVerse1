const gameContainer = document.querySelector('.game-container');
const scoreElement = document.getElementById('score'); 
const spawnTime = 1500; 
const monsterCount = 8; 
let score = 0; 

function getRandomPosition() {
    const maxX = gameContainer.clientWidth - 100; 
    const maxY = gameContainer.clientHeight - 100;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    return { x: randomX, y: randomY };
}

function getRandomMonsterImage() {
    const randomMonsterNumber = Math.floor(Math.random() * 6) + 1; 
    return `img/${randomMonsterNumber}.png`;
}

function spawnMonsters() {
    for (let i = 0; i < monsterCount; i++) {
        const monster = document.createElement('div'); 
        const monsterImage = getRandomMonsterImage();
        const position = getRandomPosition();

        monster.className = 'monster'; 
        monster.style.left = `${position.x}px`;
        monster.style.top = `${position.y}px`;
        monster.style.background = `url(${monsterImage}) center/cover no-repeat`;

        monster.onclick = () => {
            const audio = new Audio("https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-epic-stock-media/esm_8bit_explosion_medium_bomb_boom_blast_cannon_retro_old_school_classic_cartoon.mp3");
            audio.volume = 0.5;
            audio.play();
            monster.style.background = `url('img/explosion.gif') center/cover no-repeat`; 
            monster.style.pointerEvents = 'none';

            score++;
            scoreElement.textContent = score; 

            setTimeout(() => {
                monster.remove(); 
            }, 1000);
        };

        gameContainer.appendChild(monster); 
        setTimeout(() => {
            monster.remove();
        }, spawnTime - (spawnTime / 10));
    }
}

function start() {
    document.getElementById('start').remove();
    spawnMonsters()
    setInterval(spawnMonsters, spawnTime);
    document.getElementById('bg-music').play();
    // document.getElementById('bg-music').play();
}