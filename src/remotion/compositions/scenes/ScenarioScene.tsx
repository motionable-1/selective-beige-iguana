import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  Sequence,
} from "remotion";
import {
  FadeInWords,
  FadeInChars,
  TypewriterText,
} from "../../library/components/text/TextAnimation";
import { Badge } from "../../library/components/effects/Badge";
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

interface ChatBubbleProps {
  message: string;
  sender: string;
  isRight?: boolean;
  color: string;
  avatarIcon: string;
  delay: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  isRight = false,
  color,
  avatarIcon,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const progress = interpolate(frame - delayFrames, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  const slideX = isRight ? 40 : -40;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isRight ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 14,
        opacity: progress,
        transform: `translateX(${(1 - progress) * slideX}px)`,
        maxWidth: 600,
        alignSelf: isRight ? "flex-end" : "flex-start",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          background: `linear-gradient(135deg, ${color}, ${color}99)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: `0 4px 16px ${color}33`,
        }}
      >
        <Img
          src={`https://api.iconify.design/${avatarIcon}.svg?color=%23ffffff&width=24`}
          width={24}
          height={24}
        />
      </div>

      {/* Bubble */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 12,
            color: COLORS.textMuted,
            fontWeight: 600,
            textAlign: isRight ? "right" : "left",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {sender}
        </span>
        <div
          style={{
            background: isRight
              ? `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.primary}11)`
              : COLORS.surface,
            border: `1px solid ${isRight ? COLORS.primary + "33" : COLORS.surfaceLight}`,
            borderRadius: 16,
            borderTopLeftRadius: isRight ? 16 : 4,
            borderTopRightRadius: isRight ? 4 : 16,
            padding: "14px 20px",
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 16,
              color: COLORS.text,
              lineHeight: 1.5,
            }}
          >
            {frame >= delayFrames + 8 ? message : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ScenarioScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section badge entrance
  const sectionNum = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // "Scenario" card entrance
  const cardScale = interpolate(frame, [25, 50], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Verdict appearance
  const verdictFrame = 170;
  const verdictProgress = interpolate(
    frame,
    [verdictFrame, verdictFrame + 25],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.2)),
    },
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0d1b2a 0%, ${COLORS.bg} 50%, #0a1929 100%)`,
      }}
    >
      {/* Background shapes */}
      <div style={{ position: "absolute", top: 60, right: 60, opacity: 0.05 }}>
        <ShapeAnimation
          shape="ring"
          animation="rotate"
          size={300}
          color={COLORS.primary}
          strokeWidth={3}
          speed={0.1}
        />
      </div>
      <div
        style={{ position: "absolute", bottom: 80, left: 80, opacity: 0.04 }}
      >
        <ShapeAnimation
          shape="hexagon"
          animation="breathe"
          size={180}
          color={COLORS.accent}
          speed={0.3}
        />
      </div>

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.04) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Section indicator top-left */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: sectionNum,
          transform: `translateX(${(1 - sectionNum) * -20}px)`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: headingFont,
            fontSize: 16,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          01
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
          WORKPLACE SCENARIO
        </span>
      </div>

      {/* Progress indicator top right */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 60,
          opacity: sectionNum,
        }}
      >
        <ProgressRing
          value={0.25}
          size={48}
          thickness={3}
          color={COLORS.primary}
          trackColor="rgba(59,130,246,0.12)"
          duration={1}
          delay={0.5}
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
          1/4
        </div>
      </div>

      {/* Main content area */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          right: 60,
          bottom: 60,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Scenario title */}
        <FadeInWords
          stagger={0.1}
          duration={0.6}
          ease="power3.out"
          startFrom={10}
          style={{
            fontFamily: headingFont,
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 8,
          }}
        >
          Team Meeting Feedback
        </FadeInWords>

        <FadeInChars
          stagger={0.015}
          duration={0.4}
          ease="power2.out"
          startFrom={22}
          style={{
            fontFamily: bodyFont,
            fontSize: 16,
            color: COLORS.textMuted,
            marginBottom: 32,
          }}
        >
          How would you deliver constructive feedback?
        </FadeInChars>

        {/* Chat conversation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            opacity: cardOpacity,
            transform: `scale(${cardScale})`,
            background: "rgba(15, 23, 42, 0.6)",
            border: `1px solid ${COLORS.surfaceLight}`,
            borderRadius: 20,
            padding: "28px 32px",
            flex: 1,
          }}
        >
          <ChatBubble
            sender="Manager"
            message="The report was submitted late and had several errors. We need to discuss this."
            color={COLORS.primary}
            avatarIcon="lucide:user"
            delay={1.5}
          />

          <ChatBubble
            sender="Team Lead"
            message="I appreciate your work on this project. Let's review the timeline together and find ways to improve accuracy."
            isRight
            color={COLORS.accent}
            avatarIcon="lucide:users"
            delay={3.5}
          />

          <ChatBubble
            sender="Manager"
            message="Good approach! Let's set up regular check-ins to prevent this going forward."
            color={COLORS.primary}
            avatarIcon="lucide:user"
            delay={5.5}
          />
        </div>

        {/* Verdict / Takeaway */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 60,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: verdictProgress,
            transform: `translateY(${(1 - verdictProgress) * 20}px)`,
            background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.accent}08)`,
            border: `1px solid ${COLORS.accent}33`,
            borderRadius: 14,
            padding: "16px 24px",
          }}
        >
          <Img
            src="https://api.iconify.design/lucide/circle-check.svg?color=%2310B981&width=28"
            width={28}
            height={28}
          />
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 15,
              color: COLORS.accent,
              fontWeight: 600,
            }}
          >
            KEY TAKEAWAY:
          </span>
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 15,
              color: COLORS.text,
              fontWeight: 400,
            }}
          >
            Focus on solutions, not blame. Collaborative feedback builds trust.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
