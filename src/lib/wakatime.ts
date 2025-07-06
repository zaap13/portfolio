// lib/wakatime.ts
export async function getWakatimeHours() {
  const response = await fetch(`https://wakatime.com/api/v1/users/current/all_time_since_today`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.WAKATIME_API_KEY!).toString('base64')}`
    },
    next: {
      revalidate: 3600
    }
  });

  if (!response.ok) {
    console.error("Failed to fetch Wakatime stats", await response.text());
    return 0;
  }

  const data = await response.json();
  const hours = Math.round(data.data.total_seconds / 3600);
  return hours;
}