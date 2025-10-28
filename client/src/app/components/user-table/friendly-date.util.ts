export const friendlyDateUtil = (isoDateString: string) => {
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  };

  return date.toLocaleDateString("en-US", options);
};
