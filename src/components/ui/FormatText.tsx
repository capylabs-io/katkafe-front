import React from "react";

const FormatText = ({ text }: { text: string }) => {
  const formatText = (text: string) => {
    const maxLength = 15;
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + "...";
  };

  return <span>{formatText(text)}</span>;
};

export default FormatText;
