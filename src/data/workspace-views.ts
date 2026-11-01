// Views shown in the landing workspace stack and its enlarged viewer, in cycle order.
export interface WorkspaceView {
  id: "today" | "issues" | "habits" | "review" | "momentum";
  title: string;
  label: string;
  description: string;
  alt: string;
  screenshot: "summary" | "issues" | "habits" | "review" | "momentum";
  mesh: "summary" | "cool" | "warm" | "review" | "momentum";
  /** Mobile crop: left edge of the visible window, as a percentage of the screenshot width. */
  cropX: number;
}

export const workspaceViews: WorkspaceView[] = [
  {
    id: "today",
    title: "Today",
    label: "today",
    description: "Plan the day, then reconstruct it without relying on memory.",
    alt: "Crona Today view with the day summary showing focus, issues, habits, accountability, wellbeing, and momentum",
    screenshot: "summary",
    mesh: "summary",
    cropX: 0,
  },
  {
    id: "issues",
    title: "Issues",
    label: "issues",
    description: "Every open issue across repos, with effort, due dates, and tags.",
    alt: "Crona Work view listing open issues by repo and stream with estimates, status, and overdue markers",
    screenshot: "issues",
    mesh: "cool",
    cropX: 14,
  },
  {
    id: "habits",
    title: "Habits",
    label: "habits",
    description: "Keep routines next to the work, with streaks that respect rest days.",
    alt: "Crona Habits view listing daily and weekly habits with targets, schedules, and streak momentum",
    screenshot: "habits",
    mesh: "warm",
    cropX: 14,
  },
  {
    id: "review",
    title: "Review",
    label: "review",
    description: "Compare estimated time with logged focus, mood, and energy.",
    alt: "Crona Review view comparing estimated and logged focus with mood, energy, and recovery across a week",
    screenshot: "review",
    mesh: "review",
    cropX: 16,
  },
  {
    id: "momentum",
    title: "Momentum",
    label: "momentum",
    description: "Track habits and focus across the weeks.",
    alt: "Crona Momentum view showing focus patterns and habit progress across a 30-day window",
    screenshot: "momentum",
    mesh: "momentum",
    cropX: 30,
  },
];

/** The view the stack opens on. */
export const initialWorkspaceView = 0;
