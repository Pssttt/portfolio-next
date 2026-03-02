import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Pssttt";

export const revalidate = 86400;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return NextResponse.json(null);

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
    });

    if (!res.ok) return NextResponse.json(null);
    const json = await res.json();
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar ?? null;
    return NextResponse.json(calendar);
  } catch {
    return NextResponse.json(null);
  }
}
