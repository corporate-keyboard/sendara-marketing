/* ── WhatsApp Template Analyzer & Scorer ──
   Based on Meta guidelines, Sendara scoring rubric, and 13 auto-fail rules.
   Scores templates 0-100 with grade A-F.
*/

export interface AnalysisResult {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  compliance: {
    pass: boolean;
    issues: ComplianceIssue[];
  };
  spamScore: number;
  engagement: {
    estimatedReadRate: string;
    estimatedBlockRisk: "low" | "medium" | "high";
    estimatedReplyRate: string;
  };
  issues: ScoringIssue[];
  bonuses: ScoringBonus[];
  categoryRecommendation: "marketing" | "utility";
  suggestions: string[];
}

interface ComplianceIssue {
  rule: string;
  severity: "auto-fail" | "critical" | "warning";
  message: string;
}

interface ScoringIssue {
  severity: "critical" | "warning" | "suggestion";
  message: string;
  deduction: number;
}

interface ScoringBonus {
  message: string;
  bonus: number;
}

/* ── Auto-Fail Rules (13) ── */
const URL_SHORTENERS = ["bit.ly", "t.ly", "tinyurl.com", "goo.gl", "ow.ly", "is.gd", "buff.ly", "rebrand.ly", "short.io"];

function checkAutoFails(template: string): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];
  const body = template.trim();

  // 1. Variable at start of body
  if (/^\{\{/.test(body)) {
    issues.push({ rule: "VAR_START", severity: "auto-fail", message: "Template cannot start with a variable ({{...}})" });
  }

  // 2. Variable at end of body
  if (/\}\}$/.test(body)) {
    issues.push({ rule: "VAR_END", severity: "auto-fail", message: "Template cannot end with a variable ({{...}})" });
  }

  // 3. Consecutive variables without text between them
  if (/\}\}\s*\{\{/.test(body)) {
    issues.push({ rule: "CONSECUTIVE_VARS", severity: "auto-fail", message: "Consecutive variables must have text between them" });
  }

  // 4. Non-sequential variable numbering
  const vars = Array.from(body.matchAll(/\{\{(\d+)\}\}/g)).map(m => parseInt(m[1]));
  if (vars.length > 0) {
    const sorted = Array.from(new Set(vars)).sort((a, b) => a - b);
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== i + 1) {
        issues.push({ rule: "VAR_SEQUENCE", severity: "auto-fail", message: `Variables must be numbered sequentially (found {{${sorted[i]}}} but expected {{${i + 1}}})` });
        break;
      }
    }
  }

  // 5. URL shorteners in buttons
  for (const shortener of URL_SHORTENERS) {
    if (body.toLowerCase().includes(shortener)) {
      issues.push({ rule: "URL_SHORTENER", severity: "auto-fail", message: `URL shortener detected (${shortener}). Meta rejects templates with shortened URLs.` });
      break;
    }
  }

  // 6. wa.me links
  if (/wa\.me/i.test(body)) {
    issues.push({ rule: "WAME_LINK", severity: "auto-fail", message: "wa.me links are not allowed in URL buttons" });
  }

  // 7. Lines containing only variables
  const lines = body.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && /^\{\{\d+\}\}$/.test(trimmed)) {
      issues.push({ rule: "VAR_ONLY_LINE", severity: "auto-fail", message: "A line cannot contain only a variable" });
      break;
    }
  }

  // 8. Duplicate body text (same line repeated)
  const lineSet = new Set<string>();
  for (const line of lines) {
    const trimmed = line.trim().toLowerCase();
    if (trimmed.length > 10 && lineSet.has(trimmed)) {
      issues.push({ rule: "DUPLICATE_TEXT", severity: "auto-fail", message: "Duplicate text detected in template body" });
      break;
    }
    if (trimmed.length > 10) lineSet.add(trimmed);
  }

  // 9. Prohibited/threatening content
  const prohibited = ["threat", "blackmail", "extort", "kill", "harm", "illegal", "scam"];
  for (const word of prohibited) {
    if (body.toLowerCase().includes(word)) {
      issues.push({ rule: "PROHIBITED", severity: "auto-fail", message: `Prohibited content detected: "${word}"` });
      break;
    }
  }

  return issues;
}

/* ── Spam Trigger Words (20) ── */
const SPAM_TRIGGERS = [
  "hot deal", "urgent", "act now", "limited time", "don't miss",
  "exclusive offer", "hurry", "last chance", "buy now", "free",
  "guaranteed", "no risk", "winner", "congratulations", "click here",
  "100%", "best price", "lowest price", "amazing deal", "unbelievable",
];

