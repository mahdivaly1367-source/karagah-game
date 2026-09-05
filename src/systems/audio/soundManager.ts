// Procedural Web Audio synthesizer for historical atmospheric Persian adventure

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private windOsc: AudioNode | null = null;
  private isAmbiencePlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.8;

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.8;

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.4;

      this.sfxGain.connect(this.masterGain);
      this.musicGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolumes(master: number, sfx: number, music: number) {
    if (!this.ctx) return;
    if (this.masterGain) this.masterGain.gain.setValueAtTime(master / 100, this.ctx.currentTime);
    if (this.sfxGain) this.sfxGain.gain.setValueAtTime(sfx / 100, this.ctx.currentTime);
    if (this.musicGain) this.musicGain.gain.setValueAtTime(music / 100, this.ctx.currentTime);
  }

  // Play subtle typewriter sound for Persian dialogue
  public playTypewriter() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.sfxGain);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play button click / UI tap
  public playClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.06);
      
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(this.sfxGain);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore
    }
  }

  // Play item pickup sound
  public playItemPickup() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        
        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
        
        osc.connect(gain);
        gain.connect(this.sfxGain!);
        
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  // Play mystery clue discovery sting (Oriental harmonic minor modal chime)
  public playEvidenceDiscovered() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      // D Shur / Homayoun modal motif
      const notes = [293.66, 311.13, 369.99, 440.0, 587.33];
      
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        
        gain.gain.setValueAtTime(0.18, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.7);
        
        osc.connect(gain);
        gain.connect(this.sfxGain!);
        
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.7);
      });
    } catch {
      // Ignore
    }
  }

  // Play puzzle solved sting
  public playPuzzleSolved() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const chords = [
        [370.0, 440.0, 554.37],
        [440.0, 554.37, 659.25],
        [587.33, 739.99, 880.0]
      ];
      
      chords.forEach((chord, step) => {
        const stepTime = now + step * 0.22;
        chord.forEach((freq) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, stepTime);
          
          gain.gain.setValueAtTime(0.12, stepTime);
          gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.8);
          
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          
          osc.start(stepTime);
          osc.stop(stepTime + 0.8);
        });
      });
    } catch {
      // Ignore
    }
  }

  // Play contradiction exposed sting (tense minor dissonant-to-consonant chord)
  public playContradictionExposed() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      
      // Low strike
      const lowOsc = this.ctx.createOscillator();
      const lowGain = this.ctx.createGain();
      lowOsc.type = 'sawtooth';
      lowOsc.frequency.setValueAtTime(130, now);
      lowOsc.frequency.exponentialRampToValueAtTime(65, now + 0.4);
      lowGain.gain.setValueAtTime(0.2, now);
      lowGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      lowOsc.connect(lowGain);
      lowGain.connect(this.sfxGain);
      lowOsc.start(now);
      lowOsc.stop(now + 0.5);

      // Mystery clash resolving to truth
      [440, 466.16, 659.25].forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.08);
        gain.gain.setValueAtTime(0.15, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(now + 0.08);
        osc.stop(now + 0.8);
      });
    } catch {
      // Ignore
    }
  }

  // Play door open / creak
  public playDoorCreak() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.25);
      osc.frequency.linearRampToValueAtTime(90, now + 0.45);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      osc.connect(gain);
      gain.connect(this.sfxGain);
      
      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Ignore
    }
  }

  // Play footstep
  public playFootstep() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90 + Math.random() * 20, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      
      osc.connect(gain);
      gain.connect(this.sfxGain);
      
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Ignore
    }
  }

  // Play Crow Caw
  public playCrow() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      
      [0, 0.25].forEach((offset) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(520, now + offset);
        osc.frequency.exponentialRampToValueAtTime(340, now + offset + 0.2);
        
        gain.gain.setValueAtTime(0.08, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.22);
        
        osc.connect(gain);
        gain.connect(this.sfxGain!);
        
        osc.start(now + offset);
        osc.stop(now + offset + 0.22);
      });
    } catch {
      // Ignore
    }
  }

  // Act 2 Audio Puzzle: Authentic resonant brass caravan bell
  public playAuthenticBell() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const harmonics = [329.63, 659.25, 987.77, 1318.5]; // E major harmonic series
      
      harmonics.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        const amp = 0.15 / (idx + 1);
        gain.gain.setValueAtTime(amp, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
        
        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(now);
        osc.stop(now + 3.8);
      });
    } catch {
      // Ignore
    }
  }

  // Act 2 Audio Puzzle: Fake rattling iron clapper bell
  public playFakeClapper() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // Rattling tin strike
      [0, 0.06, 0.13].forEach((offset) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(210 + Math.random() * 40, now + offset);
        osc.frequency.exponentialRampToValueAtTime(110, now + offset + 0.15);
        
        gain.gain.setValueAtTime(0.12, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.16);
        
        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(now + offset);
        osc.stop(now + offset + 0.16);
      });
    } catch {
      // Ignore
    }
  }

  // Start background ambient wind & distant caravan bell
  public startAmbientWind() {
    if (this.isAmbiencePlaying) return;
    try {
      this.initContext();
      if (!this.ctx || !this.musicGain) return;
      this.isAmbiencePlaying = true;

      // Periodic distant bell (every 14 seconds)
      const playDistantBell = () => {
        if (!this.isAmbiencePlaying || !this.ctx || !this.musicGain) return;
        try {
          const bellOsc = this.ctx.createOscillator();
          const bellGain = this.ctx.createGain();
          bellOsc.type = 'sine';
          bellOsc.frequency.setValueAtTime(880, this.ctx.currentTime);
          
          bellGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
          bellGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.5);
          
          bellOsc.connect(bellGain);
          bellGain.connect(this.musicGain);
          bellOsc.start();
          bellOsc.stop(this.ctx.currentTime + 3.5);
        } catch {
          // Ignore
        }
      };

      setInterval(playDistantBell, 14000);
      playDistantBell();
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundManager();
