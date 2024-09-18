export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const truncateTo25Chars = (text?: string) => {
  if (!text) return;
  if (text.length <= 25) {
    return text;
  }
  return text.slice(0, 25) + "...";
};