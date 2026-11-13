// Entrada: teclado + gamepad opcional, unificados en "acciones".
(function () {
  const CV = window.CV;
  const MAP = {
    ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
    Space: 'jump', KeyZ: 'jump', KeyK: 'jump', KeyX: 'attack', KeyJ: 'attack',
    KeyC: 'roll', ShiftLeft: 'roll', ShiftRight: 'roll', KeyL: 'roll',
    KeyQ: 'swapPrev', KeyE: 'swap', Tab: 'swap', KeyV: 'swap',
    Enter: 'confirm', Escape: 'pause', KeyP: 'pause', KeyM: 'mute', KeyI: 'inv', Backspace: 'back'
  };
  // Gamepad estándar: A salto, X ataque, B rodar, Y/RB cambiar arma, Start pausa.
  const PAD = { 0: 'jump', 2: 'attack', 1: 'roll', 3: 'swap', 5: 'swap', 4: 'swapPrev', 9: 'pause', 12: 'up', 13: 'down', 14: 'left', 15: 'right' };
  const I = CV.input = {
    held: {}, tapped: {}, now: {}, prev: {}, sim: {},
    update() {
      this.prev = this.now; const n = {};
      for (const k in this.held) if (this.held[k]) n[k] = true;
      for (const k in this.tapped) n[k] = true;
      this.tapped = {};
      for (const k in this.sim) if (this.sim[k]) n[k] = true;
      try {
        const pads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (const p of pads) {
          if (!p) continue;
          for (const b in PAD) if (p.buttons[b] && p.buttons[b].pressed) n[PAD[b]] = true;
          if (p.axes[0] < -.4) n.left = true; if (p.axes[0] > .4) n.right = true;
          if (p.axes[1] < -.6) n.up = true; if (p.axes[1] > .6) n.down = true;
        }
      } catch (e) { }
      if (n.jump || n.confirm) n.ok = true;
      this.now = n;
    },
    down(a) { return !!this.now[a]; },
    pressed() { for (let i = 0; i < arguments.length; i++) { const a = arguments[i]; if (this.now[a] && !this.prev[a]) return true; } return false; }
  };
  window.addEventListener('keydown', e => {
    const a = MAP[e.code]; CV.audio.init();
    if (a) { I.held[a] = true; if (!e.repeat) I.tapped[a] = true; e.preventDefault(); }
  });
  window.addEventListener('keyup', e => { const a = MAP[e.code]; if (a) { I.held[a] = false; e.preventDefault(); } });
  window.addEventListener('blur', () => { I.held = {}; });
  window.addEventListener('pointerdown', () => CV.audio.init());
})();
