import { useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { useTheme } from "@/hooks/useTheme";
import { extractGithubUsername } from "@shared/social";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const LEVEL_COLORS = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

function buildWeeks(contributions: ContributionDay[]) {
  if (!contributions.length) return [];

  const byDate = new Map(contributions.map((day) => [day.date, day]));
  const start = new Date(contributions[0].date);
  const end = new Date(contributions[contributions.length - 1].date);

  const weeks: (ContributionDay | null)[][] = [];
  const current = new Date(start);

  while (current <= end) {
    const week: (ContributionDay | null)[] = [];
    for (let i = 0; i < 7; i++) {
      const key = current.toISOString().slice(0, 10);
      week.push(byDate.get(key) || null);
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export default function GitHubContributionsSection() {
  const { theme } = useTheme();
  const { data: profile } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: portfolioApi.getProfile,
  });

  const username = extractGithubUsername(profile);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-contributions", username],
    queryFn: portfolioApi.getGithubContributions,
    enabled: Boolean(username),
    staleTime: 1000 * 60 * 30,
  });

  const weeks = useMemo(
    () => buildWeeks(data?.contributions || []),
    [data?.contributions]
  );
  const colors = LEVEL_COLORS[theme];
  const totalContributions = data?.total
    ? Object.values(data.total as Record<string, number>).reduce(
        (sum, count) => sum + count,
        0
      )
    : 0;

  const profileUrl =
    profile?.github?.trim() || (username ? `https://github.com/${username}` : "#");

  return (
    <section
      id="github"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <i className="ri-github-fill text-lg" />
              Open Source Activity
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              GitHub Contributions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">
              A year of commits and collaboration for{" "}
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                @{username || "your-github"}
              </a>
            </p>
          </div>

          {username && !isLoading && !isError && (
            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-5 py-3 min-w-[140px]">
                <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                  {totalContributions.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  contributions last year
                </p>
              </div>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-center px-4 py-2 rounded-xl border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition text-sm font-medium"
              >
                View on GitHub
                <i className="ri-arrow-right-up-line" />
              </a>
            </div>
          )}
        </div>

        <motion.div
          className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-4 sm:p-6 lg:p-8 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {!username ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <i className="ri-github-line text-4xl mb-3 block opacity-50" />
              <p>GitHub username is not configured yet.</p>
              <p className="text-sm mt-1">
                Set it in Admin → Profile → GitHub Username.
              </p>
            </div>
          ) : isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-28 w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-500">
              Unable to load contribution data for @{username}.
            </div>
          ) : (
            <>
              <div className="w-full">
                <div className="flex gap-[3px] w-full min-h-[7rem] sm:min-h-[8rem]">
                  {weeks.map((week, weekIndex) => (
                    <div
                      key={weekIndex}
                      className="flex flex-col gap-[3px] flex-1 min-w-0"
                    >
                      {week.map((day, dayIndex) => {
                        const level = day?.level ?? 0;
                        const title = day
                          ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                          : "No data";

                        return (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            title={title}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay:
                                (weekIndex % 12) * 0.008 + dayIndex * 0.004,
                            }}
                            viewport={{ once: true }}
                            className="aspect-square w-full rounded-[3px] ring-1 ring-black/5 dark:ring-white/5 hover:ring-primary/40 transition-shadow cursor-default"
                            style={{
                              backgroundColor: colors[Math.min(level, 4)],
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hover cells for daily counts · Data from GitHub public profile
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Less</span>
                  {colors.map((color, index) => (
                    <span
                      key={index}
                      className="w-3 h-3 sm:w-[11px] sm:h-[11px] rounded-[2px] ring-1 ring-black/5 dark:ring-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
