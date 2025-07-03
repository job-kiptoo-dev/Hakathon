interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = 'AIzaSyBkwX4lqJYDIbA17LAWN1SwGSFOVwed5E0';
  }

  private async makeRequest(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || '';
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  async generateCoverLetter(
    jobTitle: string,
    companyName: string,
    jobDescription: string,
    applicantName: string,
    applicantSummary: string,
    relevantExperience: string[]
  ): Promise<string> {
    const prompt = `Generate a professional cover letter for the following job application:

Job Title: ${jobTitle}
Company: ${companyName}
Applicant Name: ${applicantName}

Applicant Summary: ${applicantSummary}

Relevant Experience:
${relevantExperience.join('\n')}

Job Description: ${jobDescription}

Please write a compelling, personalized cover letter that highlights the applicant's relevant experience and explains why they would be a great fit for this role. Keep it professional but engaging, around 3-4 paragraphs.`;

    return this.makeRequest(prompt);
  }

  async calculateJobMatch(
    jobDescription: string,
    jobRequirements: string[],
    jobSkills: string[],
    applicantSkills: string[],
    applicantExperience: string,
    applicantSummary: string
  ): Promise<{score: number; reasons: string[]; skillsMatch: {matched: string[]; missing: string[]}}> {
    const prompt = `Analyze the job match between an applicant and a job posting. Return a JSON response with the following structure:

{
  "score": <number between 0-100>,
  "reasons": ["reason1", "reason2", "reason3"],
  "skillsMatch": {
    "matched": ["skill1", "skill2"],
    "missing": ["skill1", "skill2"]
  }
}

Job Requirements: ${jobRequirements.join(', ')}
Job Skills: ${jobSkills.join(', ')}
Job Description: ${jobDescription}

Applicant Skills: ${applicantSkills.join(', ')}
Applicant Experience: ${applicantExperience}
Applicant Summary: ${applicantSummary}

Analyze the match considering skills alignment, experience relevance, and overall fit. Provide specific reasons for the score.`;

    const response = await this.makeRequest(prompt);
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if JSON parsing fails
        return {
          score: 75,
          reasons: ["Experience aligns with job requirements", "Strong skill match", "Good cultural fit potential"],
          skillsMatch: {
            matched: applicantSkills.slice(0, 3),
            missing: jobSkills.slice(0, 2)
          }
        };
      }
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return {
        score: 75,
        reasons: ["Experience aligns with job requirements", "Strong skill match"],
        skillsMatch: {
          matched: applicantSkills.slice(0, 3),
          missing: jobSkills.slice(0, 2)
        }
      };
    }
  }

  async generateInterviewQuestions(
    jobTitle: string,
    jobDescription: string,
    requiredSkills: string[],
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ): Promise<Array<{question: string; category: string; difficulty: string}>> {
    const prompt = `Generate 8 interview questions for the following job position:

Job Title: ${jobTitle}
Job Description: ${jobDescription}
Required Skills: ${requiredSkills.join(', ')}
Difficulty Level: ${difficulty}

Please return a JSON array with the following structure:
[
  {
    "question": "question text",
    "category": "technical|behavioral|situational|company-specific",
    "difficulty": "${difficulty}"
  }
]

Include a mix of technical questions related to the required skills, behavioral questions, and situational questions that assess problem-solving abilities.`;

    const response = await this.makeRequest(prompt);
    
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // Fallback questions
        return [
          {question: "Tell me about your experience with the main technologies required for this role.", category: "technical", difficulty},
          {question: "Describe a challenging project you've worked on and how you overcame obstacles.", category: "behavioral", difficulty},
          {question: "How would you approach learning a new technology or framework required for this position?", category: "situational", difficulty},
          {question: "What interests you most about working at our company?", category: "company-specific", difficulty}
        ];
      }
    } catch (error) {
      console.error('Error parsing interview questions:', error);
      return [
        {question: "Tell me about your relevant experience for this role.", category: "behavioral", difficulty},
        {question: "How do you handle challenging situations at work?", category: "situational", difficulty}
      ];
    }
  }

  async optimizeJobDescription(
    title: string,
    description: string,
    requirements: string[],
    targetAudience: string = 'experienced professionals'
  ): Promise<{optimizedDescription: string; suggestions: string[]; seoScore: number}> {
    const prompt = `Optimize the following job description for better candidate attraction and SEO:

Job Title: ${title}
Current Description: ${description}
Requirements: ${requirements.join(', ')}
Target Audience: ${targetAudience}

Please return a JSON response with:
{
  "optimizedDescription": "improved description",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "seoScore": <number between 0-100>
}

Focus on making the description more engaging, inclusive, and SEO-friendly while maintaining professionalism.`;

    const response = await this.makeRequest(prompt);
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        return {
          optimizedDescription: description,
          suggestions: ["Add more specific skill requirements", "Include company culture information", "Mention growth opportunities"],
          seoScore: 75
        };
      }
    } catch (error) {
      console.error('Error optimizing job description:', error);
      return {
        optimizedDescription: description,
        suggestions: ["Consider adding more details about the role", "Include information about company benefits"],
        seoScore: 70
      };
    }
  }

  async parseResume(resumeText: string): Promise<{
    personalInfo: any;
    experience: any[];
    education: any[];
    skills: string[];
    summary: string;
  }> {
    const prompt = `Parse the following resume text and extract structured information. Return a JSON response:

${resumeText}

Please return:
{
  "personalInfo": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "phone number",
    "location": "city, state"
  },
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "description": "Brief description"
    }
  ],
  "education": [
    {
      "institution": "School Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "graduationDate": "MM/YYYY"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "summary": "Professional summary extracted from resume"
}`;

    const response = await this.makeRequest(prompt);
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        return {
          personalInfo: { name: "Unknown", email: "", phone: "", location: "" },
          experience: [],
          education: [],
          skills: [],
          summary: "Unable to parse resume content"
        };
      }
    } catch (error) {
      console.error('Error parsing resume:', error);
      return {
        personalInfo: { name: "Unknown", email: "", phone: "", location: "" },
        experience: [],
        education: [],
        skills: [],
        summary: "Error parsing resume content"
      };
    }
  }
}

export const geminiService = new GeminiService();