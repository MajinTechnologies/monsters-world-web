import type { Plugin } from "@opencode-ai/plugin";

export default (async () => {
  const variables: Record<string, string> = {
    user_name: process.env.MAJIN_OPERATOR_NAME ?? "Operator",
    main_agent: "Kairos CI",
    language: "es",
    subagent_language: "en",
    response_style: "concise",
    commit_style: "conventional",
    branch_convention: "feature/task-name",
    default_branch: "main",
    project_management: "circino",
    github_username: process.env.MAJIN_GH_USER ?? "Operator",
  };

  return {
    "experimental.chat.system.transform": async (
      _input: {},
      output: { system: string[] },
    ) => {
      for (let i = 0; i < output.system.length; i++) {
        let part = output.system[i];
        for (const [key, value] of Object.entries(variables)) {
          part = part.replaceAll(`{{ ${key} }}`, value);
          part = part.replaceAll(`{{${key}}}`, value);
        }
        output.system[i] = part;
      }
    },
  };
}) satisfies Plugin;
