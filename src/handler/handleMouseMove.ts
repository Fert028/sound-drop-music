export const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  // const rect = e.currentTarget.getBoundingClientRect();
  const { left, top } = e.currentTarget.getBoundingClientRect();

  // const x = e.clientX - rect.left;
  // const y = e.clientY - rect.top;

  const x = e.clientX - left;
  const y = e.clientY - top;

  const el = e.currentTarget;

  e.currentTarget.style.setProperty("--x", `${x}px`);
  e.currentTarget.style.setProperty("--y", `${y}px`);
};