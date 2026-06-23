/** Built-in terminal commands — always handled in code, not editable by admin */
export const RESERVED_TERMINAL_COMMANDS = [
  "help",
  "whoami",
  "clear",
  "date",
  "echo",
  "contact",
  "email",
  "social",
  "send",
  "status",
  "pwd",
] as const;

export type ReservedTerminalCommand = (typeof RESERVED_TERMINAL_COMMANDS)[number];

export function isReservedTerminalCommand(command: string): boolean {
  return RESERVED_TERMINAL_COMMANDS.includes(
    command.trim().toLowerCase() as ReservedTerminalCommand
  );
}
