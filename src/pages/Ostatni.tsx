import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import numbersAudio from '../assets/numbers.mp3';

const Ostatni = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'white',
      progressColor: 'red',
      url: numbersAudio,
      normalize: false,
      height: 128,
      sampleRate: 22050,
      minPxPerSec: 400,
      fillParent: false,
      renderFunction: (peaks, ctx) => {
        console.log('peaks.length:', peaks.length, peaks.map((p, i) => `[${i}] ${p?.constructor?.name} len=${p?.length}`));
        const data = peaks[0];
        if (!data || data.length === 0) return;
        const height = ctx.canvas.height;
        const width = ctx.canvas.width;
        const halfHeight = height / 2;
        const step = data.length / width;
        ctx.fillStyle = 'white';
        for (let i = 0; i < width; i++) {
          const start = Math.floor(i * step);
          const end = Math.min(Math.floor((i + 1) * step), data.length - 1);
          let min = 0;
          let max = 0;
          for (let j = start; j <= end; j++) {
            const v = data[j];
            if (v < min) min = v;
            if (v > max) max = v;
          }
          const yTop = halfHeight - max * halfHeight;
          const yBottom = halfHeight - min * halfHeight;
          ctx.fillRect(i, yTop, 1, Math.max(1, yBottom - yTop));
        }
      },
    });

    return () => wavesurferRef.current?.destroy();
  }, []);

  return (
    <div className="ostatni">
      <div className="ostatni__waveform">
        <div ref={waveformRef} />
      </div>
      <div className="ostatni__controls">
        <button className="ostatni__btn" onClick={() => wavesurferRef.current?.playPause()}>
          Play / Pause
        </button>
      </div>
    </div>
  );
};

export default Ostatni;
