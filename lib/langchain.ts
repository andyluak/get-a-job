import { ConsoleCallbackHandler } from "langchain/callbacks";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { getKey } from "./utils";

type ProjectType = "web" | "mobile" | "desktop" | "api" | "cli" | "other";
type ProjectIdeaProps = {
  yearsOfExperience: number;
  projectType: string;
  projectSector: string;
};

export const getInitialProjectIdeas = async ({
  yearsOfExperience,
  projectType,
  projectSector,
}: ProjectIdeaProps) => {
  const llm = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: getKey("openai"),
    maxTokens: 3000,
  });
  const handler = new ConsoleCallbackHandler();
  const template = `You are a product manager and expert marketer. I am a developer looking for project ideas. I will tell you my years of experience, what sort of project I want, and my tech stack and what sector would this app be in. Please return ONLY the PROJECT IDEAS in JSON format. 
   
    Years of experience: {yearsOfExperience}
    Project Type: {projectType}
    Project Sector: {projectSector}

    Example Output:
    {exampleOutput}

    Project Ideas:`;
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: [
      "yearsOfExperience",
      "projectType",
      "projectSector",
      "exampleOutput",
    ],
  });

  const ideaChain = new LLMChain({
    llm,
    prompt: promptTemplate,
    callbacks: [handler],
  });

  const ideas = await ideaChain.call({
    yearsOfExperience,
    projectType,
    projectSector,
    exampleOutput: `[
      {"name":"E-commerce Platform","description":"Create an e-commerce platform for small business owners allowing them to quickly create an online store and manage their inventory and sales."},
      {"name":"News Aggregator","description":"Build a news aggregator website that will pull in news from different sources and presents them in an organized format for users to browse through."},
      {"name":"Video Streaming Platform","description":"Create a video streaming platform where users can upload, view, and share videos in one central location."},
      {"name":"Social Networking App","description":"Create a social networking app that allows users to connect with each other, share content and messages and update their profile information."},
      {"name":"Ride Sharing App","description":"Build a ride sharing app that will enable users to easily book and pay for rides with nearby drivers using their smartphone devices."}
    ]`,
  });

  return ideas;
};
