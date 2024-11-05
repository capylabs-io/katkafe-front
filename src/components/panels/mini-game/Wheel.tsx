// components/SpinWheel.tsx
import { SPIN_REVOLUTIONS } from "@/constants/mini-game";
import { WheelItem } from "@/types/spin-wheel";
import { calcWheelRotationForTargetAngle } from "@/utils/spin";
import { get } from "lodash";
import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import styled from "styled-components";

const CanvasContainer = styled.div<{ rotation: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 5s cubic-bezier(0.33, 1, 0.68, 1);
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`;

// Pointer style
const Pointer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid red; /* Pointer color */
`;

// Overlay Image Styling
const OverlayImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none; // Ensure overlay does not block interactions
`;

interface SpinWheelProps {
  items: WheelItem[];
  pointerAngle?: number; // New prop for configurable pointer angle
  onSpinStart?: () => void; // New event for spin start
  onSpinEnd?: (winningItem: WheelItem) => void; // New event for spin end
  debug?: boolean;
  duration?: number;
  radius?: number;
  itemRadiusOffset?: number;
  overlayImage?: string;
  labelRadius?: number;
  imageRadius?: number;
}

export interface SpinWheelRef {
  spinToItem: (index: number, revolutions?: number) => void;
}

export const SpinWheel = forwardRef<SpinWheelRef, SpinWheelProps>(
  (
    {
      items,
      pointerAngle = 0,
      overlayImage,
      onSpinStart,
      onSpinEnd,
      debug = false,
      duration = 5000,
      radius = 180,
      itemRadiusOffset = 20,
      labelRadius = 0.7,
      imageRadius = 0.5,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [currentAngle, setCurrentAngle] = useState(0);

    const itemRadius = radius - itemRadiusOffset;
    // Calculate start and end angles for each item
    const itemAngles = items.map((_, index) => {
      const segmentAngle = 360 / items.length;
      const startAngle = index * segmentAngle + pointerAngle;
      const endAngle = startAngle + segmentAngle;
      return { startAngle, endAngle };
    });

    // Method to spin to a specific item
    const spinToItem = (index: number, revolutions = 5) => {
      onSpinStart?.();

      const { startAngle, endAngle } = itemAngles[index];
      const randomAngleWithinItem =
        Math.random() * (endAngle - startAngle) + startAngle;

      const newTargetAngle = randomAngleWithinItem - (currentAngle % 360);
      const newRotation =
        currentAngle + (SPIN_REVOLUTIONS * 360 + newTargetAngle);

      setCurrentAngle(newRotation);
      setTimeout(() => {
        onSpinEnd?.(items[index]);
      }, duration);
    };

    const drawWheel = (context: CanvasRenderingContext2D) => {
      const center = { x: radius, y: radius };
      const arc = (2 * Math.PI) / items.length;

      items.forEach((item, index) => {
        // const startAngle = index * arc;
        // const endAngle = startAngle + arc;
        const startAngle = -Math.PI / 2 - index * arc;
        const endAngle = startAngle - arc;

        // Draw the segment
        context.beginPath();
        context.moveTo(center.x, center.y);
        context.arc(center.x, center.y, itemRadius, startAngle, endAngle, true);
        context.closePath();
        context.fillStyle = item.color;
        context.fill();

        // Draw the label
        const angle = startAngle - arc / 2; // Middle angle of the segment
        const labelX = center.x + Math.cos(angle) * (radius * labelRadius);
        const labelY = center.y + Math.sin(angle) * (radius * labelRadius);

        context.save();
        context.translate(labelX, labelY);

        // Set label rotation to 90 degrees relative to the center
        context.rotate(angle + Math.PI / 2); // Perpendicular to the radius
        context.fillStyle = "#362A5E";
        context.font = "bold 18px Arial";
        context.textAlign = "center";
        context.fillText(item.label, 0, 0); // Draw label centered on its position
        context.restore();

        // Draw the image
        const imageWidth = get(item, "imageWidth", 32);
        const imageHeight = get(item, "imageHeight", 32);
        const imageX = center.x + Math.cos(angle) * radius * imageRadius;
        const imageY = center.y + Math.sin(angle) * radius * imageRadius;

        const image = new Image();
        image.src = item.image; // Assuming item.image is a URL to the image
        image.onload = () => {
          context.save();
          context.translate(imageX, imageY);
          context.rotate(angle + Math.PI / 2);
          context.drawImage(
            image,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
          );
          context.restore();
        };
      });
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Resize the canvas based on the radius
      canvas.width = radius * 2;
      canvas.height = radius * 2;

      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel(context);
      }
    }, [items, radius]);

    // Expose the spinToItem method to the parent component
    useImperativeHandle(ref, () => ({
      spinToItem,
    }));

    return (
      <div
        style={{
          position: "relative",
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
        }}
      >
        <CanvasContainer rotation={currentAngle}>
          <canvas ref={canvasRef} />
        </CanvasContainer>
        {overlayImage && <OverlayImage src={overlayImage} alt="Overlay" />}
        {debug && <Pointer />} {/* Static pointer */}
      </div>
    );
  }
);

SpinWheel.displayName = "SpinWheel";
