// Assessment business logic — question bank, scoring, randomization

import { PASS_THRESHOLD, MAX_ATTEMPTS } from './training';

// Question bank — hardcoded for now, can be moved to Supabase later
export const QUESTION_BANK = [
  // Day 1: Foundations
  {
    id: 'q1',
    type: 'decision_tree',
    category: 'day1',
    difficulty: 'easy',
    points: 2,
    data: {
      scenario: 'A marketing manager needs to draft 15 product descriptions for a new Shopify collection. Each description should follow a specific brand voice guide and include SEO keywords from a spreadsheet. Which Claude surface is the best fit for this task?',
      options: [
        { id: 'a', text: 'Claude Chat — one-off prompt per description' },
        { id: 'b', text: 'Claude Projects — upload brand voice + keywords as context, batch generate' },
        { id: 'c', text: 'Claude Desktop — use the desktop app for offline access' },
        { id: 'd', text: 'Claude Code — write a script to auto-generate' },
      ],
      correct: ['b'],
      multiSelect: false,
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
      instruction: 'Rank these Claude surfaces from MOST to LEAST suitable for the following task: "You need to analyze a 200-page PDF research report, extract key findings, and create a structured executive summary with action items."',
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
    type: 'fill_blank',
    category: 'day1',
    difficulty: 'easy',
    points: 2,
    data: {
      template: 'When using Claude for customer support automation, the key principle is that Claude should handle the ___-repetition queries while human agents focus on ___-complexity issues.',
      blanks: [
        { position: 1, correct: ['high', 'low-complexity', 'routine', 'common', 'simple'], placeholder: 'type of queries' },
        { position: 2, correct: ['high', 'complex', 'edge-case', 'sensitive', 'nuanced'], placeholder: 'type of issues' },
      ],
      explanation: 'Claude excels at high-repetition, pattern-based queries. Humans handle high-complexity, nuanced, or sensitive issues.',
    },
  },
  // Day 2: Skills & Automation
  {
    id: 'q4',
    type: 'scenario',
    category: 'day2',
    difficulty: 'hard',
    points: 4,
    data: {
      scenario: 'Your e-commerce client receives 300+ customer emails daily. The team spends 4 hours/day categorizing them into: Order Issues (40%), Product Questions (25%), Returns (20%), Shipping (10%), Other (5%). Each category has a different response template.',
      task: 'Design a Claude Skill that automates this categorization. Describe: (1) What the Skill does, (2) What inputs it needs, (3) What outputs it produces, (4) What edge cases to handle.',
      rubric: [
        'Describes clear input/output specification',
        'Mentions categorization logic or rules',
        'Addresses edge cases (ambiguous emails, multi-category)',
        'Includes human-review step for low-confidence categorizations',
      ],
      maxScore: 4,
    },
  },
  {
    id: 'q5',
    type: 'decision_tree',
    category: 'day2',
    difficulty: 'medium',
    points: 2,
    data: {
      scenario: 'You want Claude to automatically summarize every new blog post published on your WordPress site and send the summary to a Slack channel. Which approach is MOST appropriate?',
      options: [
        { id: 'a', text: 'Create a Skill that monitors the RSS feed and generates summaries' },
        { id: 'b', text: 'Use Claude Chat and manually paste each blog post' },
        { id: 'c', text: 'Use Scheduled Tasks with a webhook trigger from WordPress' },
        { id: 'd', text: 'Use Claude Code to write a Python script that calls the Claude API' },
      ],
      correct: ['c'],
      multiSelect: false,
      explanation: 'Scheduled Tasks with a webhook trigger is the most automated approach. Skills are for reusable prompts, not event-driven automation. Manual Chat doesn\'t scale. Claude Code works but is overkill for this.',
    },
  },
  {
    id: 'q6',
    type: 'simulation',
    category: 'day2',
    difficulty: 'hard',
    points: 4,
    data: {
      context: 'You are building a Claude automation for a D2C brand. The brand sells skincare products and receives 500+ Instagram DMs daily. Most are: "Is this product good for oily skin?" or "What\'s the shipping time?"',
      interactive: true,
      task: 'You have access to the brand\'s product database (a CSV with columns: product_name, skin_type, ingredients, price, stock_status). Design the automation flow.',
      steps: [
        { prompt: 'What data would you upload to Claude Projects as context?', type: 'textarea' },
        { prompt: 'What prompt template would you use for the auto-reply Skill?', type: 'textarea' },
        { prompt: 'What conditions should trigger a handoff to a human agent?', type: 'multi-select', options: ['Complaint about a specific order', 'Request for a refund', 'Question about ingredients', 'Offensive or threatening language', 'Question about shipping times'] },
      ],
      maxScore: 4,
      rubric: [
        'Uploads product CSV + brand voice guide',
        'Skill prompt includes category detection + tone matching',
        'Handoff conditions cover complaints, refunds, offensive language',
      ],
    },
  },
  // Day 3: MCP & Assessment
  {
    id: 'q7',
    type: 'decision_tree',
    category: 'day3',
    difficulty: 'medium',
    points: 2,
    data: {
      scenario: 'Your team uses Notion for project management and Google Sheets for financial tracking. You want Claude to answer questions like "What\'s our current burn rate?" by reading both sources. What\'s the right approach?',
      options: [
        { id: 'a', text: 'Copy-paste data from both tools into Claude Chat each time' },
        { id: 'b', text: 'Set up MCP connectors for both Notion and Google Sheets' },
        { id: 'c', text: 'Export everything to PDF and upload to Claude Projects' },
        { id: 'd', text: 'Use Claude Code to build a custom API integration' },
      ],
      correct: ['b'],
      multiSelect: false,
      explanation: 'MCP connectors let Claude access both tools in real-time without manual data transfer. This is exactly what MCP is designed for.',
    },
  },
  {
    id: 'q8',
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
    id: 'q9',
    type: 'fill_blank',
    category: 'day3',
    difficulty: 'medium',
    points: 2,
    data: {
      template: 'When optimizing token costs, the two biggest levers are: (1) using the right ___ for the task complexity, and (2) keeping your prompts and context ___ focused on what Claude actually needs.',
      blanks: [
        { position: 1, correct: ['model', 'claude model', 'llm', 'ai model'], placeholder: 'what to choose' },
        { position: 2, correct: ['concise', 'tight', 'lean', 'minimal', 'clean', 'short'], placeholder: 'how to trim' },
      ],
      explanation: 'Model selection (Sonnet vs Opus) is the biggest cost lever. Concise prompts and focused context reduce token usage per query.',
    },
  },
  {
    id: 'q10',
    type: 'scenario',
    category: 'day3',
    difficulty: 'hard',
    points: 4,
    data: {
      scenario: 'Your company is deploying Claude across the marketing team (5 people), customer support (3 people), and product team (4 people). Each team has different needs. Budget is ₹50,000/month for Claude subscriptions.',
      task: 'Create a deployment plan: (1) Which Claude plan for each team? (2) What MCP connectors would you set up? (3) What Skills would you build for each team? (4) How would you measure ROI?',
      rubric: [
        'Assigns appropriate plan tiers based on usage patterns',
        'Mentions relevant MCP connectors per team (CRM for support, analytics for marketing)',
        'Lists practical Skills per team category',
        'Defines measurable ROI metrics (time saved, tickets resolved, content produced)',
      ],
      maxScore: 4,
    },
  },
];

// Scoring
export function scoreAttempt(questions, answers) {
  let totalScore = 0;
  let totalPossible = 0;

  questions.forEach(q => {
    totalPossible += q.points;
    const answer = answers[q.id];
    if (!answer) return;

    if (q.type === 'decision_tree') {
      const correct = q.data.correct;
      const selected = Array.isArray(answer) ? answer : [answer];
      if (q.data.multiSelect) {
        const correctSet = new Set(correct);
        const selectedSet = new Set(selected);
        const matchCount = [...selectedSet].filter(x => correctSet.has(x)).length;
        const penalty = [...selectedSet].filter(x => !correctSet.has(x)).length;
        totalScore += Math.max(0, Math.round(q.points * (matchCount / correctSet.size) - penalty * 0.5));
      } else {
        if (correct.includes(answer)) totalScore += q.points;
      }
    } else if (q.type === 'ordering') {
      const correctOrder = q.data.correctOrder;
      const userOrder = answer;
      if (JSON.stringify(correctOrder) === JSON.stringify(userOrder)) {
        totalScore += q.points;
      } else {
        // Partial credit: count adjacent pairs that are correct
        let correctPairs = 0;
        for (let i = 0; i < correctOrder.length - 1; i++) {
          const userI = userOrder.indexOf(correctOrder[i]);
          const userJ = userOrder.indexOf(correctOrder[i + 1]);
          if (userI < userJ) correctPairs++;
        }
        totalScore += Math.round(q.points * (correctPairs / (correctOrder.length - 1)));
      }
    } else if (q.type === 'fill_blank') {
      const blanks = q.data.blanks;
      let correctBlanks = 0;
      blanks.forEach(blank => {
        const userAnswer = (answer[blank.position] || '').trim().toLowerCase();
        if (blank.correct.some(c => userAnswer.includes(c.toLowerCase()))) {
          correctBlanks++;
        }
      });
      totalScore += Math.round(q.points * (correctBlanks / blanks.length));
    } else if (q.type === 'scenario' || q.type === 'simulation') {
      // Auto-score based on rubric keyword matching (simplified)
      const rubric = q.data.rubric || [];
      const answerText = typeof answer === 'string' ? answer : JSON.stringify(answer);
      let matchedCriteria = 0;
      rubric.forEach(criterion => {
        const keywords = criterion.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const matchCount = keywords.filter(k => answerText.toLowerCase().includes(k)).length;
        if (matchCount >= Math.ceil(keywords.length * 0.3)) matchedCriteria++;
      });
      totalScore += Math.round(q.points * (matchedCriteria / Math.max(rubric.length, 1)));
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
export function selectQuestions(count = 10) {
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
