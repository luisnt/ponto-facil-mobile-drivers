export function SkillService() {

  const format = (value: unknown): string => {
    if (Array.isArray(value)) return JSON.stringify(value, null, 2);
    if (value !== null && typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  return {
    title1: (value: string): void => console.log(`\n\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n ${value} \n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n`),
    title2: (value: string): void => console.log(`\n\n#############################\n ** ${value} **\n#############################\n\n`),
    echo: (local: number, label: string, value: unknown): void => console.log(`\n[${local}] - ${label}\n`, format(value), "\n")
  }
}
