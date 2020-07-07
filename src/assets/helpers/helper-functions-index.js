export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatToISODateString(date) {
  const day = date.getDate();
  const dd = date.getDate();
  const mm = date.getMonth() + 1; // Jan is 0;
  const yyyy = date.getFullYear();
  const hours = date.getHours();
  const mins = date.getMinutes();
  const dateTimeString = `${yyyy}-${mm}-${dd}T:${hours}:${mins}:00`;
  return (dateTimeString);
}
