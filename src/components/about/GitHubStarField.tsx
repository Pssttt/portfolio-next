const GITHUB_USERNAME = "Pssttt";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const CELL_PX = 12;
const GAP_PX = 2;
const STEP_PX = CELL_PX + GAP_PX;
const DAY_LABEL_PX = 20;

const STAR_SIZE = [0, 3, 5, 6, 8] as const;
const STAR_OPACITY = [0, 0.55, 0.75, 0.9, 1] as const;
const STAR_COLORS = [
  "var(--color-blue)",
  "var(--color-lavender)",
  "var(--color-sapphire)",
  "var(--color-teal)",
];

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
}

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 9) return 2;
  if (count <= 19) return 3;
  return 4;
}

function starColor(date: string) {
  const hash = date.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return STAR_COLORS[hash % STAR_COLORS.length];
}

async function fetchContributions(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`,
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return (
      json.data?.user?.contributionsCollection?.contributionCalendar ?? null
    );
  } catch {
    return null;
  }
}

function buildMonthLabels(weeks: Week[]) {
  const labels: { label: string; col: number }[] = [];
  weeks.forEach((week, weekIndex) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const date = new Date(firstDay.date + "T00:00:00");
    if (date.getDate() <= 7) {
      const label = MONTHS[date.getMonth()];
      const last = labels[labels.length - 1];
      if (!last || last.label !== label) {
        labels.push({ label, col: weekIndex });
      }
    }
  });
  return labels;
}

export async function GitHubStarField() {
  const calendar = await fetchContributions();
  if (!calendar) return null;

  const { totalContributions, weeks } = calendar;
  const monthLabels = buildMonthLabels(weeks);

  return (
    <div className="pt-6 space-y-3">
      <h3 className="text-cat-blue font-medium text-sm uppercase tracking-wider">
        GitHub Activity
      </h3>
      <p className="text-xs text-muted-foreground pl-4">
        {totalContributions.toLocaleString()} contributions in the last year
      </p>

      <div className="overflow-x-auto pb-1">
        <div className="inline-block rounded border border-border/30 bg-card/40 p-3">
          {/* Month labels */}
          <div
            className="relative h-4 mb-1"
            style={{ marginLeft: `${DAY_LABEL_PX + GAP_PX}px` }}
          >
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className="absolute text-[9px] text-muted-foreground/60 leading-none select-none"
                style={{ left: `${col * STEP_PX}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex" style={{ gap: `${GAP_PX}px` }}>
            {/* Day labels */}
            <div
              className="flex flex-col"
              style={{ gap: `${GAP_PX}px`, width: `${DAY_LABEL_PX}px` }}
            >
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="text-[9px] text-muted-foreground/60 flex items-center select-none"
                  style={{ height: `${CELL_PX}px` }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex flex-col"
                style={{ gap: `${GAP_PX}px` }}
              >
                {week.contributionDays.map((day, dayIndex) => {
                  const level = getLevel(day.contributionCount);
                  const size = STAR_SIZE[level];
                  const opacity = STAR_OPACITY[level];
                  const color = starColor(day.date);
                  const glow =
                    level >= 2 ? `0 0 ${level * 3}px ${color}` : "none";
                  const label = `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${new Date(day.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

                  return (
                    <div
                      key={day.date || `${weekIndex}-${dayIndex}`}
                      title={label}
                      className="flex items-center justify-center"
                      style={{ width: `${CELL_PX}px`, height: `${CELL_PX}px` }}
                    >
                      {size > 0 && (
                        <div
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: "50%",
                            backgroundColor: color,
                            opacity,
                            boxShadow: glow,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            className="flex items-center gap-2 mt-3"
            style={{ marginLeft: `${DAY_LABEL_PX + GAP_PX}px` }}
          >
            <span className="text-[9px] text-muted-foreground/50 select-none">
              Less
            </span>
            {([1, 2, 3, 4] as const).map((level) => (
              <div
                key={level}
                style={{
                  width: `${STAR_SIZE[level]}px`,
                  height: `${STAR_SIZE[level]}px`,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-blue)",
                  opacity: STAR_OPACITY[level],
                  boxShadow:
                    level >= 2
                      ? `0 0 ${level * 3}px var(--color-blue)`
                      : "none",
                }}
              />
            ))}
            <span className="text-[9px] text-muted-foreground/50 select-none">
              More
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
