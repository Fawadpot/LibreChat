export function extractUniqueVariables(input: string): string[] {
  const regex = /{{(.*?)}}/g;
  const variablesSet = new Set<string>();
  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(input)) !== null) {
    variablesSet.add(match[1]);
  }

  return Array.from(variablesSet);
}

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
