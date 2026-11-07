const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");

// "Mar 2019" -> 2019.17; "Present" -> now.
export function toYear(label) {
  if (label === "Present") {
    const now = new Date();
    return now.getFullYear() + now.getMonth() / 12;
  }
  const [mon, year] = label.split(" ");
  return Number(year) + MONTHS.indexOf(mon) / 12;
}

export const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
