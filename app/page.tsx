"use client";

import { useMemo, useState } from "react";
import { ShotTimeline } from "./components/ShotTimeline";
import { shotSegments } from "./data/shots";

const tonalClassMap = {
  icy: "page--icy",
  transition: "page--transition",
  golden: "page--golden"
} as const;

const soundDesignCues = [
  {
    title: "Ethereal Opening",
    beat: "00:00 – 00:15",
    description:
      "Layer distant wind gusts with granular snow crunch Foley; introduce a single synth pad that swells with the drone glide."
  },
  {
    title: "Rhythmic Drive",
    beat: "00:15 – 00:40",
    description:
      "Add heartbeat-like low percussion synced to footfalls; sprinkle subtle metallic chimes as carabiners lock into place."
  },
  {
    title: "Breath & Resolve",
    beat: "00:40 – 00:54",
    description:
      "Isolate the climber’s breathing and laboured exhales; pan high-frequency wind to rear channels for enveloping chill."
  },
  {
    title: "Summit Bloom",
    beat: "00:54 – 01:00",
    description:
      "Let the score erupt into full orchestral warmth; wind softens and choir sustains the final golden note."
  }
];

const cameraPackage = [
  {
    label: "A-Cam",
    detail: "RED Komodo 6K with Zeiss Supreme Prime set (18mm, 29mm, 50mm, 85mm)"
  },
  {
    label: "Drone",
    detail: "Heavy-lift drone with Komodo + 35mm Supreme Prime on 3-axis gimbal"
  },
  {
    label: "Support",
    detail: "Steadicam, handheld gyro rig, 12ft lightweight crane for summit sweep"
  },
  {
    label: "Filtration",
    detail: "1/4 and 1/8 Black Pro-Mist, polariser for ridge contrast, ND stack for dawn flare control"
  }
];

