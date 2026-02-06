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
  FadeInChars,
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

interface GuidelineCardProps {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  index: number;
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({
  icon,
  iconColor,
  title,
  description,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const baseDelay = 1.0 + index * 0.4;
  const delayFrames = Math.round(baseDelay * fps);

  const entrance = interpolate(frame - delayFrames, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const slideY = (1 - entrance) * 30;

  // Subtle float
  const floatY = Math.sin(((frame - delayFrames) / fps) * 1.5 + index) * 2;

  return (
    <div
      style={{
        opacity: entrance,
        transform: `translateY(${slideY + floatY}px)`,
        background: `linear-gradient(145deg, ${COLORS.surface}, ${COLORS.surface}cc)`,
        border: `1px solid ${COLORS.surfaceLight}`,
        borderRadius: 18,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        flex: 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${iconColor}, ${iconColor}66)`,
          opacity: entrance,
          transformOrigin: "left",
          transform: `scaleX(${entrance})`,
        }}
      />

      {/* Number badge */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          fontFamily: headingFont,
          fontSize: 42,
          fontWeight: 800,
          color: COLORS.surfaceLight,
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `${iconColor}18`,
          border: `1px solid ${iconColor}28`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={`https://api.iconify.design/${icon}.svg?color=${encodeURIComponent(iconColor)}&width=24`}
          width={24}
          height={24}
        />
      </div>

      {/* Title */}
      <span
        style={{
          fontFamily: headingFont,
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.text,
          lineHeight: 1.3,
        }}
      >
        {title}
      </span>

      {/* Description */}
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: 13,
          color: COLORS.textMuted,
          lineHeight: 1.6,
        }}
      >
        {description}
      </span>
    </div>
  );
};

export const GuidelinesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sectionOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const guidelines = [
    {
      icon: "lucide:ear",
      iconColor: COLORS.primary,
      title: "Active Listening",
      description:
        "Give full attention, avoid interrupting, and acknowledge what others say before responding.",
    },
    {
      icon: "lucide:message-square",
      iconColor: COLORS.accent,
      title: "Clear Messaging",
      description:
        "Be specific, avoid jargon when possible, and confirm understanding with follow-up questions.",
    },
    {
      icon: "lucide:heart-handshake",
      iconColor: COLORS.purple,
      title: "Empathy First",
      description:
        "Consider perspectives, show respect for different viewpoints, and create psychological safety.",
    },
    {
      icon: "lucide:target",
      iconColor: COLORS.accentYellow,
      title: "Stay Solutions-Focused",
      description:
        "Address issues constructively, propose actionable steps, and celebrate progress together.",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 70% 30%, #111d33 0%, ${COLORS.bg} 70%)`,
      }}
    >
      {/* Background shapes */}
      <div style={{ position: "absolute", top: 60, left: 80, opacity: 0.04 }}>
        <ShapeAnimation
          shape="cross"
          animation="rotate"
          size={200}
          color={COLORS.purple}
          speed={0.08}
        />
      </div>
      <div
        style={{ position: "absolute", bottom: 100, right: 120, opacity: 0.05 }}
      >
        <ShapeAnimation
          shape="diamond"
          animation="breathe"
          size={150}
          color={COLORS.primary}
          speed={0.25}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
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
            background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purple}cc)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: headingFont,
            fontSize: 16,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          03
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
          KEY GUIDELINES
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
          value={0.75}
          size={48}
          thickness={3}
          color={COLORS.purple}
          trackColor="rgba(139,92,246,0.12)"
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
          3/4
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          right: 60,
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
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
          }}
        >
          Best Practices for Every Day
        </FadeInWords>

        <FadeInChars
          stagger={0.015}
          duration={0.4}
          ease="power2.out"
          startFrom={18}
          style={{
            fontFamily: bodyFont,
            fontSize: 17,
            color: COLORS.textMuted,
            maxWidth: 600,
          }}
        >
          Apply these four principles to build a healthier, more productive
          workplace.
        </FadeInChars>

        {/* Cards grid */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 12,
          }}
        >
          {guidelines.map((g, i) => (
            <GuidelineCard key={i} index={i} {...g} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
