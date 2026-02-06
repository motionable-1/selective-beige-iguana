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
import { Badge } from "../../library/components/effects/Badge";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: headingFont } = loadManrope();
const { fontFamily: bodyFont } = loadInter();

// Color palette - corporate blue
const COLORS = {
  bg: "#0A1628",
  primary: "#3B82F6",
  primaryLight: "#60A5FA",
  accent: "#10B981",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  surface: "#1E293B",
  surfaceLight: "#334155",
};

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated gradient bar at top
  const barWidth = interpolate(frame, [0, 40], [0, 100], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Background pulse
  const bgPulse = 0.03 * Math.sin((frame / fps) * 1.5);

  // Icon entrance
  const iconScale = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const iconRotation = interpolate(frame, [8, 28], [-180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Divider line
  const dividerWidth = interpolate(frame, [20, 50], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Bottom info bar
  const infoOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const infoY = interpolate(frame, [60, 80], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #1a2744 0%, ${COLORS.bg} 70%)`,
      }}
    >
      {/* Animated gradient bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 4,
          width: `${barWidth}%`,
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`,
        }}
      />

      {/* Floating ambient shapes */}
      <div style={{ position: "absolute", top: 80, left: 100, opacity: 0.08 }}>
        <ShapeAnimation
          shape="hexagon"
          animation="rotate"
          size={200}
          color={COLORS.primary}
          speed={0.15}
        />
      </div>
      <div
        style={{ position: "absolute", bottom: 120, right: 80, opacity: 0.06 }}
      >
        <ShapeAnimation
          shape="circle"
          animation="breathe"
          size={280}
          color={COLORS.accent}
          speed={0.4}
        />
      </div>
      <div
        style={{ position: "absolute", top: 200, right: 200, opacity: 0.05 }}
      >
        <ShapeAnimation
          shape="triangle"
          animation="rotate"
          size={120}
          color={COLORS.primaryLight}
          speed={0.2}
        />
      </div>
      <div
        style={{ position: "absolute", bottom: 200, left: 250, opacity: 0.07 }}
      >
        <ShapeAnimation
          shape="diamond"
          animation="breathe"
          size={100}
          color={COLORS.primary}
          speed={0.3}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: `scale(${1 + bgPulse})`,
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Presentation icon */}
        <div
          style={{
            transform: `scale(${iconScale}) rotate(${iconRotation}deg)`,
            marginBottom: 8,
          }}
        >
          <Img
            src="https://api.iconify.design/lucide/presentation.svg?color=%233B82F6&width=72"
            width={72}
            height={72}
          />
        </div>

        {/* Badge */}
        <Badge
          badgeStyle="glass"
          color={COLORS.primary}
          animation="scaleIn"
          delay={0.3}
          fontSize={13}
          paddingX={20}
          paddingY={8}
          style={{
            fontFamily: bodyFont,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Employee Training Program
        </Badge>

        {/* Main title */}
        <FadeInWords
          stagger={0.12}
          duration={0.7}
          ease="power3.out"
          startFrom={12}
          className="text-balance"
          style={{
            fontFamily: headingFont,
            fontSize: 68,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Effective Workplace Communication
        </FadeInWords>

        {/* Divider line */}
        <div
          style={{
            width: dividerWidth,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, ${COLORS.accent}, transparent)`,
            borderRadius: 4,
          }}
        />

        {/* Subtitle */}
        <FadeInChars
          stagger={0.02}
          duration={0.5}
          ease="power2.out"
          startFrom={35}
          style={{
            fontFamily: bodyFont,
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.textMuted,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          Building stronger teams through clear, respectful dialogue
        </FadeInChars>
      </div>

      {/* Bottom info row */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 48,
          opacity: infoOpacity,
          transform: `translateY(${infoY}px)`,
        }}
      >
        {[
          { icon: "lucide:clock", label: "15 min" },
          { icon: "lucide:users", label: "All Teams" },
          { icon: "lucide:award", label: "Certificate" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: interpolate(frame, [65 + i * 5, 80 + i * 5], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <Img
              src={`https://api.iconify.design/${item.icon}.svg?color=%2360A5FA&width=20`}
              width={20}
              height={20}
            />
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 15,
                color: COLORS.textMuted,
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
