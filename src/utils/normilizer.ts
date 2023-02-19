/**
 * Formats `updated_at` string to a human-readable time elapsed string in the GitHub style (e.g., "Updated 2 weeks ago").
 * @param {string} updatedAt - The `updated_at` string to format.
 * @returns {string} The formatted time elapsed string.
 */
export const formatTimeElapsed = (updatedAt: string) => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const diff = now.getTime() - updatedDate.getTime();
    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;
  
    if (diff < oneMinute) {
      return "Just now";
    } else if (diff < oneHour) {
      const minutes = Math.floor(diff / oneMinute);
      return `Updated ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diff < oneDay) {
      const hours = Math.floor(diff / oneHour);
      return `Updated ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (diff < oneWeek) {
      const days = Math.floor(diff / oneDay);
      return `Updated ${days} ${days === 1 ? "day" : "days"} ago`;
    } else {
      const weeks = Math.floor(diff / oneWeek);
      return `Updated ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
};
