import { StatusCommand } from "./status";
import { MvCommand } from "./mv";
import { HelpCommand } from "./help";
import { UpdateCommand } from "./update";
import { CheckCommand } from "./check";
import { AddCommand } from "./add";

export type commandName = `status` | `mv` | `help` | `update` | `check` | `add`;
export type typesOfCommand =
  | typeof StatusCommand
  | typeof MvCommand
  | typeof HelpCommand
  | typeof UpdateCommand
  | typeof CheckCommand
  | typeof AddCommand;

export const commandsMap: Map<commandName, typesOfCommand> = new Map([
  [`status`, StatusCommand],
  [`mv`, MvCommand],
  [`help`, HelpCommand],
  [`update`, UpdateCommand],
  [`check`, CheckCommand],
  [`add`, AddCommand]
] as [commandName, typesOfCommand][]);

export {
  StatusCommand,
  MvCommand,
  HelpCommand,
  UpdateCommand,
  CheckCommand,
  AddCommand
};