function Page() {
  const [activeShotId, setActiveShotId] = useState<string>(shotSegments[0]?.id ?? "");

  const activeShot = useMemo(
    () => shotSegments.find((segment) => segment.id === activeShotId) ?? shotSegments[0],
    [activeShotId]
  );

  const activeIndex = useMemo(
    () => Math.max(0, shotSegments.findIndex((segment) => segment.id === activeShotId)),
    [activeShotId]
  );

  return (
    <main className={`page film-grain ${tonalClassMap[activeShot.colorTemperature]}`}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="hero__eyebrow">60-Second Summit Film Blueprint</p>
          <h1 id="hero-title">
            <span>Mount Everest Summit Push</span>
            <span className="hero__subtitle">Predawn resolve to golden-hour triumph</span>
          </h1>
          <p className="hero__lede">
            A cinematic arc capturing the climber’s solitary ascent in the blue hour, transitioning through grueling close-ups
            into a sun-drenched victory. Designed for the RED Komodo shooting in 6K with Zeiss Supreme Primes, the sequence
            layers Steadicam intimacy, drone scale, and a sweeping crane finale.
          </p>
          <ul className="hero__stats" aria-label="Key aesthetic pillars">
            <li>
              <strong>Palette</strong>
              <span>Desaturated blues ➜ neutral whites ➜ molten gold</span>
            </li>
            <li>
              <strong>Texture</strong>
              <span>Organic film grain, frost bloom, breath crystallisation</span>
            </li>
            <li>
              <strong>Motion</strong>
              <span>Slow zoom, glacial drone arcs, tactile handheld nuance</span>
            </li>
          </ul>
        </div>
        <div className="hero__visual" role="img" aria-label="Wide establishing frame of the climber against Everest">
          <div className="hero__gradient" />
          <div className="hero__overlay">
            <p className="hero__timecode">00:00 – 01:00</p>
            <p className="hero__caption">Wide establishing predawn frame. Climber rendered small against Everest&apos;s north face.</p>
          </div>
        </div>
      </section>

      <section className="timeline-panel" aria-labelledby="timeline-heading">
        <div className="timeline-panel__header">
          <h2 id="timeline-heading">Shot Architecture</h2>
          <p>
            Six movements chart the journey from solitary pre-dawn scale to summit euphoria. Drag through the timeline or
            tap a segment to explore lensing, motion, and sonic cues.
          </p>
        </div>

        <div className="timeline-panel__controls">
          <label htmlFor="shot-slider">Navigate timeline</label>
          <input
            id="shot-slider"
            type="range"
            min={0}
            max={shotSegments.length - 1}
            step={1}
            value={activeIndex}
            onChange={(event) => {
              const nextIndex = Number.parseInt(event.currentTarget.value, 10);
              setActiveShotId(shotSegments[nextIndex]?.id ?? shotSegments[0].id);
            }}
          />
          <div className="timeline-panel__timecode" aria-live="polite">
            {activeShot.timecode} · {activeShot.title}
          </div>
        </div>

        <ShotTimeline segments={shotSegments} activeId={activeShot.id} onSelect={setActiveShotId} />

        <article className="shot-detail" aria-live="polite">
          <header>
            <h3>{activeShot.title}</h3>
            <p className="shot-detail__meta">
              {activeShot.timecode} · {activeShot.focalLength}
            </p>
          </header>
          <p className="shot-detail__visuals">{activeShot.visuals}</p>
          <div className="shot-detail__grid">
            <div>
              <h4>Camera & Movement</h4>
              <p>{activeShot.cameraMovement}</p>
            </div>
            <div>
              <h4>Sound</h4>
              <p>{activeShot.audio}</p>
            </div>
            <div>
              <h4>Key Detail</h4>
              <p>{activeShot.keyDetail}</p>
            </div>
          </div>
          <ul className="shot-detail__notes">
            {activeShot.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="shot-grid" aria-labelledby="shot-grid-heading">
        <h2 id="shot-grid-heading">Full Sequence Breakdown</h2>
        <div className="shot-grid__layout">
          {shotSegments.map((segment) => {
            const isActive = segment.id === activeShot.id;
            return (
              <article
                key={segment.id}
                className={`shot-card${isActive ? " shot-card--active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <header>
                  <p className="shot-card__timecode">{segment.timecode}</p>
                  <h3>{segment.title}</h3>
                </header>
                <p className="shot-card__visuals">{segment.visuals}</p>
                <p className="shot-card__movement">
                  <strong>Movement</strong>
                  <span>{segment.cameraMovement}</span>
                </p>
                <p className="shot-card__audio">
                  <strong>Audio</strong>
                  <span>{segment.audio}</span>
                </p>
                <ul>
                  {segment.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sound-design" aria-labelledby="sound-heading">
        <div>
          <h2 id="sound-heading">Sound Design Spine</h2>
          <p>
            A four-beat arc keeps the audience embedded in the cold isolation that blooms into warmth at the summit. Foley layers
            foreground the tactile crunch of snow and metal, while the score shifts from minimal pads to orchestral release.
          </p>
        </div>
        <ul className="sound-design__list">
          {soundDesignCues.map((cue) => (
            <li key={cue.title}>
              <h3>{cue.title}</h3>
              <p className="sound-design__beat">{cue.beat}</p>
              <p>{cue.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="camera-kit" aria-labelledby="camera-heading">
        <div>
          <h2 id="camera-heading">Camera Package & Look</h2>
          <p>
            Lean into the RED Komodo’s dynamic range with gentle underexposure in the blue hour, lifting mid-tones in grade.
            Maintain consistent grain structure with FilmConvert or Dehancer, matching to a 35mm Kodak 5207 profile for a
            crisp-yet-organic feel.
          </p>
        </div>
        <ul>
          {cameraPackage.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="final-beat" aria-labelledby="final-heading">
        <div>
          <h2 id="final-heading">Final Moments Checklist</h2>
          <ul>
            <li>Capture a 120fps safety of the flag plant for alternative cadence in edit.</li>
            <li>Hold a three-count on the panoramic drone vista before cutting to black.</li>
            <li>Let the score resolve on a single, sustained chord that carries into the outro title.</li>
            <li>Apply a warming curve in the last 6 seconds to complete the cold-to-gold narrative arc.</li>
          </ul>
        </div>
        <p className="final-beat__cta">Fade out on wind and heartbeat settling, titles emerge over lingering film grain.</p>
      </section>
    </main>
  );
}

export default Page;
