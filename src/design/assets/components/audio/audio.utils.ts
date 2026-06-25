// design/assets/audio/audio.utils.ts
// Pure helpers — no DOM dependencies.

export function formatTime(sec: number): string {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function makeDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
  const n   = 256;
  const buf = new ArrayBuffer(n * 4);
  const curve = new Float32Array(buf);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

export interface AudioGraph {
  ctx:      AudioContext;
  source:   MediaElementAudioSourceNode;
  gainNode: GainNode;
  beepGain: GainNode;
  beepOsc:  OscillatorNode;
  lowPass:  BiquadFilterNode | null;
  distort:  WaveShaperNode   | null;
}

/** Build Web Audio graph from a native <audio> element. Caller must ensure
 *  this is invoked inside a user-gesture handler (AudioContext autoplay policy). */
export function buildAudioGraph(
  audio:      HTMLAudioElement,
  isIntercom: boolean,
): AudioGraph {
  const ctx    = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  const gain   = ctx.createGain();
  gain.gain.value = 1;

  let chain: AudioNode = source;
  let lowPass: BiquadFilterNode | null = null;
  let distort: WaveShaperNode   | null = null;

  if (isIntercom) {
    lowPass = ctx.createBiquadFilter();
    lowPass.type = "lowpass";
    lowPass.frequency.value = 3400; // telephone band

    distort = ctx.createWaveShaper();
    distort.curve      = makeDistortionCurve(30);
    distort.oversample = "2x";

    chain.connect(lowPass);
    lowPass.connect(distort);
    chain = distort;
  }

  // Beep oscillator — parked at gain 0; enabled during redacted segments.
  const beepGain = ctx.createGain();
  beepGain.gain.value = 0;

  const beepOsc = ctx.createOscillator();
  beepOsc.type = "sine";
  beepOsc.frequency.value = 1000;
  beepOsc.connect(beepGain);
  beepGain.connect(ctx.destination);
  beepOsc.start();

  chain.connect(gain);
  gain.connect(ctx.destination);

  return { ctx, source, gainNode: gain, beepGain, beepOsc, lowPass, distort };
}
