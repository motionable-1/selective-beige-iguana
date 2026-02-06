import { Artifact, useCurrentFrame } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "../library/components/layout/Transition";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";

import { TitleScene } from "./scenes/TitleScene";
import { ScenarioScene } from "./scenes/ScenarioScene";
import { QuizScene } from "./scenes/QuizScene";
import { GuidelinesScene } from "./scenes/GuidelinesScene";
import { ClosingScene } from "./scenes/ClosingScene";

// This re-runs on every HMR update of this file
const hmrKey = Date.now();

/*
 * Scene durations (in frames at 30fps):
 * Title:      120 frames (4s)
 * Scenario:   210 frames (7s)
 * Quiz:       240 frames (8s)
 * Guidelines: 210 frames (7s)
 * Closing:    180 frames (6s)
 *
 * Transitions: 4 × 20 frames = 80 frames subtracted
 * Total = 120 + 210 + 240 + 210 + 180 - 80 = 880 frames
 * + 30 frames buffer = 910 frames
 */

const TRANSITION_DURATION = 20;

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Thumbnail */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <TransitionSeries key={hmrKey}>
        {/* Scene 1: Title / Intro */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <TitleScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Workplace Scenario */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <ScenarioScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Quiz / Knowledge Check */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <QuizScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: Guidelines */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <GuidelinesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: Closing / Summary */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <ClosingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
