# Candidate Engagement Chatbot

This project is a Candidate Engagement Chatbot designed to assist in the initial screening of job candidates. It provides a conversational interface for candidates to learn about a job position and share their qualifications, which are then extracted and summarized for recruiters.

---

## Conversation Design Approach

The chatbot is designed to simulate a friendly and professional conversation with candidates. The key principles of the conversation design are:

1. **Natural Flow**: The chatbot asks one question at a time and responds contextually to user inputs.
2. **Information Extraction**: While answering candidate questions, the chatbot subtly gathers information about their skills, experience, and preferences.
3. **Job Details**: The chatbot provides accurate and detailed information about the job, including responsibilities, requirements, and benefits.
4. **Engagement**: The chatbot maintains a conversational tone to keep candidates engaged and comfortable.

---

## How Candidate Information is Extracted and Structured

Candidate information is extracted from the conversation using the `extractCandidateProfile` function in [`mockApi.ts`](src/services/mockApi.ts). Here's how it works:

1. **Message Parsing**: The chatbot analyzes user messages to identify key phrases and patterns (e.g., "I have 5 years of experience in React").
2. **Profile Fields**: The extracted information is structured into the following fields:
   - `name`: Candidate's name.
   - `experience`: Years of experience and relevant roles.
   - `skills`: Technologies and tools mentioned by the candidate.
   - `education`: Degrees or certifications.
   - `interests`: Areas of interest (e.g., frontend, backend).
   - `availability`: Candidate's availability for the role.
   - `strengths`: Highlighted strengths or achievements.
3. **Dynamic Updates**: The profile is updated dynamically as the conversation progresses.

The extracted profile is displayed in the `CandidateSummary` component, providing a concise overview for recruiters.

---

## Technical Decisions and Tradeoffs

### 1. **React for UI**

- **Decision**: React was chosen for its component-based architecture and state management capabilities.
- **Tradeoff**: React requires a learning curve for new developers but offers long-term scalability.

### 2. **Tailwind CSS for Styling**

- **Decision**: Tailwind CSS was used for rapid and consistent styling.
- **Tradeoff**: Tailwind's utility-first approach can lead to verbose class names but simplifies customization.

### 3. **Mock API for Responses**

- **Decision**: A mock API simulates chatbot responses and candidate profile extraction.
- **Tradeoff**: While it simplifies local development, it doesn't replicate real-world AI behavior.

### 4. **TypeScript for Type Safety**

- **Decision**: TypeScript ensures type safety and reduces runtime errors.
- **Tradeoff**: It adds complexity to the development process but improves code maintainability.

### 5. **Vite for Development**

- **Decision**: Vite was chosen for its fast build times and modern tooling.
- **Tradeoff**: It may require additional configuration for complex projects.

---

## Setup Instructions for Running Locally

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Vrajraj27/assignments-fullstack
   cd assignments-fullstack
   ```
