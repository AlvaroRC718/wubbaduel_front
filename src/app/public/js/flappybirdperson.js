// Velocidad de movimiento del fondo 
const move_speed = 5;

// Valor de gravedad
const gravity = 0.5;

// Referencias DOM
const bird = document.querySelector('.bird');
const backgroundDiv = document.querySelector('.background');
const score_val = document.querySelector('.score_val');
const message = document.querySelector('.message');
const score_title = document.querySelector('.score_title');
const claimButton = document.getElementById('claim-tokens');
const newTokens = document.getElementById('tokensCount');

// Estado inicial del juego
let game_state = 'Start';
let bird_props = bird.getBoundingClientRect();


// Evitar scroll al pulsar espacio
window.addEventListener('keydown', function (e) {
  if (e.key === ' ') {
    e.preventDefault();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && game_state !== 'Play') {
    // Eliminar tuberías dentro del backgroundDiv
    backgroundDiv.querySelectorAll('.pipe_sprite').forEach(el => el.remove());

    // Eliminar nubes
    document.querySelectorAll('.cloud').forEach(c => c.remove());

    // Resetear posición y estado del pájaro
    bird.style.top = '40vh';
    bird.src = 'resources/img/birdpersonfly.png';
    game_state = 'Play';

    score_val.innerHTML = '0';
    score_title.innerHTML = 'Score: ';
    message.innerHTML = '';

    bird_props = bird.getBoundingClientRect();

    play();
  }
});

function endGame() {
  game_state = 'End';
  message.innerHTML = 'Press Enter To Restart';

  // Activar botón para reclamar tokens
  if (parseInt(score_val.innerText, 10) > 0) {
    claimButton.disabled = false;
  }
}

function play() {
  claimButton.disabled = true;
  let bird_dy = 0;

  // Mejor contar píxeles para separar tuberías
  let pipe_x = backgroundDiv.clientWidth;

  const pipe_gap = 190; // espacio entre tuberías en píxeles

  const bgHeight = backgroundDiv.clientHeight;
  const bgWidth = backgroundDiv.clientWidth;

  // Mover tuberías y comprobar colisiones
  function move() {
    if (game_state !== 'Play') return;

    let pipes = backgroundDiv.querySelectorAll('.pipe_sprite');
    pipes.forEach(pipe => {
      let pipe_props = pipe.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();

      // Mover tubería hacia la izquierda
      let newLeft = pipe.offsetLeft - move_speed;
      pipe.style.left = newLeft + 'px';

      // Si la tubería salió del contenedor, eliminar
      if (newLeft + pipe.offsetWidth < 0) {
        pipe.remove();
      } else {
        // Colisión con pájaro
        if (
          bird_props.left < pipe_props.left + pipe_props.width &&
          bird_props.left + bird_props.width > pipe_props.left &&
          bird_props.top < pipe_props.top + pipe_props.height &&
          bird_props.top + bird_props.height > pipe_props.top
        ) {
          endGame();
          return;
        }

        // Puntuación: cuando pasa la tubería inferior (la que aumenta la puntuación)
        if (
          pipe_props.right < bird_props.left &&
          pipe.getAttribute('increase_score') === '1'
        ) {
          score_val.innerHTML = +score_val.innerHTML + 1;
          pipe.setAttribute('increase_score', '0');
        }
      }
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  // Aplicar gravedad y limitar vuelo del pájaro dentro de .background
  function apply_gravity() {
    if (game_state !== 'Play') return;

    bird_dy += gravity;

    // Posición actual relativa al contenedor
    let birdTop = bird.offsetTop;
    let newTop = birdTop + bird_dy;

    // Limitar para que no salga del contenedor arriba o abajo
    if (newTop < 0) {
      endGame();
      return;
    }
    if (newTop + bird.offsetHeight > bgHeight) {
      endGame();
      return;
    }

    bird.style.top = newTop + 'px';

    bird_props = bird.getBoundingClientRect();

    // Cambiar sprite según dirección
    if (bird_dy > 0) {
      bird.src = 'resources/img/birdperson-fall.png';
    }

    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  // Saltar con tecla
  function keyJump(e) {
    if (game_state !== 'Play') return;
    if (e.key === 'ArrowUp' || e.key === ' ') {
      bird_dy = -7.6;
      bird.src = 'resources/img/birdpersonfly.png';
    }
  }
  document.addEventListener('keydown', keyJump);

  // Crear tuberías separadas en X
  function create_pipe() {
    if (game_state !== 'Play') return;

    pipe_x -= move_speed;

    if (pipe_x < bgWidth - 400) { // cada 450px crea nuevo par tuberías
      pipe_x = bgWidth;

      // Generar altura para tubería inferior (mínimo pipe_gap)
      let pipeBottomHeight = Math.floor(Math.random() * (bgHeight - pipe_gap - 60)) + 60;
      let pipeTopHeight = bgHeight - pipeBottomHeight - pipe_gap;

      // Tubo superior invertido
      let pipe_top = document.createElement('div');
      pipe_top.className = 'pipe_sprite pipe_top';
      pipe_top.style.height = pipeTopHeight + 'px';
      pipe_top.style.top = '0px';
      pipe_top.style.left = bgWidth + 'px';
      pipe_top.setAttribute('increase_score', '0');
      backgroundDiv.appendChild(pipe_top);

      // Tubo inferior
      let pipe_bottom = document.createElement('div');
      pipe_bottom.className = 'pipe_sprite';
      pipe_bottom.style.height = pipeBottomHeight + 'px';
      pipe_bottom.style.bottom = '0px';
      pipe_bottom.style.left = bgWidth + 'px';
      pipe_bottom.setAttribute('increase_score', '1');
      backgroundDiv.appendChild(pipe_bottom);
    }

    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);

  // Crear nubes periódicamente
  function createCloudsLoop() {
    if (game_state !== 'Play') return;
    createRandomCloud();
    setTimeout(createCloudsLoop, 5000); // cada 5 segundos una nube nueva
  }
  createCloudsLoop();
}

function createRandomCloud() {
  let cloud = document.createElement('img');

  cloud.src = 'resources/img/nube.png';
  cloud.className = 'cloud';

  const maxHeight = backgroundDiv.clientHeight - 80;
  const randomTopPx = Math.floor(Math.random() * maxHeight);
  cloud.style.top = randomTopPx + 'px';
  cloud.style.left = backgroundDiv.clientWidth + 'px';

  document.querySelector('.clouds-box').appendChild(cloud);

  setTimeout(() => {
    cloud.remove();
  }, 40000);
}

// Evento del botón para reclamar tokens
claimButton.addEventListener("click", async function () {
  // Desactivar botón para reclamar tokens
  claimButton.disabled = true;
  try {
    const encrypted = localStorage.getItem('user');
    const bytes = CryptoJS.AES.decrypt(encrypted, 'wubbaduel');
    let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let userId = user.id;

    const tokens = parseInt(score_val.innerText, 10);

    const response = await fetch("http://localhost:8080/api/user/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, tokens: tokens }),
    });

    const data = await response.json();

    if (response.ok) {
      user.tokens = data.tokens;
      const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), 'wubbaduel').toString();
      localStorage.setItem('user', encryptedUser);

      alert(`¡Has ganado ${tokens} Ticket/s de Blitz & Chits!`);
      newTokens.innerHTML = user.tokens;
    } else {
      alert(data.message || "Error al reclamar.");
    }
  } catch (error) {
    console.error("Error al procesar:", error);
    alert("Error de conexión con el servidor.");
  }
});
