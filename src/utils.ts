export const formatTime = (time: number): string => {
  // if (!time || isNaN(time)) return "00:00";

  // const hrs = Math.floor(time / 3600);
  // const mins = Math.floor((time % 3600) / 60);
  // const secs = Math.floor(time % 60);

  // const formattedMins = mins < 10 ? `0${mins}` : mins;
  // const formattedSecs = secs < 10 ? `0${secs}` : secs;

  // if (hrs > 0) {
  //   return `${hrs}:${formattedMins}:${formattedSecs}`;
  // }

  // return `${formattedMins}:${formattedSecs}`;

  if (isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
