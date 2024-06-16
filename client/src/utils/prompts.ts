export const hasVariables = (text: string): boolean => {
  const regex = /{{(.*?)}}/g;
  return regex.test(text);
};

export const extractUniqueVariables = (text: string): string[] => {
  const regex = /{{(.*?)}}/g;
  let match: RegExpExecArray | null;
  const variables = new Set<string>();
  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }
  return Array.from(variables);
};

export function formatDateTime(dateTimeString: string) {
  const date = new Date(dateTimeString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12;

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

  return `${formattedDate}, ${formattedTime}`;
}
