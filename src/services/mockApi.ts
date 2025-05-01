import { CandidateProfile, Message } from "../types";
import { jobDescription } from "../data/jobDescription";
import { v4 as uuidv4 } from "uuid";

const SYSTEM_PROMPT = `
You are an AI assistant helping with the initial screening of job candidates for the position of:
${jobDescription.title} at ${jobDescription.company}.

Use the following job details to answer candidates' questions accurately:
- Full job title: ${jobDescription.title}
- Company: ${jobDescription.company}
- Location: ${jobDescription.location}
- Type: ${jobDescription.type}
- Salary range: ${jobDescription.salary}

Description: ${jobDescription.description}

Responsibilities:
${jobDescription.responsibilities.map((r) => `- ${r}`).join("\n")}

Requirements:
${jobDescription.requirements.map((r) => `- ${r}`).join("\n")}

Benefits:
${jobDescription.benefits.map((b) => `- ${b}`).join("\n")}

Your goal is to:
1. Answer questions about the job accurately and helpfully
2. Extract information about the candidate naturally through conversation
3. Be friendly, professional, and conversational

When talking to candidates:
- Don't ask more than one question at a time
- Focus on extracting relevant information without being too direct
- If the candidate hasn't provided certain information, find ways to ask about it naturally
- Be helpful and informative with job details
`;

export const getInitialMessage = (): Message => {
  return {
    id: uuidv4(),
    role: "assistant",
    content: `Hi there! I'm the TechSolutions Inc. recruiting assistant. I'd be happy to tell you about our Senior Full Stack Developer position and answer any questions you might have. What brings you to this role today?`,
    timestamp: new Date(),
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getChatResponse = async (
  messages: Message[]
): Promise<Message> => {
  await delay(1000 + Math.random() * 1000);

  const userMessage = messages[messages.length - 1].content.toLowerCase();

  let response = "";

  if (
    userMessage.includes("salary") ||
    userMessage.includes("pay") ||
    userMessage.includes("compensation")
  ) {
    response = `The salary range for this Senior Full Stack Developer position is ${jobDescription.salary}, depending on experience and qualifications. We also offer equity options as part of our compensation package. May I ask about your salary expectations or what range you're looking for?`;
  } else if (
    userMessage.includes("remote") ||
    userMessage.includes("location") ||
    userMessage.includes("where")
  ) {
    response = `This position is fully remote, though we primarily hire in US and Canada time zones to facilitate collaboration. We do have quarterly in-person meetups, typically in our HQ city. How does that align with your work preferences?`;
  } else if (
    userMessage.includes("experience") ||
    userMessage.includes("background")
  ) {
    response = `Thanks for sharing! For this Senior Full Stack Developer role, we're looking for candidates with at least 5 years of experience in full stack development, with strong proficiency in JavaScript/TypeScript, React, and Node.js. Could you tell me a bit more about your experience with these technologies?`;
  } else if (
    userMessage.includes("stack") ||
    userMessage.includes("technologies") ||
    userMessage.includes("tech")
  ) {
    response = `Our tech stack primarily consists of React, TypeScript, and Node.js for development. We use PostgreSQL and MongoDB for databases, AWS for hosting, and follow DevOps best practices with CI/CD pipelines. Do you have experience with any of these technologies?`;
  } else if (
    userMessage.includes("benefits") ||
    userMessage.includes("perks")
  ) {
    response = `We offer a comprehensive benefits package including health, dental, and vision insurance, flexible working hours, a professional development budget, regular team events, and modern equipment. Work-life balance is important to us. What benefits are most important to you in your next role?`;
  } else if (
    userMessage.includes("interview") ||
    userMessage.includes("process")
  ) {
    response = `Our interview process typically consists of an initial screening call (like this conversation), followed by a technical assessment, then 2-3 interviews with the team and leadership. The entire process usually takes 2-3 weeks. Do you have any specific questions about how we evaluate candidates?`;
  } else if (
    userMessage.includes("hello") ||
    userMessage.includes("hi") ||
    userMessage.includes("hey")
  ) {
    response = `Hello! I'm excited to learn more about you and your interest in the Senior Full Stack Developer position at TechSolutions. Could you tell me a bit about your background and what attracted you to this role?`;
  } else if (
    userMessage.includes("requirements") ||
    userMessage.includes("qualifications")
  ) {
    response = `For this role, we're looking for candidates with:
    
- 5+ years of experience in full stack development
- Strong proficiency in JavaScript/TypeScript, React, and Node.js
- Experience with SQL and NoSQL databases
- Understanding of CI/CD pipelines and DevOps practices
- Knowledge of cloud platforms (AWS, Azure, or GCP)
- Bachelor's degree in Computer Science or equivalent practical experience
- Excellent communication and collaboration skills

How does your experience align with these requirements?`;
  } else {
    response = `Thanks for sharing that information. At TechSolutions, we value both technical skills and cultural fit. The Senior Full Stack Developer role involves working closely with our product and design teams to build scalable web applications.

Can you tell me a bit about your experience with React and Node.js, or any relevant project you've worked on recently?`;
  }

  return {
    id: uuidv4(),
    role: "assistant",
    content: response,
    timestamp: new Date(),
  };
};

export const extractCandidateProfile = (
  messages: Message[]
): CandidateProfile => {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase());
  const allUserContent = userMessages.join(" ");

  const profile: CandidateProfile = {};

  if (allUserContent.includes("name is") || allUserContent.includes("i am ")) {
    const nameMatch = allUserContent.match(/(?:name is|i am) ([a-z]+ [a-z]+)/i);
    if (nameMatch && nameMatch[1]) {
      profile.name = nameMatch[1].trim();
    }
  }

  profile.experience = [];
  if (
    allUserContent.includes("years of experience") ||
    allUserContent.includes("years experience")
  ) {
    const expMatch = allUserContent.match(
      /(\d+)\s*(?:years)(?:\s*of)?\s*experience/i
    );
    if (expMatch && expMatch[1]) {
      profile.experience.push(`${expMatch[1]} years of experience`);
    }
  }

  profile.skills = [];
  const skills = [
    "javascript",
    "typescript",
    "react",
    "node",
    "angular",
    "vue",
    "mongodb",
    "postgresql",
    "sql",
    "nosql",
    "aws",
    "azure",
    "gcp",
    "devops",
    "ci/cd",
  ];
  skills.forEach((skill) => {
    if (allUserContent.includes(skill)) {
      profile.skills.push(skill);
    }
  });

  profile.education = [];
  if (
    allUserContent.includes("degree") ||
    allUserContent.includes("bachelor") ||
    allUserContent.includes("master") ||
    allUserContent.includes("phd")
  ) {
    if (
      allUserContent.includes("computer science") ||
      allUserContent.includes("cs degree")
    ) {
      profile.education.push("Computer Science degree");
    } else if (allUserContent.includes("bachelor")) {
      profile.education.push("Bachelor's degree");
    } else if (allUserContent.includes("master")) {
      profile.education.push("Master's degree");
    } else if (allUserContent.includes("phd")) {
      profile.education.push("PhD");
    }
  }

  profile.interests = [];
  const interests = [
    "frontend",
    "backend",
    "full stack",
    "database",
    "cloud",
    "mobile",
    "web development",
  ];
  interests.forEach((interest) => {
    if (allUserContent.includes(interest)) {
      profile.interests.push(interest);
    }
  });

  return profile;
};
