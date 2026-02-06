import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
} from "remotion";
import {
  FadeInWords,
  BounceChars,
} from "../../library/components/text/TextAnimation";
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
  purple: "#8B5CF6",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  surface: "#1E293B",
  surfaceLight: "#334155",
};

interface SummaryItemProps {
  icon: string;
  text: string;
  color: string;
  index: number;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  icon,
  text,
  color,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 1.2 + index * 0.35;
  const delayFrames = Math.round(delay * fps);
  const entrance = interpolate(frame - delayFrames, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity: entrance,
        transform: `translateX(${(1 - entrance) * -30}px)`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Img
          src={`https://api.iconify.design/${icon}.svg?color=${encodeURIComponent(color)}&width=22`}
          width={22}
          height={22}
        />
      </div>
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 17,
          color: COLORS.text,
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sectionOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // CTA button entrance
  const ctaDelay = Math.round(4 * fps);
  const ctaProgress = interpolate(frame - ctaDelay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // Pulsating glow on CTA
  const ctaGlow =
    frame >= ctaDelay
      ? 0.3 + 0.15 * Math.sin(((frame - ctaDelay) / fps) * 3)
      : 0;

  // Completion ring animation
  const ringDelay = 0.5;

  // Bottom tagline
  const taglineDelay = Math.round(4.8 * fps);
  const taglineProgress = interpolate(frame - taglineDelay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const summaryItems = [
    {
      icon: "lucide:ear",
      text: "Practice active listening in every interaction",
      color: COLORS.primary,
    },
    {
      icon: "lucide:message-square",
      text: "Communicate clearly and with empathy",
      color: COLORS.accent,
    },
    {
      icon: "lucide:shield-check",
      text: "Give feedback privately and constructively",
      color: COLORS.purple,
    },
    {
      icon: "lucide:target",
      text: "Focus on solutions, not blame",
      color: COLORS.accentYellow,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #12213a 0%, ${COLORS.bg} 70%)`,
      }}
    >
      {/* Floating shapes */}
      <div style={{ position: "absolute", top: 80, left: 100, opacity: 0.06 }}>
        <ShapeAnimation
          shape="star"
          animation="rotate"
          size={160}
          color={COLORS.accent}
          speed={0.1}
        />
      </div>
      <div
        style={{ position: "absolute", bottom: 100, right: 80, opacity: 0.05 }}
      >
        <ShapeAnimation
          shape="circle"
          animation="breathe"
          size={240}
          color={COLORS.primary}
          speed={0.3}
        />
      </div>
      <div
        style={{ position: "absolute", top: 300, right: 180, opacity: 0.04 }}
      >
        <ShapeAnimation
          shape="hexagon"
          animation="rotate"
          size={120}
          color={COLORS.purple}
          speed={0.15}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16,185,129,0.03) 1px, transparent 0)`,
          backgroundSize: "36px 36px",
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
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent}cc)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: headingFont,
            fontSize: 16,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          04
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
          SUMMARY
        </span>
      </div>

      {/* Completion ring top right */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 60,
          opacity: sectionOpacity,
        }}
      >
        <ProgressRing
          value={1}
          size={48}
          thickness={3}
          color={COLORS.accent}
          trackColor="rgba(16,185,129,0.12)"
          duration={1.5}
          delay={ringDelay}
          showValue={false}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src="https://api.iconify.design/lucide/check.svg?color=%2310B981&width=16"
            width={16}
            height={16}
            style={{
              opacity: interpolate(
                frame,
                [
                  Math.round((ringDelay + 1.5) * fps),
                  Math.round((ringDelay + 2) * fps),
                ],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              ),
            }}
          />
        </div>
      </div>

      {/* Main layout: Left summary + Right CTA */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          right: 60,
          bottom: 60,
          display: "flex",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* Left: Summary */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}
        >
          <FadeInWords
            stagger={0.1}
            duration={0.6}
            ease="power3.out"
            startFrom={8}
            className="text-balance"
            style={{
              fontFamily: headingFont,
              fontSize: 38,
              fontWeight: 700,
              color: COLORS.text,
              marginBottom: 8,
            }}
          >
            What You Learned Today
          </FadeInWords>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {summaryItems.map((item, i) => (
              <SummaryItem key={i} index={i} {...item} />
            ))}
          </div>
        </div>

        {/* Right: CTA Card */}
        <div
          style={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            opacity: ctaProgress,
            transform: `scale(${0.9 + ctaProgress * 0.1})`,
          }}
        >
          {/* Completion medal */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.accent}10)`,
              border: `2px solid ${COLORS.accent}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 40px ${COLORS.accent}${Math.round(ctaGlow * 255)
                .toString(16)
                .padStart(2, "0")}`,
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/award.svg?color=%2310B981&width=48"
              width={48}
              height={48}
            />
          </div>

          <BounceChars
            stagger={0.04}
            duration={0.7}
            startFrom={Math.round(4.2 * fps)}
            style={{
              fontFamily: headingFont,
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.text,
              textAlign: "center",
            }}
          >
            Training Complete!
          </BounceChars>

          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 15,
              color: COLORS.textMuted,
              textAlign: "center",
              lineHeight: 1.5,
              opacity: ctaProgress,
            }}
          >
            Apply these skills in your next team interaction. Great
            communication starts with you.
          </span>

          {/* CTA Button */}
          <div
            style={{
              opacity: ctaProgress,
              transform: `translateY(${(1 - ctaProgress) * 10}px)`,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              borderRadius: 14,
              padding: "16px 36px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: `0 4px 24px ${COLORS.primary}44`,
            }}
          >
            <span
              style={{
                fontFamily: headingFont,
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Get Your Certificate
            </span>
            <Img
              src="https://api.iconify.design/lucide/arrow-right.svg?color=%23ffffff&width=18"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: taglineProgress,
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 13,
            color: COLORS.textMuted + "88",
            letterSpacing: 1,
          }}
        >
          © 2025 Your Company — Learning & Development
        </span>
      </div>
    </AbsoluteFill>
  );
};
