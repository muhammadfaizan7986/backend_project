import * as moment from 'moment';

export const generateRandomNumber = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return random;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isDateWithinCurrentWeekRange = (gameDate: string): boolean => {
  // Parse the game date
  console.log('gameDate', gameDate);

  const gameMoment = moment(gameDate, 'YYYYMMDD');
  // Calculate the current week's start and end (Tuesday 3 AM to next Tuesday 3 AM)
  const now = moment(); // Current date and time
  const weekStart = now.clone().startOf('week').add(1, 'days').add(3, 'hours'); // Current week's Tuesday 3 AM
  const weekEnd = weekStart.clone().add(7, 'days'); // Next week's Tuesday 3 AM

  // If the current date/time is before this week's Tuesday 3 AM, adjust to the previous week
  if (now.isBefore(weekStart)) {
    weekStart.subtract(7, 'days');
    weekEnd.subtract(7, 'days');
  }

  // Check if the game date is within the week range
  return gameMoment.isSameOrAfter(weekStart) && gameMoment.isBefore(weekEnd);
};
