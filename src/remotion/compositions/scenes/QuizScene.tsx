import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
} from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { ProgressRing } from "../../library/components/effects/ProgressRing";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: headingFont } = loadManrope();
const { fontFamily: bodyFont } = loadInter();

const COLORS = {
  bg: "#0A1628",
  primary: "#3B82F6",
  primaryLight: "#60A5FA",
  accent: "#10B981",
  accentYellow: "#F59E0B",
  danger: "#EF4444",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  surface: "#1E293B",
  surfaceLight: "#334155",
};

interface QuizOptionProps {
  letter: string;
  text: string;
  isCorrect?: boolean;
  delay: number;
  revealFrame: number;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  letter,
  text,
  isCorrect = false,
  delay,
  revealFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const entrance = interpolate(frame - delayFrames, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const isRevealed = frame >= revealFrame;
  const revealProgress = interpolate(frame - revealFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const bgColor = isRevealed
    ? isCorrect
      ? `rgba(16, 185, 129, ${0.15 * revealProgress})`
      : `rgba(239, 68, 68, ${0.08 * revealProgress})`
    : COLORS.surface;

  const borderColor = isRevealed
    ? isCorrect
      ? `rgba(16, 185, 129, ${0.5 * revealProgress})`
      : `rgba(239, 68, 68, ${0.15 * revealProgress})`
    : COLORS.surfaceLight;

  const letterBg =
    isRevealed && isCorrect
      ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent}cc)`
      : `linear-gradient(135deg, ${COLORS.primary}33, ${COLORS.primary}22)`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "18px 24px",
        background: bgColor,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 14,
        opacity: entrance,
        transform: `translateX(${(1 - entrance) * 40}px)`,
      }}
    >
      {/* Letter circle */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: letterBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: headingFont,
          fontSize: 16,
          fontWeight: 800,
          color: isRevealed && isCorrect ? "#fff" : COLORS.primaryLight,
          flexShrink: 0,
        }}
      >
        {isRevealed && isCorrect ? "✓" : letter}
      </div>

      {/* Text */}
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 17,
          color: isRevealed && !isCorrect ? COLORS.textMuted : COLORS.text,
          fontWeight: isRevealed && isCorrect ? 600 : 400,
          lineHeight: 1.4,
          textDecoration: isRevealed && !isCorrect ? "line-through" : "none",
          textDecorationColor: COLORS.danger + "44",
        }}
      >
        {text}
      </span>

      {/* Result icon */}
      {isRevealed && (
        <div style={{ marginLeft: "auto", opacity: revealProgress }}>
          <Img
            src={`https://api.iconify.design/lucide/${isCorrect ? "circle-check" : "circle-x"}.svg?color=${isCorrect ? "%2310B981" : "%23EF4444"}&width=22`}
            width={22}
            height={22}
          />
        </div>
      )}
    </div>
  );
};

export const QuizScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const sectionOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Answer reveal frame
  const revealFrame = Math.round(5.5 * fps);

  // Explanation card
  const explainProgress = interpolate(frame - revealFrame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Pulse on correct answer
  const pulseScale =
    frame >= revealFrame
      ? 1 + 0.02 * Math.sin(((frame - revealFrame) / fps) * 4)
      : 1;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 60%, #111d33 0%, ${COLORS.bg} 70%)`,
      }}
    >
      {/* Floating shapes */}
      <div
        style={{ position: "absolute", top: 100, right: 140, opacity: 0.06 }}
      >
        <ShapeAnimation
          shape="star"
          animation="rotate"
          size={150}
          color={COLORS.accentYellow}
          speed={0.12}
        />
      </div>
      <div
        style={{ position: "absolute", bottom: 100, left: 100, opacity: 0.04 }}
      >
        <ShapeAnimation
          shape="ring"
          animation="breathe"
          size={200}
          color={COLORS.primary}
          strokeWidth={3}
          speed={0.3}
        />
      </div>

      {/* Dot grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.04) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Section indicator */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: sectionOpacity,
          transform: `translateX(${(1 - sectionOpacity) * -20}px)`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.accentYellow}, ${COLORS.accentYellow}cc)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: headingFont,
            fontSize: 16,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          02
        </div>
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 14,
            color: COLORS.textMuted,
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          KNOWLEDGE CHECK
        </span>
      </div>

      {/* Progress */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 60,
          opacity: sectionOpacity,
        }}
      >
        <ProgressRing
          value={0.5}
          size={48}
          thickness={3}
          color={COLORS.accentYellow}
          trackColor="rgba(245,158,11,0.12)"
          duration={1}
          delay={0.3}
          showValue={false}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: bodyFont,
            fontSize: 11,
            color: COLORS.textMuted,
            fontWeight: 600,
          }}
        >
          2/4
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 80,
          right: 80,
          bottom: 60,
          display: "flex",
          gap: 48,
        }}
      >
        {/* Left: Question */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* Question icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${COLORS.accentYellow}22, ${COLORS.accentYellow}11)`,
              border: `1px solid ${COLORS.accentYellow}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: sectionOpacity,
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/help-circle.svg?color=%23F59E0B&width=28"
              width={28}
              height={28}
            />
          </div>

          <FadeInWords
            stagger={0.08}
            duration={0.6}
            ease="power3.out"
            startFrom={8}
            className="text-balance"
            style={{
              fontFamily: headingFont,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.text,
              lineHeight: 1.3,
            }}
          >
            A colleague makes an error in their presentation. What is the best
            approach?
          </FadeInWords>

          {/* Explanation card after reveal */}
          <div
            style={{
              opacity: explainProgress,
              transform: `translateY(${(1 - explainProgress) * 15}px) scale(${pulseScale})`,
              background: `linear-gradient(135deg, ${COLORS.accent}12, ${COLORS.accent}06)`,
              border: `1px solid ${COLORS.accent}30`,
              borderRadius: 14,
              padding: "18px 22px",
              marginTop: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <Img
                src="https://api.iconify.design/lucide/lightbulb.svg?color=%2310B981&width=20"
                width={20}
                height={20}
              />
              <span
                style={{
                  fontFamily: headingFont,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.accent,
                }}
              >
                WHY THIS WORKS
              </span>
            </div>
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 14,
                color: COLORS.textMuted,
                lineHeight: 1.6,
              }}
            >
              Private, constructive feedback preserves dignity and trust. It
              creates a safe environment where team members feel comfortable
              taking risks and growing.
            </span>
          </div>
        </div>

        {/* Right: Options */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            justifyContent: "center",
          }}
        >
          <QuizOption
            letter="A"
            text="Correct them immediately in front of everyone"
            delay={1.2}
            revealFrame={revealFrame}
          />
          <QuizOption
            letter="B"
            text="Ignore it — it's not your problem"
            delay={1.5}
            revealFrame={revealFrame}
          />
          <QuizOption
            letter="C"
            text="Speak with them privately after the meeting and offer to help"
            isCorrect
            delay={1.8}
            revealFrame={revealFrame}
          />
          <QuizOption
            letter="D"
            text="Send an email to their manager about the mistake"
            delay={2.1}
            revealFrame={revealFrame}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
