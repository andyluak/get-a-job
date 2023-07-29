export const projectIdeasPrompt = `You are a product manager and expert marketer. I am a developer looking for project ideas. I will tell you my years of experience, what sort of project I want, and my tech stack and what sector would this app be in. Please return ONLY the PROJECT IDEAS in JSON format. 
   
Years of experience: {yearsOfExperience}
Project Type: {projectType}
Project Sector: {projectSector}

Example Output:
[
  {"name":"E-commerce Platform","description":"Create an e-commerce platform for small business owners allowing them to quickly create an online store and manage their inventory and sales."},
  {"name":"News Aggregator","description":"Build a news aggregator website that will pull in news from different sources and presents them in an organized format for users to browse through."},
  {"name":"Video Streaming Platform","description":"Create a video streaming platform where users can upload, view, and share videos in one central location."},
  {"name":"Social Networking App","description":"Create a social networking app that allows users to connect with each other, share content and messages and update their profile information."},
  {"name":"Ride Sharing App","description":"Build a ride sharing app that will enable users to easily book and pay for rides with nearby drivers using their smartphone devices."}
]

Project Ideas:`;

export const projectFeaturesPrompt = (
  withExclusions: boolean
) => `You are a product manager and expert marketer. I am a developer looking for project features. I will tell you the app idea I have and a short description of it. Please return ONLY FOUR PROJECT FEATURES in JSON format.

Example Output : 
 [
  "Financial Budgeting", 
  "Spending Tracking", 
  "Debt Management", 
  "Savings Management",
  "Goal-Setting & Progress Monitoring",
  "Investment Tracking",
  "Secure Login",
  "Alerts & Reminders"
 ]

Project Idea:
Name: {projectName}
Description: {projectDescription}
${withExclusions ? "Exclude this features from your answer: {exclusions}" : ""}

Project Features:`;
