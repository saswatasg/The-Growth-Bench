// Assessment business logic — question bank, scoring, randomization
// 20 questions, all closed-ended (no textboxes), 40 minutes, 2 attempts

import { PASS_THRESHOLD, MAX_ATTEMPTS, TIMER_MINUTES, QUESTION_COUNT } from './training';

export { TIMER_MINUTES, QUESTION_COUNT };

// Question bank — 20 high-quality closed-ended questions
export const QUESTION_BANK = [
  // ═══════════════════════════════════════════════════════════
  // DAY 1: Claude Foundations (7 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: 'q1',
    type: 'single',
    category: 'day1',
    difficulty: 'easy',
    points: 2,
    data: {
      scenario: 'A marketing manager needs to draft 15 product descriptions for a new Shopify collection. Each description must follow a specific brand voice guide and include SEO keywords from a spreadsheet.',
      question: 'Which Claude surface is the best fit for this task?',
      options: [
        { id: 'a', text: 'Claude Chat — one-off prompt per description' },
        { id: 'b', text: 'Claude Projects — upload brand voice + keywords as context, batch generate' },
        { id: 'c', text: 'Claude Desktop — use the desktop app for offline access' },
        { id: 'd', text: 'Claude Code — write a script to auto-generate' },
      ],
      correct: 'b',
      explanation: 'Projects lets you upload the brand voice guide and keyword spreadsheet as persistent context. Each generation inherits that context without re-prompting.',
    },
  },

  {
    id: 'q2',
    type: 'ordering',
    category: 'day1',
    difficulty: 'medium',
    points: 3,
    data: {
      instruction: 'Rank these Claude surfaces from MOST to LEAST suitable for this task: "Analyze a 200-page PDF research report, extract key findings, and create a structured executive summary with action items."',
      items: [
        { id: 'a', text: 'Claude Chat' },
        { id: 'b', text: 'Claude Projects' },
        { id: 'c', text: 'Claude Artifacts' },
        { id: 'd', text: 'Claude Code' },
      ],
      correctOrder: ['b', 'c', 'a', 'd'],
      explanation: 'Projects handles large documents best (persistent context). Artifacts helps structure the output. Chat works for quick extraction. Code is least relevant for this task.',
    },
  },

  {
    id: 'q3',
    type: 'single',
    category: 'day1',
    difficulty: 'easy',
    points: 2,
    data: {
      scenario: 'You want to give Claude persistent context about your company — brand guidelines, product catalog, and customer personas — so every conversation starts with that knowledge.',
      question: 'Which approach achieves this?',
      options: [
        { id: 'a', text: 'Paste the context at the start of every Chat conversation' },
        { id: 'b', text: 'Create a Claude Project and upload the documents as knowledge files' },
        { id: 'c', text: 'Use Claude Desktop and save the files to your local machine' },
        { id: 'd', text: 'Use Claude Code to build a custom knowledge base API' },
      ],
      correct: 'b',
      explanation: 'Projects provide persistent context. Uploaded documents stay available across all conversations in that project — no re-pasting needed.',
    },
  },

  {
    id: 'q4',
    type: 'multi',
    category: 'day1',
    difficulty: 'medium',
    points: 3,
    data: {
      scenario: 'Your team uses Claude for customer support. You want to set up the system correctly from day one.',
      question: 'Which of the following are best practices for responsible AI use in customer support? (Select all that apply)',
      options: [
        { id: 'a', text: 'Let Claude respond to all customer messages without human review' },
        { id: 'b', text: 'Set up a human-review period before AI responses go live' },
        { id: 'c', text: 'Define clear escalation rules for when Claude should hand off to a human' },
        { id: 'd', text: 'Log all AI interactions for quality monitoring' },
        { id: 'e', text: 'Use Claude to handle sensitive complaints without human oversight' },
      ],
      correct: ['b', 'c', 'd'],
      explanation: 'Responsible AI requires human oversight (b), clear escalation rules (c), and logging for quality (d). Letting AI respond without review (a) and handling sensitive complaints without oversight (e) are risky.',
    },
  },

  {
    id: 'q5',
    type: 'single',
    category: 'day1',
    difficulty: 'easy',
    points: 2,
    data: {
      scenario: 'A founder asks: "I keep re-explaining my business context every time I open Claude. What am I doing wrong?"',
      question: 'What is the most likely issue?',
      options: [
        { id: 'a', text: 'They are using Claude Chat instead of Claude Projects' },
        { id: 'b', text: 'They are using the wrong Claude model' },
        { id: 'c', text: 'Their prompts are too short' },
        { id: 'd', text: 'They need to upgrade to a paid plan' },
      ],
      correct: 'a',
      explanation: 'Claude Chat starts fresh each time. Claude Projects preserves context across conversations — brand docs, past discussions, and knowledge files stay loaded.',
    },
  },

  {
    id: 'q6',
    type: 'ordering',
    category: 'day1',
    difficulty: 'hard',
    points: 3,
    data: {
      instruction: 'A D2C brand wants to automate their returns process. Rank these steps from FIRST to LAST in a proper implementation sequence.',
      items: [
        { id: 'a', text: 'Define the returns policy rules and edge cases' },
        { id: 'b', text: 'Build a Claude Skill that processes return requests' },
        { id: 'c', text: 'Test with 10% of live traffic for 2 weeks' },
        { id: 'd', text: 'Upload the returns policy and product catalog to Claude Projects' },
        { id: 'e', text: 'Roll out to 100% of traffic with human-review monitoring' },
      ],
      correctOrder: ['a', 'd', 'b', 'c', 'e'],
      explanation: 'Define rules first (a), then set up context (d), then build the Skill (b), then test at small scale (c), then full rollout (e). Skipping the definition step leads to bad automation.',
    },
  },

  {
    id: 'q7',
    type: 'single',
    category: 'day1',
    difficulty: 'medium',
    points: 2,
    data: {
      scenario: 'A team member says: "I asked Claude to write our Q3 marketing report and it made up revenue numbers."',
      question: 'What is the correct response?',
      options: [
        { id: 'a', text: 'Claude is unreliable and should not be used for reports' },
        { id: 'b', text: 'Claude can hallucinate — always provide real data as context and verify outputs' },
        { id: 'c', text: 'Switch to a different AI model that doesn\'t hallucinate' },
        { id: 'd', text: 'Use Claude Code instead, which has access to real data' },
      ],
      correct: 'b',
      explanation: 'All LLMs can hallucinate. The solution is to provide real data as context (upload to Projects) and verify outputs. Claude is a tool, not an oracle.',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // DAY 2: Skills, Connectors, Automation (7 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: 'q8',
    type: 'single',
    category: 'day2',
    difficulty: 'medium',
    points: 2,
    data: {
      scenario: 'You want Claude to automatically summarize every new blog post published on your WordPress site and send the summary to a Slack channel.',
      question: 'Which approach is MOST appropriate?',
      options: [
        { id: 'a', text: 'Create a Skill that monitors the RSS feed and generates summaries' },
        { id: 'b', text: 'Use Claude Chat and manually paste each blog post' },
        { id: 'c', text: 'Use Scheduled Tasks with a webhook trigger from WordPress' },
        { id: 'd', text: 'Use Claude Code to write a Python script that calls the Claude API' },
      ],
      correct: 'c',
      explanation: 'Scheduled Tasks with a webhook trigger is the most automated approach. Skills are for reusable prompts, not event-driven automation. Manual Chat doesn\'t scale. Claude Code works but is overkill.',
    },
  },

  {
    id: 'q9',
    type: 'multi',
    category: 'day2',
    difficulty: 'hard',
    points: 3,
    data: {
      scenario: 'You are building a Claude Skill for a D2C skincare brand. The Skill needs to handle Instagram DMs about product recommendations.',
      question: 'Which components should the Skill include? (Select all that apply)',
      options: [
        { id: 'a', text: 'Product database with skin type, ingredients, and stock status' },
        { id: 'b', text: 'Brand voice guide for response tone and style' },
        { id: 'c', text: 'Escalation rules for complaints, refunds, and offensive messages' },
        { id: 'd', text: 'Direct access to the brand\'s Shopify admin panel' },
        { id: 'e', text: 'Response templates for common questions (shipping, returns, sizing)' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'A good Skill needs data context (a), brand voice (b), escalation rules (c), and templates (e). Direct Shopify admin access (d) is a security risk and unnecessary for DM responses.',
    },
  },

  {
    id: 'q10',
    type: 'single',
    category: 'day2',
    difficulty: 'medium',
    points: 2,
    data: {
      scenario: 'Your team has built a Claude Skill that categorizes customer emails. It works well for 80% of emails but struggles with ambiguous ones that could fit multiple categories.',
      question: 'What is the best approach to handle this?',
      options: [
        { id: 'a', text: 'Add more categories to cover every edge case' },
        { id: 'b', text: 'Set up a confidence threshold — low-confidence emails go to a human for review' },
        { id: 'c', text: 'Remove the Skill and have humans categorize all emails' },
        { id: 'd', text: 'Switch to a more expensive Claude model' },
      ],
      correct: 'b',
      explanation: 'A confidence threshold is the right approach. The Skill handles the easy 80%, and humans handle the ambiguous 20%. This is the human-AI collaboration pattern.',
    },
  },

  {
    id: 'q11',
    type: 'ordering',
    category: 'day2',
    difficulty: 'medium',
    points: 3,
    data: {
      instruction: 'You are building a custom Claude Skill for automated invoice processing. Rank these implementation steps from FIRST to LAST.',
      items: [
        { id: 'a', text: 'Define the Skill prompt template with clear input/output rules' },
        { id: 'b', text: 'Test with 50 real invoices and measure accuracy' },
        { id: 'c', text: 'Upload your invoice template and extraction rules as context' },
        { id: 'd', text: 'Deploy to production with human-review monitoring' },
        { id: 'e', text: 'Identify edge cases (multi-currency, partial payments, credit notes)' },
      ],
      correctOrder: ['e', 'c', 'a', 'b', 'd'],
      explanation: 'Identify edge cases first (e), then set up context (c), then write the prompt (a), then test (b), then deploy (d). Understanding edge cases before building prevents rework.',
    },
  },

  {
    id: 'q12',
    type: 'single',
    category: 'day2',
    difficulty: 'easy',
    points: 2,
    data: {
      scenario: 'A founder asks: "What\'s the difference between a Claude Skill and a Claude Project?"',
      question: 'Which answer is most accurate?',
      options: [
        { id: 'a', text: 'Skills are reusable prompt templates; Projects are persistent knowledge bases with files and conversations' },
        { id: 'b', text: 'Skills and Projects are the same thing with different names' },
        { id: 'c', text: 'Skills are for developers; Projects are for marketers' },
        { id: 'd', text: 'Skills are free; Projects require a paid plan' },
      ],
      correct: 'a',
      explanation: 'Skills are reusable prompt templates that define how Claude behaves for a specific task. Projects are persistent workspaces with uploaded files, knowledge, and conversation history.',
    },
  },

  {
    id: 'q13',
    type: 'multi',
    category: 'day2',
    difficulty: 'hard',
    points: 3,
    data: {
      scenario: 'You are deploying Claude automation for a D2C brand\'s customer support team. The brand receives 500+ messages daily across WhatsApp and Instagram.',
      question: 'Which deployment considerations are critical? (Select all that apply)',
      options: [
        { id: 'a', text: 'Define clear handoff rules between AI and human agents' },
        { id: 'b', text: 'Start with a pilot on 10% of traffic before full rollout' },
        { id: 'c', text: 'Set up monitoring for response quality and customer satisfaction' },
        { id: 'd', text: 'Replace all human agents immediately to reduce costs' },
        { id: 'e', text: 'Create response templates for the most common question categories' },
        { id: 'f', text: 'Ignore edge cases — they\'re too rare to matter' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Proper deployment requires handoff rules (a), pilot testing (b), quality monitoring (c), and templates (e). Replacing all humans immediately (d) is risky. Ignoring edge cases (f) leads to bad customer experiences.',
    },
  },

  {
    id: 'q14',
    type: 'single',
    category: 'day2',
    difficulty: 'medium',
    points: 2,
    data: {
      scenario: 'A client says: "Our Claude automation works great for English queries but fails badly on Hindi and mixed-language messages."',
      question: 'What is the best approach?',
      options: [
        { id: 'a', text: 'Tell the client to only use English' },
        { id: 'b', text: 'Add language detection to the Skill and include Hindi response templates in the context' },
        { id: 'c', text: 'Build a separate Skill for each language' },
        { id: 'd', text: 'Use a translation API before sending to Claude' },
      ],
      correct: 'b',
      explanation: 'Claude handles multiple languages well — the issue is likely missing context. Adding language detection and Hindi templates to the Skill context is the simplest and most effective fix.',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // DAY 3: MCP, Cost Optimization, Strategy (6 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: 'q15',
    type: 'single',
    category: 'day3',
    difficulty: 'medium',
    points: 2,
    data: {
      scenario: 'Your team uses Notion for project management and Google Sheets for financial tracking. You want Claude to answer questions like "What\'s our current burn rate?" by reading both sources.',
      question: 'What is the right approach?',
      options: [
        { id: 'a', text: 'Copy-paste data from both tools into Claude Chat each time' },
        { id: 'b', text: 'Set up MCP connectors for both Notion and Google Sheets' },
        { id: 'c', text: 'Export everything to PDF and upload to Claude Projects' },
        { id: 'd', text: 'Use Claude Code to build a custom API integration' },
      ],
      correct: 'b',
      explanation: 'MCP connectors let Claude access both tools in real-time without manual data transfer. This is exactly what MCP is designed for.',
    },
  },

  {
    id: 'q16',
    type: 'ordering',
    category: 'day3',
    difficulty: 'hard',
    points: 3,
    data: {
      instruction: 'A client asks: "Should we use Claude Sonnet or Opus for our customer support automation?" Rank these factors from MOST to LEAST important for making this decision.',
      items: [
        { id: 'a', text: 'Response quality and nuance' },
        { id: 'b', text: 'Cost per 1000 queries' },
        { id: 'c', text: 'Response latency' },
        { id: 'd', text: 'Context window size' },
      ],
      correctOrder: ['a', 'b', 'c', 'd'],
      explanation: 'Quality is paramount for customer-facing automation. Cost matters at scale. Latency affects user experience. Context window is least critical for support queries (usually short).',
    },
  },

  {
    id: 'q17',
    type: 'single',
    category: 'day3',
    difficulty: 'medium',
    points: 2,
    data: {
      scenario: 'A team is spending ₹80,000/month on Claude subscriptions across 15 people. Most usage is simple tasks like email drafting and meeting summaries.',
      question: 'Which optimization would have the biggest impact on cost?',
      options: [
        { id: 'a', text: 'Switch everyone to the most expensive model for better quality' },
        { id: 'b', text: 'Use Sonnet for routine tasks and reserve Opus for complex analysis' },
        { id: 'c', text: 'Reduce the number of users to save on seat costs' },
        { id: 'd', text: 'Set shorter context windows for all users' },
      ],
      correct: 'b',
      explanation: 'Model selection is the biggest cost lever. Sonnet handles 80% of tasks well at a fraction of Opus cost. Reserve Opus for complex work that genuinely needs it.',
    },
  },

  {
    id: 'q18',
    type: 'multi',
    category: 'day3',
    difficulty: 'hard',
    points: 3,
    data: {
      scenario: 'Your company is deploying Claude across marketing (5 people), support (3 people), and product (4 people). Budget is ₹50,000/month.',
      question: 'Which deployment strategies are correct? (Select all that apply)',
      options: [
        { id: 'a', text: 'Give every team member the same Claude plan for simplicity' },
        { id: 'b', text: 'Set up team-specific Projects with relevant context files' },
        { id: 'c', text: 'Build Skills for each team\'s most repetitive tasks' },
        { id: 'd', text: 'Measure ROI by tracking time saved and output quality per team' },
        { id: 'e', text: 'Deploy to all teams simultaneously without a pilot' },
      ],
      correct: ['b', 'c', 'd'],
      explanation: 'Smart deployment means team-specific context (b), Skills for repetitive work (c), and ROI tracking (d). One-size-fits-all plans (a) waste money. No-pilot deployment (e) is risky.',
    },
  },

  {
    id: 'q19',
    type: 'single',
    category: 'day3',
    difficulty: 'easy',
    points: 2,
    data: {
      scenario: 'A founder asks: "What is MCP and why should I care?"',
      question: 'Which explanation is most accurate?',
      options: [
        { id: 'a', text: 'MCP is a way to connect Claude to your real tools and data sources in real-time' },
        { id: 'b', text: 'MCP is a new Claude model that\'s faster than Sonnet' },
        { id: 'c', text: 'MCP is a pricing plan for enterprise customers' },
        { id: 'd', text: 'MCP is a security protocol for data encryption' },
      ],
      correct: 'a',
      explanation: 'MCP (Model Context Protocol) connects Claude to external tools and data sources — databases, APIs, spreadsheets, CRMs — so Claude can read and act on real-time data without manual copy-paste.',
    },
  },

  {
    id: 'q20',
    type: 'ordering',
    category: 'day3',
    difficulty: 'medium',
    points: 3,
    data: {
      instruction: 'A company wants to measure the ROI of their Claude deployment. Rank these metrics from MOST to LEAST important for a support team.',
      items: [
        { id: 'a', text: 'Customer satisfaction score (CSAT) after AI-assisted responses' },
        { id: 'b', text: 'Number of tickets resolved per agent per day' },
        { id: 'c', text: 'Cost per resolved ticket' },
        { id: 'd', text: 'Number of Claude queries per day' },
      ],
      correctOrder: ['a', 'b', 'c', 'd'],
      explanation: 'Customer satisfaction (a) is the ultimate metric — quality over quantity. Tickets resolved (b) measures throughput. Cost per ticket (c) measures efficiency. Query count (d) is a usage metric, not a value metric.',
    },
  },
];

// Scoring — all question types are deterministic (no keyword matching)
export function scoreAttempt(questions, answers) {
  let totalScore = 0;
  let totalPossible = 0;

  questions.forEach(q => {
    totalPossible += q.points;
    const answer = answers[q.id];
    if (!answer) return;

    if (q.type === 'single') {
      if (answer === q.data.correct) totalScore += q.points;
    } else if (q.type === 'multi') {
      const correct = new Set(q.data.correct);
      const selected = new Set(answer);
      const matchCount = [...selected].filter(x => correct.has(x)).length;
      const penalty = [...selected].filter(x => !correct.has(x)).length;
      totalScore += Math.max(0, Math.round(q.points * (matchCount / correct.size) - penalty * 0.5));
    } else if (q.type === 'ordering') {
      const correctOrder = q.data.correctOrder;
      const userOrder = answer;
      if (JSON.stringify(correctOrder) === JSON.stringify(userOrder)) {
        totalScore += q.points;
      } else {
        let correctPairs = 0;
        for (let i = 0; i < correctOrder.length - 1; i++) {
          const userI = userOrder.indexOf(correctOrder[i]);
          const userJ = userOrder.indexOf(correctOrder[i + 1]);
          if (userI < userJ) correctPairs++;
        }
        totalScore += Math.round(q.points * (correctPairs / (correctOrder.length - 1)));
      }
    }
  });

  const percentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
  return {
    score: totalScore,
    totalPossible,
    percentage,
    passed: percentage >= PASS_THRESHOLD,
  };
}

// Randomize question order and select subset
export function selectQuestions(count = QUESTION_COUNT) {
  const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Check if participant can take assessment
export function canTakeAssessment(attempts) {
  if (!attempts || attempts.length === 0) return true;
  const completedAttempts = attempts.filter(a => a.status === 'completed');
  return completedAttempts.length < MAX_ATTEMPTS;
}

// Get attempt number
export function getNextAttemptNumber(attempts) {
  if (!attempts || attempts.length === 0) return 1;
  return Math.max(...attempts.map(a => a.attempt_number)) + 1;
}
