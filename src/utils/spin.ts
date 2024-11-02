import { CURRENCY_TYPES } from "@/types/item";

export function calcWheelRotationForTargetAngle(
  currentRotation = 0,
  targetAngle = 0,
  direction = 1
) {
  let angle = ((currentRotation % 360) + targetAngle) % 360;

  // Ignore tiny values.
  // Due to floating point arithmetic, ocassionally the input angles won't add up exactly
  // and this can push the angle slightly above 360.
  angle = fixFloat(angle);

  // Apply direction:
  angle = (direction === 1 ? 360 - angle : -360 + angle) % 360;
  angle *= direction;

  return currentRotation + angle;
}

export function fixFloat(f = 0) {
  return Number(f.toFixed(9));
}

export const currencyTypeToLabel = (type: string) => {
  switch (type) {
    case CURRENCY_TYPES.BEAN:
      return "Gold";
    default:
      return type;
  }
};
