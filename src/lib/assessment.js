// Assessment business logic — 85-question bank, scoring, randomization
// 2 attempts × 20 questions each, 40 minutes, 80% to pass

import { PASS_THRESHOLD, MAX_ATTEMPTS, TIMER_MINUTES, QUESTION_COUNT } from './training';

export { TIMER_MINUTES, QUESTION_COUNT };

// ═══════════════════════════════════════════════════════════════
// QUESTION BANK — 85 well-researched questions
// Day 1: Claude Foundations (30 questions)
// Day 2: Skills, Connectors, Automation (30 questions)
// Day 3: MCP, Cost Optimization, Strategy (25 questions)
// ═══════════════════════════════════════════════════════════════

export const QUESTION_BANK = [

  // ─────────────────────────────────────────────────────────────
  // DAY 1: CLAUDE FOUNDATIONS (30 questions)
  // ─────────────────────────────────────────────────────────────

  {
    id: 'd1-01', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      scenario: 'A marketing manager needs to draft 15 product descriptions for a new Shopify collection. Each must follow a specific brand voice guide and include SEO keywords from a spreadsheet.',
      question: 'Which Claude surface is the best fit?',
      options: [
        { id: 'a', text: 'Claude Chat — one-off prompt per description' },
        { id: 'b', text: 'Claude Projects — upload brand voice + keywords as context' },
        { id: 'c', text: 'Claude Desktop — use the desktop app for offline access' },
        { id: 'd', text: 'Claude Code — write a script to auto-generate' },
      ],
      correct: 'b',
      explanation: 'Projects lets you upload documents as persistent context. Each generation inherits brand voice and keywords without re-prompting.',
    },
  },
  {
    id: 'd1-02', type: 'ordering', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank these Claude surfaces from MOST to LEAST suitable: "Analyze a 200-page PDF, extract key findings, and create a structured executive summary."',
      items: [
        { id: 'a', text: 'Claude Chat' },
        { id: 'b', text: 'Claude Projects' },
        { id: 'c', text: 'Claude Artifacts' },
        { id: 'd', text: 'Claude Code' },
      ],
      correctOrder: ['b', 'c', 'a', 'd'],
      explanation: 'Projects handles large documents best (persistent context). Artifacts structures the output. Chat works for quick extraction. Code is least relevant.',
    },
  },
  {
    id: 'd1-03', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      scenario: 'You want Claude to remember your company\'s brand guidelines, product catalog, and customer personas across every conversation.',
      question: 'Which approach achieves this?',
      options: [
        { id: 'a', text: 'Paste the context at the start of every Chat conversation' },
        { id: 'b', text: 'Create a Claude Project and upload the documents as knowledge files' },
        { id: 'c', text: 'Use Claude Desktop and save files to your local machine' },
        { id: 'd', text: 'Use Claude Code to build a custom knowledge base' },
      ],
      correct: 'b',
      explanation: 'Projects provide persistent context. Uploaded documents stay available across all conversations in that project.',
    },
  },
  {
    id: 'd1-04', type: 'multi', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      scenario: 'Your team uses Claude for customer support. You want to set up the system correctly from day one.',
      question: 'Which are best practices for responsible AI in customer support?',
      options: [
        { id: 'a', text: 'Let Claude respond to all messages without human review' },
        { id: 'b', text: 'Set up a human-review period before AI responses go live' },
        { id: 'c', text: 'Define clear escalation rules for when Claude should hand off to a human' },
        { id: 'd', text: 'Log all AI interactions for quality monitoring' },
        { id: 'e', text: 'Use Claude to handle sensitive complaints without human oversight' },
      ],
      correct: ['b', 'c', 'd'],
      explanation: 'Responsible AI requires human oversight (b), clear escalation rules (c), and logging (d). No review (a) and unsupervised complaints (e) are risky.',
    },
  },
  {
    id: 'd1-05', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
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
      explanation: 'Chat starts fresh each time. Projects preserve context — brand docs, past discussions, and knowledge files stay loaded.',
    },
  },
  {
    id: 'd1-06', type: 'ordering', category: 'day1', difficulty: 'hard', points: 3,
    data: {
      instruction: 'A D2C brand wants to automate their returns process. Rank these steps from FIRST to LAST.',
      items: [
        { id: 'a', text: 'Define the returns policy rules and edge cases' },
        { id: 'b', text: 'Build a Claude Skill that processes return requests' },
        { id: 'c', text: 'Test with 10% of live traffic for 2 weeks' },
        { id: 'd', text: 'Upload the returns policy and product catalog to Claude Projects' },
        { id: 'e', text: 'Roll out to 100% of traffic with human-review monitoring' },
      ],
      correctOrder: ['a', 'd', 'b', 'c', 'e'],
      explanation: 'Define rules first (a), set up context (d), build the Skill (b), test small (c), then full rollout (e).',
    },
  },
  {
    id: 'd1-07', type: 'single', category: 'day1', difficulty: 'medium', points: 2,
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
      explanation: 'All LLMs can hallucinate. The solution is to provide real data as context and verify outputs.',
    },
  },
  {
    id: 'd1-08', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      question: 'What is Claude Projects?',
      options: [
        { id: 'a', text: 'A project management tool built by Anthropic' },
        { id: 'b', text: 'A persistent workspace with uploaded files, custom instructions, and conversation context' },
        { id: 'c', text: 'A coding environment for building Claude integrations' },
        { id: 'd', text: 'A mobile app for accessing Claude on the go' },
      ],
      correct: 'b',
      explanation: 'Projects are persistent workspaces with custom instructions, reference files, and accumulated conversation context.',
    },
  },
  {
    id: 'd1-09', type: 'multi', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      question: 'What can Claude Artifacts create?',
      options: [
        { id: 'a', text: 'Code and React components' },
        { id: 'b', text: 'HTML pages and SVG graphics' },
        { id: 'c', text: 'Downloadable .docx, .pptx, .xlsx files' },
        { id: 'd', text: 'Machine learning models' },
        { id: 'e', text: 'Mermaid diagrams and Markdown documents' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Artifacts can create code, HTML, SVG, diagrams, documents, and downloadable files. Claude does not create ML models.',
    },
  },
  {
    id: 'd1-10', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      question: 'What is included in Claude\'s Free tier?',
      options: [
        { id: 'a', text: 'Chat, Artifacts, web search, image analysis, Memory, Skills' },
        { id: 'b', text: 'Everything in Pro plus API access' },
        { id: 'c', text: 'Only basic Chat with limited messages' },
        { id: 'd', text: 'Chat, Projects, and Claude Code' },
      ],
      correct: 'a',
      explanation: 'Free tier includes chat, Artifacts, web search, image/file analysis, Memory, Skills, Connectors, voice mode, and incognito chats.',
    },
  },
  {
    id: 'd1-11', type: 'single', category: 'day1', difficulty: 'medium', points: 2,
    data: {
      scenario: 'A developer needs to refactor a React component across 5 files and run tests.',
      question: 'Which Claude surface should they use?',
      options: [
        { id: 'a', text: 'Claude Chat — describe the changes needed' },
        { id: 'b', text: 'Claude Artifacts — create the new component' },
        { id: 'c', text: 'Claude Code — multi-file editing with terminal access' },
        { id: 'd', text: 'Claude Desktop — use the native app' },
      ],
      correct: 'c',
      explanation: 'Claude Code is built for multi-file editing, code generation, refactoring, and running terminal commands.',
    },
  },
  {
    id: 'd1-12', type: 'ordering', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank Claude plans from cheapest to most expensive.',
      items: [
        { id: 'a', text: 'Pro ($20/month)' },
        { id: 'b', text: 'Free ($0)' },
        { id: 'c', text: 'Max 5x ($100/month)' },
        { id: 'd', text: 'Team Standard ($25/seat/month)' },
      ],
      correctOrder: ['b', 'a', 'd', 'c'],
      explanation: 'Free ($0) < Pro ($20) < Team Standard ($25/seat) < Max 5x ($100).',
    },
  },
  {
    id: 'd1-13', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      question: 'What does Claude NOT generate?',
      options: [
        { id: 'a', text: 'Text and code' },
        { id: 'b', text: 'Images (it only analyzes/reads them)' },
        { id: 'c', text: 'PDF documents' },
        { id: 'd', text: 'Spreadsheets' },
      ],
      correct: 'b',
      explanation: 'Claude does not generate images — it only analyzes and reads them. It can create text, code, documents, and data files.',
    },
  },
  {
    id: 'd1-14', type: 'multi', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      question: 'What components make up a Claude Project?',
      options: [
        { id: 'a', text: 'Custom instructions (standing directions)' },
        { id: 'b', text: 'Reference files (uploaded documents)' },
        { id: 'c', text: 'Accumulated conversation context' },
        { id: 'd', text: 'A built-in code editor' },
        { id: 'e', text: 'Shared access for team collaboration (Team/Enterprise)' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Projects have custom instructions, reference files, conversation context, and sharing (Team/Enterprise). No built-in code editor.',
    },
  },
  {
    id: 'd1-15', type: 'single', category: 'day1', difficulty: 'medium', points: 2,
    data: {
      scenario: 'A support agent asks: "Claude gave a customer the wrong return policy. How do we prevent this?"',
      question: 'What is the best approach?',
      options: [
        { id: 'a', text: 'Stop using Claude for support entirely' },
        { id: 'b', text: 'Upload the correct return policy to the Project and add a human-review step' },
        { id: 'c', text: 'Tell Claude to "never make mistakes"' },
        { id: 'd', text: 'Switch to a different AI model' },
      ],
      correct: 'b',
      explanation: 'The fix is context (upload correct policy) plus process (human review). Prompts alone can\'t prevent errors.',
    },
  },
  {
    id: 'd1-16', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      question: 'What is Claude Cowork?',
      options: [
        { id: 'a', text: 'A collaborative workspace with local file access and sub-agents' },
        { id: 'b', text: 'A Slack integration for team messaging' },
        { id: 'c', text: 'A coding environment for developers' },
        { id: 'd', text: 'A customer support platform' },
      ],
      correct: 'a',
      explanation: 'Cowork brings Claude Code\'s agentic capabilities to Desktop for knowledge work — direct file access, sub-agents, professional outputs, scheduled tasks.',
    },
  },
  {
    id: 'd1-17', type: 'multi', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      question: 'What can Claude Desktop scheduled tasks do?',
      options: [
        { id: 'a', text: 'Generate recurring reports on a schedule' },
        { id: 'b', text: 'Monitor data sources and alert on changes' },
        { id: 'c', text: 'Send automated follow-up emails' },
        { id: 'd', text: 'Make phone calls to customers' },
        { id: 'e', text: 'Run while the Desktop app is open and computer is awake' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Scheduled tasks can generate reports, monitor data, and send follow-ups. They require the Desktop app to be open. Claude cannot make phone calls.',
    },
  },
  {
    id: 'd1-18', type: 'single', category: 'day1', difficulty: 'medium', points: 2,
    data: {
      question: 'What is the difference between Claude Chat and Claude Projects?',
      options: [
        { id: 'a', text: 'Chat starts fresh each time; Projects preserve context across conversations' },
        { id: 'b', text: 'Chat is for text; Projects are for code' },
        { id: 'c', text: 'Chat is free; Projects require a paid plan' },
        { id: 'd', text: 'They are the same feature with different names' },
      ],
      correct: 'a',
      explanation: 'Chat starts with no memory of previous conversations. Projects maintain uploaded files, custom instructions, and conversation history.',
    },
  },
  {
    id: 'd1-19', type: 'ordering', category: 'day1', difficulty: 'hard', points: 3,
    data: {
      instruction: 'A D2C brand wants to set up Claude for their entire operation. Rank these by implementation priority.',
      items: [
        { id: 'a', text: 'Customer support automation (highest ROI)' },
        { id: 'b', text: 'Content generation for product descriptions' },
        { id: 'c', text: 'Internal reporting and analytics' },
        { id: 'd', text: 'Sales email personalization' },
      ],
      correctOrder: ['a', 'b', 'c', 'd'],
      explanation: 'Support automation has the highest ROI and volume. Content generation scales next. Internal reporting is important but lower urgency. Sales emails are last.',
    },
  },
  {
    id: 'd1-20', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      question: 'What is Claude\'s context window?',
      options: [
        { id: 'a', text: 'The maximum amount of text Claude can process in one conversation' },
        { id: 'b', text: 'The time Claude takes to respond' },
        { id: 'c', text: 'The number of conversations Claude can remember' },
        { id: 'd', text: 'The size of files Claude can upload' },
      ],
      correct: 'a',
      explanation: 'The context window is the total amount of text (input + output) Claude can handle in a single conversation turn.',
    },
  },
  {
    id: 'd1-21', type: 'multi', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      question: 'What data formats can Claude analyze?',
      options: [
        { id: 'a', text: 'Text documents and PDFs' },
        { id: 'b', text: 'Images (charts, screenshots, photos)' },
        { id: 'c', text: 'Spreadsheets and CSV files' },
        { id: 'd', text: 'Audio and video files' },
        { id: 'e', text: 'Source code files' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Claude analyzes text, images, spreadsheets, and code. It cannot process audio or video files.',
    },
  },
  {
    id: 'd1-22', type: 'single', category: 'day1', difficulty: 'medium', points: 2,
    data: {
      question: 'When should you use Claude Desktop instead of claude.ai?',
      options: [
        { id: 'a', text: 'When you need Cowork, scheduled tasks, or computer use capabilities' },
        { id: 'b', text: 'When you want faster responses' },
        { id: 'c', text: 'When you need to use a different model' },
        { id: 'd', text: 'Desktop and web are identical in features' },
      ],
      correct: 'a',
      explanation: 'Desktop adds Cowork (local file access, sub-agents), scheduled tasks, and computer use (beta). Web has all other features.',
    },
  },
  {
    id: 'd1-23', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      question: 'What is the CLAUDE.md file?',
      options: [
        { id: 'a', text: 'Project-specific instructions loaded every Claude Code session' },
        { id: 'b', text: 'A configuration file for Claude Desktop' },
        { id: 'c', text: 'A file that stores conversation history' },
        { id: 'd', text: 'A billing configuration file' },
      ],
      correct: 'a',
      explanation: 'CLAUDE.md contains coding standards, architecture decisions, and preferred libraries. It loads automatically at the start of every Claude Code session.',
    },
  },
  {
    id: 'd1-24', type: 'ordering', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank these steps for setting up a new Claude Project from FIRST to LAST.',
      items: [
        { id: 'a', text: 'Start conversations using the project context' },
        { id: 'b', text: 'Upload reference files (brand guidelines, product data)' },
        { id: 'c', text: 'Create a new Project in Claude' },
        { id: 'd', text: 'Set custom instructions (tone, rules, constraints)' },
      ],
      correctOrder: ['c', 'd', 'b', 'a'],
      explanation: 'Create project first (c), set instructions (d), upload files (b), then start conversations (a).',
    },
  },
  {
    id: 'd1-25', type: 'single', category: 'day1', difficulty: 'medium', points: 2,
    data: {
      scenario: 'A team member asks: "Claude handles English well but struggles with Hindi messages. What should we do?"',
      question: 'What is the best approach?',
      options: [
        { id: 'a', text: 'Tell customers to only use English' },
        { id: 'b', text: 'Add language detection and Hindi response templates to the Skill context' },
        { id: 'c', text: 'Build a separate Skill for each language' },
        { id: 'd', text: 'Use a translation API before sending to Claude' },
      ],
      correct: 'b',
      explanation: 'Claude handles multiple languages — the issue is likely missing context. Adding language detection and Hindi templates is the simplest fix.',
    },
  },
  {
    id: 'd1-26', type: 'multi', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      question: 'What can Claude Mobile do?',
      options: [
        { id: 'a', text: 'Start Cowork tasks that continue in the cloud (beta)' },
        { id: 'b', text: 'Send tasks to execute on your desktop via Dispatch' },
        { id: 'c', text: 'Access Claude Code via mobile browser' },
        { id: 'd', text: 'Generate images on the go' },
        { id: 'e', text: 'Connect to interactive apps (live charts, diagrams)' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Mobile supports Cowork (beta), Dispatch, Code via browser, and interactive apps. Claude does not generate images.',
    },
  },
  {
    id: 'd1-27', type: 'single', category: 'day1', difficulty: 'easy', points: 2,
    data: {
      question: 'What is Dispatch on Claude Mobile?',
      options: [
        { id: 'a', text: 'Send Cowork tasks from your phone, execute on your desktop' },
        { id: 'b', text: 'A customer support chatbot' },
        { id: 'c', text: 'A file sharing feature' },
        { id: 'd', text: 'A team messaging tool' },
      ],
      correct: 'a',
      explanation: 'Dispatch pairs the mobile app with Desktop — send tasks from your phone that execute on your computer.',
    },
  },
  {
    id: 'd1-28', type: 'single', category: 'day1', difficulty: 'medium', points: 2,
    data: {
      question: 'What\'s the key difference between Claude Pro and Free plans?',
      options: [
        { id: 'a', text: 'Pro adds Claude Code, Cowork, Projects, Research, and 5x usage' },
        { id: 'b', text: 'Pro has a faster response time' },
        { id: 'c', text: 'Pro gives access to a different model' },
        { id: 'd', text: 'Pro removes all usage limits' },
      ],
      correct: 'a',
      explanation: 'Pro adds Claude Code, Cowork, Design, Projects, Research mode, and 5x usage limits. Same models available.',
    },
  },
  {
    id: 'd1-29', type: 'multi', category: 'day1', difficulty: 'hard', points: 3,
    data: {
      question: 'What are the risks of using Free/Pro Claude plans for work data?',
      options: [
        { id: 'a', text: 'No DPA (Data Processing Agreement) — not appropriate for personal information' },
        { id: 'b', text: 'Data may be used to improve Claude (unless you opt out)' },
        { id: 'c', text: 'Claude will share your data with competitors' },
        { id: 'd', text: 'No enterprise security features (SSO, audit logs, RBAC)' },
      ],
      correct: ['a', 'b', 'd'],
      explanation: 'Free/Pro plans lack DPAs and enterprise security. Data may be used for training. Claude does not share data with competitors.',
    },
  },
  {
    id: 'd1-30', type: 'ordering', category: 'day1', difficulty: 'medium', points: 3,
    data: {
      instruction: 'A D2C brand wants to use Claude across their operation. Rank these use cases by typical ROI.',
      items: [
        { id: 'a', text: 'Customer support automation (300+ tickets/day)' },
        { id: 'b', text: 'Product content generation (500 SKUs)' },
        { id: 'c', text: 'Internal reporting and analytics' },
        { id: 'd', text: 'Sales email personalization' },
      ],
      correctOrder: ['a', 'b', 'c', 'd'],
      explanation: 'Support automation has the highest volume and cost savings. Content generation scales next. Reporting is important but lower volume. Sales emails are last.',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // DAY 2: SKILLS, CONNECTORS, AUTOMATION (30 questions)
  // ─────────────────────────────────────────────────────────────

  {
    id: 'd2-01', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'What is a Claude Skill?',
      options: [
        { id: 'a', text: 'A reusable package of instructions, metadata, and optional resources' },
        { id: 'b', text: 'A paid add-on for Claude Pro users' },
        { id: 'c', text: 'A type of MCP connector' },
        { id: 'd', text: 'A coding framework for building AI apps' },
      ],
      correct: 'a',
      explanation: 'A Skill is a reusable package containing a SKILL.md file with instructions, plus optional supporting files, scripts, and dependencies.',
    },
  },
  {
    id: 'd2-02', type: 'multi', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      question: 'What components can a Claude Skill include?',
      options: [
        { id: 'a', text: 'SKILL.md with instructions and metadata' },
        { id: 'b', text: 'Supporting reference files' },
        { id: 'c', text: 'Executable scripts (Python, JavaScript, Bash)' },
        { id: 'd', text: 'A built-in database' },
        { id: 'e', text: 'Dependencies declaration' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Skills can include SKILL.md, reference files, executable scripts, and dependency declarations. No built-in database.',
    },
  },
  {
    id: 'd2-03', type: 'single', category: 'day2', difficulty: 'easy', points: 2,
    data: {
      question: 'What goes in a SKILL.md frontmatter?',
      options: [
        { id: 'a', text: 'Name and description (required)' },
        { id: 'b', text: 'Only the skill name' },
        { id: 'c', text: 'The full instruction set' },
        { id: 'd', text: 'API keys and credentials' },
      ],
      correct: 'a',
      explanation: 'SKILL.md requires `name` and `description` in YAML frontmatter. Description is strongly recommended for routing.',
    },
  },
  {
    id: 'd2-04', type: 'ordering', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank these steps for creating a Skill from FIRST to LAST.',
      items: [
        { id: 'a', text: 'Add supporting files and scripts if needed' },
        { id: 'b', text: 'Write SKILL.md with clear instructions' },
        { id: 'c', text: 'Test the Skill incrementally' },
        { id: 'd', text: 'Define the Skill\'s purpose and scope' },
      ],
      correctOrder: ['d', 'b', 'a', 'c'],
      explanation: 'Define purpose first (d), write instructions (b), add supporting files (a), then test (c).',
    },
  },
  {
    id: 'd2-05', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'How does progressive disclosure work for Skills?',
      options: [
        { id: 'a', text: 'Only name and description load at startup; full body loads when the task matches' },
        { id: 'b', text: 'Skills load completely every time Claude starts' },
        { id: 'c', text: 'Skills are only loaded when explicitly called by the user' },
        { id: 'd', text: 'Skills are embedded in every conversation automatically' },
      ],
      correct: 'a',
      explanation: 'Progressive disclosure means only lightweight metadata loads initially. The full Skill body loads only when Claude determines the task matches.',
    },
  },
  {
    id: 'd2-06', type: 'multi', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      question: 'Where can Claude Skills be stored?',
      options: [
        { id: 'a', text: 'Personal: ~/.claude/skills/ (available in every project)' },
        { id: 'b', text: 'Project: .claude/skills/ (only that repository)' },
        { id: 'c', text: 'Plugin: bundled inside an installed plugin' },
        { id: 'd', text: 'Enterprise: pushed via managed settings' },
        { id: 'e', text: 'Cloud: stored on Anthropic\'s servers' },
      ],
      correct: ['a', 'b', 'c', 'd'],
      explanation: 'Skills can be stored in personal, project, plugin, or enterprise locations. They are not stored on Anthropic\'s cloud servers.',
    },
  },
  {
    id: 'd2-07', type: 'single', category: 'day2', difficulty: 'easy', points: 2,
    data: {
      question: 'What is the priority order for Skill loading?',
      options: [
        { id: 'a', text: 'Enterprise > Personal > Project > Bundled' },
        { id: 'b', text: 'Project > Personal > Enterprise > Bundled' },
        { id: 'c', text: 'Personal > Project > Enterprise > Bundled' },
        { id: 'd', text: 'All load equally' },
      ],
      correct: 'a',
      explanation: 'Enterprise skills take priority, then personal, then project-specific, then bundled skills.',
    },
  },
  {
    id: 'd2-08', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'How do you share Skills across a team?',
      options: [
        { id: 'a', text: 'Upload as ZIP via Settings > Skills, or push via Enterprise settings' },
        { id: 'b', text: 'Email the SKILL.md file to team members' },
        { id: 'c', text: 'Skills are automatically shared with all team members' },
        { id: 'd', text: 'Post the Skill on a public marketplace' },
      ],
      correct: 'a',
      explanation: 'Skills can be uploaded as ZIP files via Settings > Skills on claude.ai, or pushed through Enterprise managed settings.',
    },
  },
  {
    id: 'd2-09', type: 'multi', category: 'day2', difficulty: 'hard', points: 3,
    data: {
      question: 'What are best practices for Skill design?',
      options: [
        { id: 'a', text: 'Keep it focused — create separate Skills for different workflows' },
        { id: 'b', text: 'Write clear descriptions that act as routing rules' },
        { id: 'c', text: 'Include example inputs and outputs' },
        { id: 'd', text: 'Make one large Skill that handles everything' },
        { id: 'e', text: 'Test incrementally after each significant change' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Focused Skills compose better than one large Skill. Clear descriptions help routing. Examples improve accuracy. Test incrementally.',
    },
  },
  {
    id: 'd2-10', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'What is the lean SKILL.md pattern?',
      options: [
        { id: 'a', text: 'Keep SKILL.md short, point to a separate facts/reference file' },
        { id: 'b', text: 'Use the minimum number of words possible' },
        { id: 'c', text: 'Remove all examples from the Skill' },
        { id: 'd', text: 'Only use frontmatter, no body content' },
      ],
      correct: 'a',
      explanation: 'The lean pattern keeps SKILL.md focused on routing and core instructions, with detailed reference material in separate files.',
    },
  },
  {
    id: 'd2-11', type: 'single', category: 'day2', difficulty: 'easy', points: 2,
    data: {
      question: 'What are Claude Scheduled Tasks?',
      options: [
        { id: 'a', text: 'Recurring or on-demand tasks that run in Claude Desktop' },
        { id: 'b', text: 'A feature for scheduling meetings' },
        { id: 'c', text: 'A way to schedule Claude model updates' },
        { id: 'd', text: 'A calendar integration feature' },
      ],
      correct: 'a',
      explanation: 'Scheduled Tasks are recurring or on-demand tasks that run in Claude Desktop while the app is open and the computer is awake.',
    },
  },
  {
    id: 'd2-12', type: 'multi', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      question: 'What can Scheduled Tasks access?',
      options: [
        { id: 'a', text: 'MCP connectors configured in Claude' },
        { id: 'b', text: 'Installed Skills' },
        { id: 'c', text: 'Plugins' },
        { id: 'd', text: 'Local files on your machine' },
        { id: 'e', text: 'Other people\'s computers' },
      ],
      correct: ['a', 'b', 'c', 'd'],
      explanation: 'Tasks run as their own Cowork session with access to connectors, skills, plugins, and local files. They cannot access other computers.',
    },
  },
  {
    id: 'd2-13', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'What are Claude Routines?',
      options: [
        { id: 'a', text: 'Saved Claude Code configurations that run automatically on cloud infrastructure' },
        { id: 'b', text: 'Daily standup meetings with Claude' },
        { id: 'c', text: 'A feature for organizing conversations' },
        { id: 'd', text: 'A way to schedule model training' },
      ],
      correct: 'a',
      explanation: 'Routines are saved Claude Code configurations (prompt + repos + connectors) that run on Anthropic\'s cloud — work continues when your laptop is closed.',
    },
  },
  {
    id: 'd2-14', type: 'ordering', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank Routine trigger types from most to least automated.',
      items: [
        { id: 'a', text: 'API endpoint (on-demand HTTP trigger)' },
        { id: 'b', text: 'Scheduled (time-based, recurring)' },
        { id: 'c', text: 'GitHub webhook (event-driven on PR/release)' },
      ],
      correctOrder: ['b', 'c', 'a'],
      explanation: 'Scheduled runs automatically on a timer (most automated). GitHub triggers on events. API requires an explicit HTTP call (least automated).',
    },
  },
  {
    id: 'd2-15', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'How many daily Routines are allowed on the Pro plan?',
      options: [
        { id: 'a', text: '5' },
        { id: 'b', text: '10' },
        { id: 'c', text: '15' },
        { id: 'd', text: 'Unlimited' },
      ],
      correct: 'a',
      explanation: 'Pro allows 5 daily Routines. Max allows 15. Team/Enterprise allows 25.',
    },
  },
  {
    id: 'd2-16', type: 'multi', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      question: 'What can trigger a Claude Routine?',
      options: [
        { id: 'a', text: 'A time-based schedule (hourly, daily, weekly)' },
        { id: 'b', text: 'An API endpoint with bearer token' },
        { id: 'c', text: 'A GitHub webhook (PR or release event)' },
        { id: 'd', text: 'A Slack message' },
        { id: 'e', text: 'A manual trigger from the Claude app' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Routines can be triggered by schedule, API, GitHub webhook, or manually. Slack messages are not a trigger type.',
    },
  },
  {
    id: 'd2-17', type: 'single', category: 'day2', difficulty: 'easy', points: 2,
    data: {
      question: 'What does the GitHub webhook trigger filter on?',
      options: [
        { id: 'a', text: 'PR author, title, body, branch, labels, draft/merged status' },
        { id: 'b', text: 'Only the PR title' },
        { id: 'c', text: 'Only the branch name' },
        { id: 'd', text: 'Only the file changes' },
      ],
      correct: 'a',
      explanation: 'GitHub webhooks can filter on author, title, body, base/head branch, labels, draft status, merged status, and fork status.',
    },
  },
  {
    id: 'd2-18', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'What is the branch safety rule for Routines?',
      options: [
        { id: 'a', text: 'Routines can only push to claude/-prefixed branches by default' },
        { id: 'b', text: 'Routines can push to any branch' },
        { id: 'c', text: 'Routines cannot push to any branch' },
        { id: 'd', text: 'Routines can only push to the main branch' },
      ],
      correct: 'a',
      explanation: 'By default, Routines can only push to branches prefixed with claude/. This prevents accidental pushes to main or production branches.',
    },
  },
  {
    id: 'd2-19', type: 'multi', category: 'day2', difficulty: 'hard', points: 3,
    data: {
      question: 'Which are real-world automation patterns for Claude?',
      options: [
        { id: 'a', text: 'Backlog maintenance: nightly issue labeling and assignment' },
        { id: 'b', text: 'Alert triage: monitoring tool triggers investigation and draft PR' },
        { id: 'c', text: 'Code review: GitHub trigger applies team checklist on PR' },
        { id: 'd', text: 'Deploy verification: post-deploy smoke checks and error scanning' },
        { id: 'e', text: 'Automatic model training on company data' },
      ],
      correct: ['a', 'b', 'c', 'd'],
      explanation: 'These are all documented Claude automation patterns. Claude does not train on company data.',
    },
  },
  {
    id: 'd2-20', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'What are Claude Managed Agents?',
      options: [
        { id: 'a', text: 'Scheduled deployments via API that run on cron schedules' },
        { id: 'b', text: 'Human agents who manage Claude instances' },
        { id: 'c', text: 'A customer support feature' },
        { id: 'd', text: 'A way to manage team access to Claude' },
      ],
      correct: 'a',
      explanation: 'Managed Agents are scheduled deployments via the Deployments API that run agents on recurring cron schedules.',
    },
  },
  {
    id: 'd2-21', type: 'single', category: 'day2', difficulty: 'easy', points: 2,
    data: {
      question: 'What is the maximum number of scheduled deployments per organization?',
      options: [
        { id: 'a', text: '1,000' },
        { id: 'b', text: '100' },
        { id: 'c', text: '10,000' },
        { id: 'd', text: 'Unlimited' },
      ],
      correct: 'a',
      explanation: 'Maximum 1,000 scheduled deployments per organization.',
    },
  },
  {
    id: 'd2-22', type: 'multi', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      scenario: 'You are building a Claude Skill for a D2C skincare brand to handle Instagram DMs about product recommendations.',
      question: 'What should the Skill include?',
      options: [
        { id: 'a', text: 'Product database with skin type, ingredients, and stock status' },
        { id: 'b', text: 'Brand voice guide for response tone and style' },
        { id: 'c', text: 'Escalation rules for complaints, refunds, and offensive messages' },
        { id: 'd', text: 'Direct access to the brand\'s Shopify admin panel' },
        { id: 'e', text: 'Response templates for common questions' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'A good Skill needs data (a), voice (b), escalation rules (c), and templates (e). Direct Shopify admin access (d) is a security risk.',
    },
  },
  {
    id: 'd2-23', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      scenario: 'Your Skill categorizes customer emails well for 80% but struggles with ambiguous ones.',
      question: 'What is the best approach?',
      options: [
        { id: 'a', text: 'Add more categories to cover every edge case' },
        { id: 'b', text: 'Set up a confidence threshold — low-confidence emails go to a human' },
        { id: 'c', text: 'Remove the Skill and have humans categorize all emails' },
        { id: 'd', text: 'Switch to a more expensive Claude model' },
      ],
      correct: 'b',
      explanation: 'A confidence threshold lets the Skill handle easy cases and humans handle ambiguous ones. This is the human-AI collaboration pattern.',
    },
  },
  {
    id: 'd2-24', type: 'ordering', category: 'day2', difficulty: 'hard', points: 3,
    data: {
      instruction: 'Rank these steps for building an invoice processing Skill.',
      items: [
        { id: 'a', text: 'Test with 50 real invoices and measure accuracy' },
        { id: 'b', text: 'Identify edge cases (multi-currency, partial payments, credit notes)' },
        { id: 'c', text: 'Deploy to production with human-review monitoring' },
        { id: 'd', text: 'Write the Skill prompt template with clear input/output rules' },
        { id: 'e', text: 'Upload invoice template and extraction rules as context' },
      ],
      correctOrder: ['b', 'e', 'd', 'a', 'c'],
      explanation: 'Identify edge cases first (b), set up context (e), write the prompt (d), test (a), then deploy (c).',
    },
  },
  {
    id: 'd2-25', type: 'single', category: 'day2', difficulty: 'easy', points: 2,
    data: {
      question: 'What\'s the difference between a Skill and a Project?',
      options: [
        { id: 'a', text: 'Skills are reusable prompt templates; Projects are persistent knowledge bases' },
        { id: 'b', text: 'They are the same thing with different names' },
        { id: 'c', text: 'Skills are for developers; Projects are for marketers' },
        { id: 'd', text: 'Skills are free; Projects require a paid plan' },
      ],
      correct: 'a',
      explanation: 'Skills are reusable prompt templates for specific tasks. Projects are persistent workspaces with uploaded files and conversation history.',
    },
  },
  {
    id: 'd2-26', type: 'multi', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      scenario: 'You are deploying Claude automation for a D2C brand\'s customer support (500+ messages/day).',
      question: 'Which deployment considerations are critical?',
      options: [
        { id: 'a', text: 'Define clear handoff rules between AI and human agents' },
        { id: 'b', text: 'Start with a pilot on 10% of traffic before full rollout' },
        { id: 'c', text: 'Set up monitoring for response quality and customer satisfaction' },
        { id: 'd', text: 'Replace all human agents immediately to reduce costs' },
        { id: 'e', text: 'Create response templates for common question categories' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Proper deployment needs handoff rules (a), pilot testing (b), quality monitoring (c), and templates (e). Replacing all humans immediately (d) is risky.',
    },
  },
  {
    id: 'd2-27', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      question: 'How should you handle multi-language support in a Claude Skill?',
      options: [
        { id: 'a', text: 'Add language detection and response templates for each language' },
        { id: 'b', text: 'Build a separate Skill for each language' },
        { id: 'c', text: 'Tell customers to only use English' },
        { id: 'd', text: 'Use a translation API before sending to Claude' },
      ],
      correct: 'a',
      explanation: 'Claude handles multiple languages — the issue is usually missing context. Adding language detection and templates is the simplest fix.',
    },
  },
  {
    id: 'd2-28', type: 'single', category: 'day2', difficulty: 'medium', points: 2,
    data: {
      scenario: 'A client says their Claude Skill works well for simple queries but fails on complex, multi-step requests.',
      question: 'What should you do first?',
      options: [
        { id: 'a', text: 'Review and improve the Skill\'s context quality and add more examples' },
        { id: 'b', text: 'Switch to a more expensive model' },
        { id: 'c', text: 'Add more categories to the Skill' },
        { id: 'd', text: 'Tell the client to simplify their requests' },
      ],
      correct: 'a',
      explanation: 'Most Skill failures are context problems. Review the context quality, add examples of complex requests, and test with edge cases.',
    },
  },
  {
    id: 'd2-29', type: 'multi', category: 'day2', difficulty: 'hard', points: 3,
    data: {
      question: 'What should you include in a D2C product recommendation Skill?',
      options: [
        { id: 'a', text: 'Product database with categories, ingredients, and compatibility' },
        { id: 'b', text: 'Brand voice guide for response tone' },
        { id: 'c', text: 'Escalation rules for out-of-stock or inappropriate requests' },
        { id: 'd', text: 'Direct payment processing integration' },
        { id: 'e', text: 'Customer purchase history for personalized recommendations' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Product data (a), voice (b), escalation (c), and history (e) are essential. Payment processing (d) should not be in a recommendation Skill.',
    },
  },
  {
    id: 'd2-30', type: 'ordering', category: 'day2', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank these Skill optimization steps from FIRST to LAST.',
      items: [
        { id: 'a', text: 'Test with edge cases and measure accuracy' },
        { id: 'b', text: 'Audit the current context quality' },
        { id: 'c', text: 'Add more examples and reference files' },
        { id: 'd', text: 'Monitor performance and iterate' },
      ],
      correctOrder: ['b', 'c', 'a', 'd'],
      explanation: 'Audit context first (b), add examples (c), test with edge cases (a), then monitor and iterate (d).',
    },
  },

  // ─────────────────────────────────────────────────────────────
  // DAY 3: MCP, COST OPTIMIZATION, STRATEGY (25 questions)
  // ─────────────────────────────────────────────────────────────

  {
    id: 'd3-01', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      question: 'What is MCP (Model Context Protocol)?',
      options: [
        { id: 'a', text: 'An open standard for connecting AI tools to external data sources and services' },
        { id: 'b', text: 'A new Claude model' },
        { id: 'c', text: 'A pricing plan for enterprise customers' },
        { id: 'd', text: 'A security protocol for data encryption' },
      ],
      correct: 'a',
      explanation: 'MCP is an open standard by Anthropic for connecting AI tools to databases, APIs, tools, and services.',
    },
  },
  {
    id: 'd3-02', type: 'multi', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      question: 'What can MCP connect Claude to?',
      options: [
        { id: 'a', text: 'Databases (PostgreSQL, MySQL, MongoDB, Redis)' },
        { id: 'b', text: 'Project management (Jira, Linear, Asana)' },
        { id: 'c', text: 'Communication (Slack, Gmail, Discord)' },
        { id: 'd', text: 'Social media platforms (Instagram, TikTok)' },
        { id: 'e', text: 'Development tools (GitHub, GitLab, Sentry)' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'MCP connects to databases, project management, communication, and development tools. Social media platforms are not directly supported via MCP.',
    },
  },
  {
    id: 'd3-03', type: 'single', category: 'day3', difficulty: 'easy', points: 2,
    data: {
      question: 'How many MCP servers are listed in Claude\'s connectors directory?',
      options: [
        { id: 'a', text: '950+' },
        { id: 'b', text: '100+' },
        { id: 'c', text: '50+' },
        { id: 'd', text: '1,000+' },
      ],
      correct: 'a',
      explanation: 'Claude\'s connectors directory lists 950+ MCP servers.',
    },
  },
  {
    id: 'd3-04', type: 'ordering', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank MCP transport types from most to least recommended.',
      items: [
        { id: 'a', text: 'HTTP (recommended for remote)' },
        { id: 'b', text: 'stdio (local processes)' },
        { id: 'c', text: 'WebSocket (bidirectional)' },
        { id: 'd', text: 'SSE (deprecated)' },
      ],
      correctOrder: ['a', 'b', 'c', 'd'],
      explanation: 'HTTP is recommended for remote. stdio for local. WebSocket for bidirectional. SSE is deprecated.',
    },
  },
  {
    id: 'd3-05', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      question: 'How do you add an MCP server to Claude?',
      options: [
        { id: 'a', text: 'claude mcp add or claude mcp add-json' },
        { id: 'b', text: 'Edit the Claude config file manually' },
        { id: 'c', text: 'Install via npm' },
        { id: 'd', text: 'Contact Anthropic support' },
      ],
      correct: 'a',
      explanation: 'MCP servers are added via CLI: claude mcp add <name> <command> or claude mcp add-json.',
    },
  },
  {
    id: 'd3-06', type: 'multi', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      question: 'What are MCP security best practices?',
      options: [
        { id: 'a', text: 'Use read-only database users for query tools' },
        { id: 'b', text: 'Never hardcode credentials — use environment variables' },
        { id: 'c', text: 'Apply least-privilege permissions to every MCP server' },
        { id: 'd', text: 'Give all team members full admin access' },
        { id: 'e', text: 'Use environment variable expansion for team sharing' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Use read-only access, no hardcoded credentials, least privilege, and env vars for sharing. Full admin access (d) violates least privilege.',
    },
  },
  {
    id: 'd3-07', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      question: 'What is the 80/15/5 model routing rule?',
      options: [
        { id: 'a', text: 'Route 80% of traffic to Haiku, 15% to Sonnet, 5% to Opus' },
        { id: 'b', text: 'Route 80% to Opus, 15% to Sonnet, 5% to Haiku' },
        { id: 'c', text: 'Route 80% to Sonnet, 15% to Haiku, 5% to Opus' },
        { id: 'd', text: 'Route 80% to the cheapest model, 20% to the best' },
      ],
      correct: 'a',
      explanation: 'Route 80% of routine tasks to Haiku (cheapest), 15% to Sonnet (balanced), 5% to Opus (best quality). Teams using inverted distribution overpay 4-5x.',
    },
  },
  {
    id: 'd3-08', type: 'ordering', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank Claude models from cheapest to most expensive per token.',
      items: [
        { id: 'a', text: 'Sonnet 5 ($2/$10 per M tokens)' },
        { id: 'b', text: 'Haiku 4.5 ($1/$5 per M tokens)' },
        { id: 'c', text: 'Fable 5.1 ($10/$50 per M tokens)' },
        { id: 'd', text: 'Opus 5 ($5/$25 per M tokens)' },
      ],
      correctOrder: ['b', 'a', 'd', 'c'],
      explanation: 'Haiku ($1/$5) < Sonnet ($2/$10) < Opus ($5/$25) < Fable ($10/$50).',
    },
  },
  {
    id: 'd3-09', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      question: 'What is the Advisor Strategy for cost optimization?',
      options: [
        { id: 'a', text: 'Pair a faster executor model with a higher-intelligence advisor model' },
        { id: 'b', text: 'Always use the cheapest model available' },
        { id: 'c', text: 'Ask Claude for cost-saving advice' },
        { id: 'd', text: 'Use one model for all tasks' },
      ],
      correct: 'a',
      explanation: 'The Advisor Strategy pairs a fast executor (e.g., Sonnet) with a higher-intelligence advisor (e.g., Fable). You pay for the stronger model only on consultations.',
    },
  },
  {
    id: 'd3-10', type: 'multi', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      question: 'What is prompt caching?',
      options: [
        { id: 'a', text: 'Cache read cost is 10% of standard input price (90% reduction)' },
        { id: 'b', text: 'Break-even at approximately 2 calls' },
        { id: 'c', text: 'Minimum cacheable prefix is 1,024 tokens on Sonnet' },
        { id: 'd', text: 'Caching works automatically on all requests' },
        { id: 'e', text: 'Up to 4 explicit cache breakpoints supported' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Caching gives 90% input cost reduction, breaks even at 2 calls, requires 1,024 tokens minimum, and supports 4 breakpoints. It does not work automatically on all requests.',
    },
  },
  {
    id: 'd3-11', type: 'single', category: 'day3', difficulty: 'easy', points: 2,
    data: {
      question: 'What is the Batch API discount?',
      options: [
        { id: 'a', text: '50% discount for non-real-time work (completes within 24 hours)' },
        { id: 'b', text: '25% discount for bulk orders' },
        { id: 'c', text: '10% discount for annual commitments' },
        { id: 'd', text: 'No discount available' },
      ],
      correct: 'a',
      explanation: 'Batch API offers 50% discount on all models for non-real-time work that completes within 24 hours.',
    },
  },
  {
    id: 'd3-12', type: 'multi', category: 'day3', difficulty: 'hard', points: 3,
    data: {
      question: 'What are cost optimization techniques for Claude?',
      options: [
        { id: 'a', text: 'Model routing: use Haiku for simple tasks, Sonnet for reasoning, Opus for hard problems' },
        { id: 'b', text: 'Prompt caching: cache frequently used context for 90% input cost reduction' },
        { id: 'c', text: 'Batch API: 50% discount for non-real-time work' },
        { id: 'd', text: 'Always use the most expensive model for best quality' },
        { id: 'e', text: 'Output length control: explicit length instructions reduce output tokens 20-40%' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Model routing, caching, batch API, and output control are all proven techniques. Always using the most expensive model (d) increases costs unnecessarily.',
    },
  },
  {
    id: 'd3-13', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      question: 'What does the Claude effort parameter control?',
      options: [
        { id: 'a', text: 'Thinking, tool calling, and self-verification depth' },
        { id: 'b', text: 'Response speed' },
        { id: 'c', text: 'Token cost per request' },
        { id: 'd', text: 'Model selection' },
      ],
      correct: 'a',
      explanation: 'The effort parameter (low, medium, high, xhigh, max) governs thinking depth, tool calling, and self-verification. Higher effort = more thorough but more expensive.',
    },
  },
  {
    id: 'd3-14', type: 'single', category: 'day3', difficulty: 'easy', points: 2,
    data: {
      question: 'What is the context window size for Claude Sonnet 5?',
      options: [
        { id: 'a', text: '1M tokens' },
        { id: 'b', text: '200K tokens' },
        { id: 'c', text: '500K tokens' },
        { id: 'd', text: '100K tokens' },
      ],
      correct: 'a',
      explanation: 'Opus, Sonnet, and Fable all have 1M token context windows. Haiku has 200K.',
    },
  },
  {
    id: 'd3-15', type: 'multi', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      question: 'What metrics should you track for Claude deployment ROI?',
      options: [
        { id: 'a', text: 'Customer satisfaction score (CSAT) after AI-assisted interactions' },
        { id: 'b', text: 'Tickets/tasks resolved per person per day' },
        { id: 'c', text: 'Cost per resolved ticket/task' },
        { id: 'd', text: 'Number of Claude queries per day' },
        { id: 'e', text: 'Time saved on repetitive tasks' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'CSAT (quality), throughput (b), cost efficiency (c), and time saved (e) are value metrics. Query count (d) is usage, not value.',
    },
  },
  {
    id: 'd3-16', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      scenario: 'A team spends ₹80,000/month on Claude across 15 people. Most usage is email drafting and meeting summaries.',
      question: 'Which optimization has the biggest impact?',
      options: [
        { id: 'a', text: 'Switch everyone to the most expensive model' },
        { id: 'b', text: 'Use Sonnet for routine tasks and reserve Opus for complex analysis' },
        { id: 'c', text: 'Reduce the number of users' },
        { id: 'd', text: 'Set shorter context windows for all users' },
      ],
      correct: 'b',
      explanation: 'Model selection is the biggest cost lever. Sonnet handles 80% of tasks well at a fraction of Opus cost. Reserve Opus for complex work.',
    },
  },
  {
    id: 'd3-17', type: 'ordering', category: 'day3', difficulty: 'hard', points: 3,
    data: {
      instruction: 'Rank these deployment steps for a support team from FIRST to LAST.',
      items: [
        { id: 'a', text: 'Define escalation rules and handoff criteria' },
        { id: 'b', text: 'Set up quality monitoring and CSAT tracking' },
        { id: 'c', text: 'Pilot with 10% of traffic for 2 weeks' },
        { id: 'd', text: 'Build response templates for common categories' },
        { id: 'e', text: 'Roll out to 100% with human oversight' },
      ],
      correctOrder: ['a', 'd', 'c', 'b', 'e'],
      explanation: 'Define rules (a), build templates (d), pilot (c), set up monitoring (b), then full rollout (e).',
    },
  },
  {
    id: 'd3-18', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      question: 'What is the best model for high-volume classification tasks?',
      options: [
        { id: 'a', text: 'Haiku (matches Sonnet within 0.3pp at lower cost)' },
        { id: 'b', text: 'Opus (best quality)' },
        { id: 'c', text: 'Fable (frontier model)' },
        { id: 'd', text: 'Sonnet (balanced)' },
      ],
      correct: 'a',
      explanation: 'Haiku handles classification, extraction, and routing at a fraction of the cost. It matches Sonnet within 0.3 percentage points on classification accuracy.',
    },
  },
  {
    id: 'd3-19', type: 'multi', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      question: 'What is included in Claude Enterprise plans?',
      options: [
        { id: 'a', text: 'SCIM provisioning and audit logs' },
        { id: 'b', text: 'HIPAA-ready offering with BAA' },
        { id: 'c', text: 'Role-based access control (RBAC)' },
        { id: 'd', text: 'Unlimited usage with no limits' },
        { id: 'e', text: 'Custom data retention policies' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Enterprise includes SCIM, audit logs, HIPAA, RBAC, and custom retention. Usage is pooled, not unlimited.',
    },
  },
  {
    id: 'd3-20', type: 'single', category: 'day3', difficulty: 'easy', points: 2,
    data: {
      question: 'What is the default context window for Enterprise plans?',
      options: [
        { id: 'a', text: '500K tokens on the default model' },
        { id: 'b', text: '1M tokens on all models' },
        { id: 'c', text: '200K tokens' },
        { id: 'd', text: 'Unlimited' },
      ],
      correct: 'a',
      explanation: 'Enterprise default is 500K tokens on the default model. The full 1M is available on specific models.',
    },
  },
  {
    id: 'd3-21', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      question: 'What is Zero Data Retention (ZDR)?',
      options: [
        { id: 'a', text: 'Available for qualified accounts; Mythos-class models require 30-day retention' },
        { id: 'b', text: 'Data is never stored under any circumstances' },
        { id: 'c', text: 'Only available on Free plans' },
        { id: 'd', text: 'A feature that deletes data after each conversation' },
      ],
      correct: 'a',
      explanation: 'ZDR is available for qualified accounts. However, Mythos-class models require 30-day data retention and are not available with ZDR.',
    },
  },
  {
    id: 'd3-22', type: 'multi', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      question: 'What compliance certifications does Anthropic have?',
      options: [
        { id: 'a', text: 'SOC 2 Type 2' },
        { id: 'b', text: 'ISO 27001' },
        { id: 'c', text: 'ISO 42001 (AI management systems)' },
        { id: 'd', text: 'PCI DSS' },
        { id: 'e', text: 'EU AI Act compliance' },
      ],
      correct: ['a', 'b', 'c', 'e'],
      explanation: 'Anthropic has SOC 2 Type 2, ISO 27001, ISO 42001, and EU AI Act compliance. PCI DSS is not listed.',
    },
  },
  {
    id: 'd3-23', type: 'single', category: 'day3', difficulty: 'medium', points: 2,
    data: {
      question: 'What does EU AI Act Article 14 require?',
      options: [
        { id: 'a', text: 'Effective human oversight for high-risk AI systems' },
        { id: 'b', text: 'All AI must be open source' },
        { id: 'c', text: 'AI companies must pay a tax on revenue' },
        { id: 'd', text: 'AI cannot be used for customer support' },
      ],
      correct: 'a',
      explanation: 'Article 14 requires effective human oversight for high-risk AI systems. This means HITL processes, explainability, and contestability.',
    },
  },
  {
    id: 'd3-24', type: 'ordering', category: 'day3', difficulty: 'medium', points: 3,
    data: {
      instruction: 'Rank cost optimization techniques by typical impact (highest to lowest).',
      items: [
        { id: 'a', text: 'Prompt caching (90% input cost reduction)' },
        { id: 'b', text: 'Model routing (80% to cheapest model)' },
        { id: 'c', text: 'Batch API (50% discount)' },
        { id: 'd', text: 'Output length control (20-40% reduction)' },
      ],
      correctOrder: ['a', 'b', 'c', 'd'],
      explanation: 'Caching gives the biggest per-call reduction (90%). Model routing affects volume. Batch API gives 50%. Output control gives 20-40%.',
    },
  },
  {
    id: 'd3-25', type: 'multi', category: 'day3', difficulty: 'hard', points: 3,
    data: {
      question: 'What security controls should a CISO evaluate for Claude deployment?',
      options: [
        { id: 'a', text: 'Identity: SAML/OIDC for sign-in, SCIM for provisioning' },
        { id: 'b', text: 'Connector allowlists: admin enables org-wide, user individually authorizes' },
        { id: 'c', text: 'Per-tool, per-action approval: restrict specific verbs per role' },
        { id: 'd', text: 'Sandboxed execution: agent loop never holds credentials' },
        { id: 'e', text: 'Audit logging: OTLP endpoint streams every tool invocation' },
      ],
      correct: ['a', 'b', 'c', 'd', 'e'],
      explanation: 'All five are documented security controls: identity, connector allowlists, per-tool approval, sandboxed execution, and audit logging.',
    },
  },
];

// ═══════════════════════════════════════════════════════════════
// SCORING — deterministic for all question types
// ═══════════════════════════════════════════════════════════════

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
