import React from "react";

interface NumberFormatterProps {
  value?: number;
}

export const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(1) + " T";
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + " B";
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + " M";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + " K";
  }
  return value.toString();
};

const NumberFormatter: React.FC<NumberFormatterProps> = ({ value = 0 }) => {
  return <span>{formatNumber(value)}</span>;
};

export default NumberFormatter;
