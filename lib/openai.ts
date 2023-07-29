import { Configuration, OpenAIApi } from "openai";
import chalk from "chalk";

import { getKey } from "./utils";

import { projectFeaturesPrompt, projectIdeasPrompt } from "./prompts";
const getOpenAi = () => {
  const configuration = new Configuration({
    apiKey: getKey("openai") as string,
  });

  const model = getKey("openai-model") as string;
  const openai = new OpenAIApi(configuration);

  return { openai, model };
};

type ProjectIdeaProps = {
  yearsOfExperience: number;
  projectType: string;
  projectSector: string;
};

type ProjectFeaturesProps = {
  projectName: string;
  projectDescription: string;
  exclusions?: string[];
};

const getInitialProjectIdeas = async ({
  yearsOfExperience,
  projectType,
  projectSector,
}: ProjectIdeaProps) => {
  const prompt = projectIdeasPrompt
    .replace("{yearsOfExperience}", yearsOfExperience.toString())
    .replace("{projectType}", projectType)
    .replace("{projectSector}", projectSector);

  const { openai, model } = getOpenAi();
  const response = await openai.createChatCompletion({
    model,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 3000,
    temperature: 0,
  });

  const {
    choices,
    // @ts-ignore
    usage: { total_tokens: totalTokens },
  } = response.data;
  const { message } = choices[0] || {};
  const { content: unformattedProjectIdeas } = message || { content: "" };

  const projectIdeas = JSON.parse(unformattedProjectIdeas || "[]");

  return { projectIdeas, totalTokens };
};

const getProjectFeatures = async ({
  projectName,
  projectDescription,
  exclusions = [""],
}: ProjectFeaturesProps) => {
  const prompt = projectFeaturesPrompt(exclusions.length > 0 ? true : false)
    .replace("{projectName}", projectName)
    .replace("{projectDescription}", projectDescription)
    .replace("{exclusions}", exclusions.join(", "));

  const { openai, model } = getOpenAi();
  const response = await openai.createChatCompletion({
    model,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 3000,
    temperature: 0,
  });

  const {
    choices,
    // @ts-ignore
    usage: { total_tokens: totalTokens },
  } = response.data;
  const { message } = choices[0] || {};
  const { content: unformattedProjectFeatures } = message || { content: "" };

  const projectFeatures = JSON.parse(unformattedProjectFeatures || "[]");

  return { projectFeatures, totalTokens };
};

export const withLogging =
  (fn: (...args: any[]) => Promise<any>) =>
  async (...args: any[]) => {
    const shouldLog = getKey("log") == "true" ? true : false;
    if (!shouldLog) {
      return fn(...args);
    }

    console.log(
      chalk.green(`Running function ${fn.name} with arguments:`),
      args
    );
    console.time(chalk.blue(`Duration of ${fn.name} execution`));

    try {
      const result = await fn(...args);

      console.timeEnd(chalk.blue(`Duration of ${fn.name} execution`));
      console.log(chalk.green("Result:"), result);

      return result;
    } catch (error) {
      console.log(chalk.red(error));
    }
  };

export const getProjectIdeasWithLogging = withLogging(getInitialProjectIdeas);
export const getProjectFeaturesWithLogging = withLogging(getProjectFeatures);