/* ── Scoring Engine ── */
function scoreTemplate(template: string): { score: number; issues: ScoringIssue[]; bonuses: ScoringBonus[] } {
  let score = 100;
  const issues: ScoringIssue[] = [];
  const bonuses: ScoringBonus[] = [];
  const lower = template.toLowerCase();

  // ── Deductions ──

  // Emoji count
  const emojiRegex = /[\u1F600-\u1F64F\u1F300-\u1F5FF\u1F680-\u1F6FF\u1F1E0-\u1F1FF\u2600-\u26FF\u2700-\u27BF]/g;
  const emojiCount = (template.match(emojiRegex) || []).length;
  if (emojiCount > 2) {
    const deduction = 15;
    score -= deduction;
    issues.push({ severity: "warning", message: `Too many emojis (${emojiCount}). Max 2 recommended for professional templates.`, deduction });
  }

  // ALL CAPS words (3+ chars)
  const capsWords = (template.match(/\b[A-Z]{3,}\b/g) || []).filter(w => !w.startsWith("AED") && !w.startsWith("UAE"));
  if (capsWords.length > 0) {
    const deduction = Math.min(capsWords.length * 10, 30);
    score -= deduction;
    issues.push({ severity: "warning", message: `ALL CAPS detected: ${capsWords.slice(0, 3).join(", ")}${capsWords.length > 3 ? "..." : ""}. Avoid shouting.`, deduction });
  }

  // Exclamation marks
  const exclamations = (template.match(/!/g) || []).length;
  if (exclamations > 1) {
    const deduction = (exclamations - 1) * 5;
    score -= deduction;
    issues.push({ severity: "suggestion", message: `${exclamations} exclamation marks. Keep to 1 max for professional tone.`, deduction });
  }

  // Spam trigger words
  const foundSpam: string[] = [];
  for (const trigger of SPAM_TRIGGERS) {
    if (lower.includes(trigger)) {
      foundSpam.push(trigger);
    }
  }
  if (foundSpam.length > 0) {
    const deduction = foundSpam.length * 20;
    score -= deduction;
    issues.push({ severity: "critical", message: `Spam trigger words: ${foundSpam.join(", ")}`, deduction });
  }

  // No personalization
  if (!/\{\{\d+\}\}/.test(template)) {
    const deduction = 15;
    score -= deduction;
    issues.push({ severity: "warning", message: "No personalization variables (e.g., {{1}}). Personalized messages perform 2-3x better.", deduction });
  }

  // No opt-out
  const hasOptOut = /\b(stop|unsubscribe|opt.?out|لا أريد|إلغاء)\b/i.test(template);
  if (!hasOptOut) {
    const deduction = 25;
    score -= deduction;
    issues.push({ severity: "critical", message: "No opt-out mechanism detected. Add a 'Reply STOP' option or opt-out quick reply button.", deduction });
  }

  // ── Bonuses ──

  // Personal greeting
  if (/\b(hi|hello|hey|dear|مرحبا|أهلا)\s*\{\{/i.test(template)) {
    const bonus = 10;
    score += bonus;
    bonuses.push({ message: "Personal greeting with variable detected", bonus });
  }

  // Specific property details
  if (/\b(bedroom|bed|bath|sqft|sq\.?\s?ft|bhk|villa|apartment|penthouse|townhouse|studio)\b/i.test(template)) {
    const bonus = 10;
    score += bonus;
    bonuses.push({ message: "Specific property details included", bonus });
  }

  // Clear CTA or question
  if (/\?\s*$|\b(schedule|book|call|visit|view|learn more|interested|reply|contact)\b/i.test(template)) {
    const bonus = 10;
    score += bonus;
    bonuses.push({ message: "Clear call-to-action or question detected", bonus });
  }

  // Quick reply buttons mentioned
  if (/\b(quick reply|button|reply with|type)\b/i.test(template)) {
    const bonus = 15;
    score += bonus;
    bonuses.push({ message: "Quick reply / button interaction suggested", bonus });
  }

  // Opt-out quick reply
  if (hasOptOut) {
    const bonus = 15;
    score += bonus;
    bonuses.push({ message: "Opt-out mechanism included", bonus });
  }

  // Length scoring
  const charCount = template.length;
  if (charCount < 160) {
    const bonus = 5;
    score += bonus;
    bonuses.push({ message: `Short template (${charCount} chars) — concise and scannable`, bonus });
  } else if (charCount <= 320) {
    const bonus = 10;
    score += bonus;
    bonuses.push({ message: `Good length (${charCount} chars) — enough detail without overwhelming`, bonus });
  } else if (charCount > 500) {
    const deduction = 10;
    score -= deduction;
    issues.push({ severity: "suggestion", message: `Template is long (${charCount} chars). Consider shortening for better read rates.`, deduction });
  }

  // Natural conversational tone (no excessive formatting)
  const formattingChars = (template.match(/[*_~`]/g) || []).length;
  if (formattingChars < 6) {
    const bonus = 10;
    score += bonus;
    bonuses.push({ message: "Natural conversational tone (minimal formatting)", bonus });
  }

  // Arabic support
  if (/[\u0600-\u06FF]/.test(template)) {
    const bonus = 5;
    score += bonus;
    bonuses.push({ message: "Arabic text detected — supports local audience", bonus });
  }

  return { score: Math.max(0, Math.min(100, score)), issues, bonuses };
}

/* ── Grade Mapping ── */
function getGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  if (score >= 40) return "C";
  if (score >= 20) return "D";
  return "F";
}

/* ── Engagement Prediction ── */
function predictEngagement(score: number, hasOptOut: boolean): AnalysisResult["engagement"] {
  if (score >= 80) {
    return {
      estimatedReadRate: "70-85%",
      estimatedBlockRisk: "low",
      estimatedReplyRate: hasOptOut ? "10-20%" : "5-10%",
    };
  }
  if (score >= 60) {
    return {
      estimatedReadRate: "55-70%",
      estimatedBlockRisk: "low",
      estimatedReplyRate: hasOptOut ? "5-10%" : "3-5%",
    };
  }
  if (score >= 40) {
    return {
      estimatedReadRate: "35-55%",
      estimatedBlockRisk: "medium",
      estimatedReplyRate: "2-5%",
    };
  }
  return {
    estimatedReadRate: "<35%",
    estimatedBlockRisk: "high",
    estimatedReplyRate: "<2%",
  };
}

/* ── Category Recommendation ── */
function recommendCategory(template: string): "marketing" | "utility" {
  const lower = template.toLowerCase();
  const marketingSignals = ["offer", "deal", "discount", "promotion", "new listing", "just listed", "open house", "price drop", "sale", "campaign"];
  const utilitySignals = ["appointment", "confirmation", "reminder", "update on your", "status of your", "scheduled", "booking confirmed", "delivery", "payment"];

  let marketingScore = 0;
  let utilityScore = 0;

  for (const signal of marketingSignals) {
    if (lower.includes(signal)) marketingScore++;
  }
  for (const signal of utilitySignals) {
    if (lower.includes(signal)) utilityScore++;
  }

  return utilityScore > marketingScore ? "utility" : "marketing";
}

/* ── Suggestions Generator ── */
function generateSuggestions(result: Omit<AnalysisResult, "suggestions">): string[] {
  const suggestions: string[] = [];

  if (!result.compliance.pass) {
    suggestions.push("Fix all auto-fail issues before submitting to Meta — these will cause instant rejection.");
  }

  for (const issue of result.issues) {
    if (issue.severity === "critical" && issue.message.includes("Spam trigger")) {
      suggestions.push("Remove spam trigger words and use natural, conversational language instead.");
    }
    if (issue.severity === "critical" && issue.message.includes("opt-out")) {
      suggestions.push("Add 'Reply STOP to unsubscribe' or an opt-out quick reply button.");
    }
    if (issue.severity === "warning" && issue.message.includes("emoji")) {
      suggestions.push("Reduce emojis to 1-2 max. Professional templates perform better with minimal decoration.");
    }
    if (issue.severity === "warning" && issue.message.includes("CAPS")) {
      suggestions.push("Convert ALL CAPS text to normal case. It reads as shouting and triggers spam filters.");
    }
    if (issue.severity === "warning" && issue.message.includes("personalization")) {
      suggestions.push("Add {{1}} for the contact's name at the start: 'Hi {{1}}, ...'");
    }
  }

  if (result.categoryRecommendation === "marketing") {
    suggestions.push("This template will be categorized as MARKETING by Meta. It will always be charged (not free in 24hr window).");
  }

  if (result.score >= 80 && suggestions.length === 0) {
    suggestions.push("Template looks strong. Consider A/B testing with a variation for even better results.");
  }

  return Array.from(new Set(suggestions));
}

/* ── Main Analyzer Function ── */
export function analyzeTemplate(template: string): AnalysisResult {
  const autoFails = checkAutoFails(template);
  const compliancePass = autoFails.length === 0;

  const { score: rawScore, issues, bonuses } = scoreTemplate(template);

  // If auto-fail, cap score at 19 (grade F)
  const score = compliancePass ? rawScore : Math.min(rawScore, 19);
  const grade = getGrade(score);

  const hasOptOut = /\b(stop|unsubscribe|opt.?out|لا أريد|إلغاء)\b/i.test(template);

  const partialResult = {
    score,
    grade,
    compliance: {
      pass: compliancePass,
      issues: autoFails,
    },
    spamScore: Math.max(0, 100 - score),
    engagement: predictEngagement(score, hasOptOut),
    issues,
    bonuses,
    categoryRecommendation: recommendCategory(template),
  };

  return {
    ...partialResult,
    suggestions: generateSuggestions(partialResult),
  };
}
