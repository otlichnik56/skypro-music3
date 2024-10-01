export function formatTime(seconds: number): string {
  const roundedSeconds = Math.floor(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = (roundedSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}
