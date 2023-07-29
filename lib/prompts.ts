export const projectIdeasPrompt = `Your task is to generate unique and feasible project ideas based on three key factors: the user's years of experience, the type of project they are interested in, and the sector they are working in. 

The input will be a string containing these three factors separated by commas. For example, "5 years, software development, healthcare". The first part of the string represents the user's years of experience, the second part is the type of project, and the third part is the sector they operate in.

As an AI, you should analyze these factors and generate a project idea that matches the user's experience level, suits the type of project they want to work on, and fits into the specific sector they are employed in. It's essential that the idea is feasible considering these constraints and is unique to avoid repetition.

The output should be a detailed description of the project idea. The description should be clear, concise, and informative, outlining the main concepts of the project, how it aligns with the user's experience and sector, and why it is a good fit for the type of project they want to develop.

Take note that you must not create overly complex project ideas for users with less experience, and vice versa, you should not propose overly simple ideas for highly experienced users. The same applies to the project type and sector; each project proposal should show a clear understanding and consideration of these factors.

Let your creativity shine while also respecting the constraints posed by the user's specific circumstances. Be innovative, be feasible, and be highly practical in your suggestions. Users rely on your expert judgment to kickstart their projects, so deliver with precision and ingenuity.

Please return ONLY the PROJECT IDEAS in JSON format, with a key value pair of name and description.

EXAMPLE OUTPUT : 
[
  {
    "name": "Budgeting App",
    "description": "A budgeting app that helps users track their spending and manage their finances."
  }
]

USER INPUT : 
{yearsOfExperience} years experience, {projectType}, {projectSector}.

5 PROJECT IDEAS IN JSON FORMAT AND NOTHING ELSE:`;

export const projectFeaturesPrompt = (
  withExclusions: boolean
) => `Your task is to generate a list of features for a given project based on the project's name, description, and the years of experience of the person working on it. The features should be relevant to the project and reflect the capabilities of the person based on their years of experience. The output should be in a JSON array format as text. Consider the project's purpose, the sector it caters to, and any specific technologies or methodologies mentioned in the description. Be creative and comprehensive in identifying potential features that would enhance the project's functionality and user experience.

Project Name: {projectName}
Project Description: {projectDescription}
Years of Experience: {yearsOfExperience}
${withExclusions ? "Exclusions: {exclusions}" : ""}

EXAMPLE OUTPUT :
["feature1", "feature2", "feature3"]

10 PROJECT FEATURES IN JSON ARRAY FORMAT AND NOTHING ELSE:`;

export const projectPagesPrompt = `You are tasked to generate relevant web pages for a given project. You will be given the project's name, description, and a list of its features. Based on this information, you should come up with suitable web pages that would accommodate the functionalities defined in the project's features. Each page should be represented by a string, and the overall output should be a list of those strings in JSON format. You are not limited by any specific number of pages. Creativity and relevance to the project are the key factors, ensuring each feature is accommodated within the suggested pages.

Project Name: {projectName}
Project Description: {projectDescription}
Years of Experience: {yearsOfExperience}
Features: {features}

EXAMPLE OUTPUT :
["page1", "page2", "page3"]

7 PROJECT PAGES IN JSON ARRAY FORMAT AND NOTHING ELSE:`;

export const projectHomepageSectionsPrompt = (withExclusions : boolean) => `Your task is to generate a webpage content for a particular project based on its name, description, and specific features. This should include ONLY THE HOMEPAGE SECTION NAMES.

Project Name: {projectName}
Project Description: {projectDescription}
Project Features: {features}
${withExclusions ? "History of previously suggested homepage sections: {exclusions}" : ""}

Example OUTPUT : 
['section1', 'section2', 'section3']

10 Homepage Sections IN JSON FORMAT AS A SINGLE ARRAY BASED ON THE EXAMPLE OUTPUT: `;
