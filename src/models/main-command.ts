import { remove, ensureDir } from "fs-extra";
import { buildCommand } from "../utils/build-command";
import { commandName, commandsMap } from "../commands";
import { CommandDocumentation } from "./documentation";
import { cmdOption } from "./options";
import { Command } from "./command";

export class MainCommand extends Command {
  protected readonly doc: CommandDocumentation = {
    name: ``,
    usage: `<command>`,
    description: `One CLI to rule them all.`,
    details: `
Easy monorepos management, and more.

Commands: ${[...commandsMap.keys()].join(`, `)}

Use 'monocli help <command name>' for more information about one of these commands.`,
    options: new Map([
      [
        `debug`,
        {
          type: `boolean`,
          description: `enable debug mode (set log level to "silly")`
        }
      ]
    ])
  };

  async run(
    params: string[],
    options: Map<string, cmdOption>
  ): Promise<string | void> {
    const cmdName = params[0] as commandName;
    const subCommandParams = params.slice(1);
    const command = buildCommand(cmdName);
    this.validate(params, options);

    let subCommandOptions = new Map([...options]);
    for (const [optionName] of this.doc.options) {
      subCommandOptions.delete(optionName);
    }

    subCommandOptions = command.validate(subCommandParams, subCommandOptions);

    await remove(this.tmpDir);
    await ensureDir(this.tmpDir);

    return command.run(subCommandParams, subCommandOptions);
  }
}
