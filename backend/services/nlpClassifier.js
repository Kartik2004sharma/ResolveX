const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const CATEGORIES = [
  'ELECTRICAL', 'PLUMBING', 'HVAC', 'INFRASTRUCTURE', 
  'CLEANLINESS', 'SECURITY', 'IT_SUPPORT', 'LIBRARY', 
  'CAFETERIA', 'TRANSPORT', 'OTHER'
];

const PRIORITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

function getPriorityScore(priority) {
  const scores = { CRITICAL: 1, HIGH: 0.75, MEDIUM: 0.5, LOW: 0.25 };
  return scores[priority] || 0.5;
}

async function classifyComplaint(title, description) {
  // If no API key, fallback to a simple dummy logic (or throw an error)
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key missing, falling back to OTHER/MEDIUM');
    return { category: 'OTHER', priority: 'MEDIUM', priorityScore: 0.5 };
  }

  try {
    const text = `Title: ${title}\nDescription: ${description}`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast, inexpensive model for classification
      messages: [
        {
          role: "system",
          content: `You are an AI trained to classify facility complaints for a campus management system. 
You must analyze the Title and Description and output a JSON object with two fields:
- "category": Must be one of exactly: ${CATEGORIES.join(', ')}
- "priority": Must be one of exactly: ${PRIORITIES.join(', ')}

Rules for priority:
- CRITICAL: Life safety, severe hazards (fire, major flood), campus-wide outage.
- HIGH: Blocking work, significant disruption, leaks, major broken items.
- MEDIUM: Standard maintenance requests, AC issues, broken furniture.
- LOW: Aesthetic issues, minor inconveniences, suggestions.

Output ONLY valid JSON with no markdown formatting.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    const category = CATEGORIES.includes(result.category) ? result.category : 'OTHER';
    const priority = PRIORITIES.includes(result.priority) ? result.priority : 'MEDIUM';
    const priorityScore = getPriorityScore(priority);

    return {
      category,
      priority,
      priorityScore
    };
  } catch (error) {
    console.error("OpenAI Classification Error:", error);
    return {
      category: 'OTHER',
      priority: 'MEDIUM',
      priorityScore: 0.5
    };
  }
}

// Stub these to prevent breaking older code or tests that import them
const classifyCategory = async (text) => (await classifyComplaint(text, '')).category;
const classifyPriority = async (text) => (await classifyComplaint(text, '')).priority;

module.exports = { classifyComplaint, classifyCategory, classifyPriority };
