export type SectionId = 'experience' | 'studies' | 'projects' | 'skills' | 'about';
export type OutputKind = SectionId | 'help' | 'unknown';

export interface MenuOption {
  key: string;
  id: SectionId;
  label: string;
  aliases: readonly string[];
}

export const MENU: readonly MenuOption[] = [
  { key: '1', id: 'experience', label: 'Experience', aliases: ['experience', 'exp', 'work'] },
  { key: '2', id: 'studies', label: 'Studies', aliases: ['studies', 'education'] },
  { key: '3', id: 'projects', label: 'Projects', aliases: ['projects'] },
  { key: '4', id: 'skills', label: 'Skills', aliases: ['skills', 'stack'] },
  { key: '5', id: 'about', label: 'About & contact', aliases: ['about', 'contact', 'whoami'] },
];

export type ParsedCommand = { kind: 'clear' } | { kind: 'output'; output: OutputKind } | { kind: 'noop' };

/** Translates raw console input into the action the console must perform. */
export function parseCommand(raw: string): ParsedCommand {
  const input = raw.trim().toLowerCase();
  if (!input) return { kind: 'noop' };
  if (['clear', 'cls'].includes(input)) return { kind: 'clear' };
  if (['help', 'menu', '?', 'h', '0'].includes(input)) return { kind: 'output', output: 'help' };

  const option = MENU.find((item) => item.key === input || item.aliases.includes(input));
  return { kind: 'output', output: option?.id ?? 'unknown' };
}
