import {
  createTemplateAction,
  TemplateExample,
} from "@backstage/plugin-scaffolder-node";
import { randomUUID } from "node:crypto";
import yaml from "yaml";

const example: TemplateExample = {
  description: "Generate a UUID",
  example: yaml.stringify({
    steps: [
      {
        action: "utils:generate:uuid",
        id: "generate-uuid-for-project",
        name: "Project UUID",
        input: {
          uppercase: true,
        },
      },
    ],
  }),
};

export const createUuidAction = () => {
  return createTemplateAction<{
    upperCase?: boolean;
    removeHyphens?: boolean;
  }>({
    id: "utils:generate:uuid",
    description: "Generate a UUID (Universally Unique Identifier)",
    examples: [example],
    schema: {
      input: {
        outputName: {
          type: "string",
          title: "Output Name",
          description: "The name of the output",
        },
        uppercase: {
          type: "boolean",
          title: "Upper Case",
          description: "The upper case of the UUID",
        },
      },
      output: {
        uuid: {
          type: "string",
          title: "Generated UUID",
          description: "The generated UUID",
        },
      },
    },

    async handler(ctx: any) {
      let uuid = randomUUID().toString();
      if (ctx.input.upperCase) {
        uuid = uuid.toUpperCase();
      }
      ctx.output("uuid", uuid);
      ctx.logger.info(`Generated UUID: ${uuid}`);
    },
  });
};
