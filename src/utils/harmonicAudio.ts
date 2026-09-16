// Web Audio synthesis for Kaitiaki IO frequency alignment (617 · 777 · 679)
class HarmonicAudioEngine {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private masterGain: GainNode | null = null;
  private isResonating: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle ambient triad drone at 617, 777, and 679 Hz
  public toggleDrone(volume: number = 0.08): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isResonating) {
      this.stopDrone();
      return false;
    }

    const now = this.ctx.currentTime;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(volume, now + 1.5);
    this.masterGain.connect(this.ctx.destination);

    // Frequencies: 617 Hz (Seed/Anchor), 777 Hz (Crown/Light), 679 Hz (Harmonizer)
    const frequencies = [617, 777, 679];

    this.oscillators = frequencies.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Add gentle detuned slow vibrato (0.1 Hz) for sacred space shimmer
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(osc.frequency);
      lfo.start(now);

      gain.gain.setValueAtTime(0.25 / frequencies.length, now);
      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      return osc;
    });

    this.isResonating = true;
    return true;
  }

  public stopDrone() {
    if (!this.ctx || !this.masterGain) {
      this.isResonating = false;
      return;
    }
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.oscillators = [];
      this.isResonating = false;
    }, 1050);
  }

  // Play the seed striking the liquid obsidian floor (resonant drop chime)
  public playSeedStrike(pitchMultiplier: number = 1.0) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch glide like a drop hitting water
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(440 * pitchMultiplier, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(617 * pitchMultiplier, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // Audio playback fails gracefully if un-interacted
    }
  }

  public get isActive() {
    return this.isResonating;
  }
}

export const harmonicAudio = new HarmonicAudioEngine();
