/**
 * High-fidelity procedural audio generator for realistic physical book sound effects:
 * - Crisp paper turn / page flip swoosh
 * - Soft bookmark ribbon rustle
 * - Gentle ambient study atmosphere (rain / warm fireplace)
 * 100% self-contained using Web Audio API (zero external assets or network dependencies).
 */

class BookAudioController {
  private ctx: AudioContext | null = null;
  private ambientSource: AudioNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Generates a realistic paper turn / page flip sound
   */
  public playPageTurn(isForward: boolean = true) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 0.28;

      // 1. White noise buffer for paper texture rustle
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // 2. Bandpass filter for papery frequency response
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(isForward ? 1200 : 1000, now);
      bandpass.frequency.exponentialRampToValueAtTime(isForward ? 450 : 650, now + duration);
      bandpass.Q.setValueAtTime(2.2, now);

      // 3. Lowpass filter to soften harsh highs
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(2600, now);
      lowpass.frequency.exponentialRampToValueAtTime(1400, now + duration);

      // 4. Gain envelope with quick attack and natural decay
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Connect nodes
      noise.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Gracefully silent if audio context fails
    }
  }

  /**
   * Bookmark placement chime
   */
  /**
   * Boom impact sound for portal activation & time loop pulse
   */
  public playBoomImpact() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Sub-bass oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.6);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    } catch {}
  }

  /**
   * Sun Wheel pulse chime
   */
  public playSunWheelPulse() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch {}
  }

  public playBookmarkChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Silent fallback
    }
  }

  /**
   * Procedural cozy study rain / fireplace ambient audio
   */
  public startAmbient(type: 'rain' | 'fireplace' = 'rain') {
    if (this.isAmbientPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const sampleRate = this.ctx.sampleRate;
      const bufferLength = sampleRate * 3; // 3 second loop
      const buffer = this.ctx.createBuffer(1, bufferLength, sampleRate);
      const output = buffer.getChannelData(0);

      // Pink noise synthesis for ambient background
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferLength; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.value = type === 'rain' ? 850 : 420;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 1.5);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start();
      this.ambientSource = source;
      this.ambientGain = gain;
      this.isAmbientPlaying = true;
    } catch {
      // Silent fallback
    }
  }

  public stopAmbient() {
    if (!this.isAmbientPlaying) return;
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      }
      setTimeout(() => {
        if (this.ambientSource) {
          (this.ambientSource as AudioBufferSourceNode).stop();
          this.ambientSource.disconnect();
          this.ambientSource = null;
        }
        this.ambientGain = null;
        this.isAmbientPlaying = false;
      }, 900);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public toggleAmbient(enable: boolean) {
    if (enable) {
      this.startAmbient('rain');
    } else {
      this.stopAmbient();
    }
  }
}

export const bookAudio = new BookAudioController();
