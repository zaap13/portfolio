export async function getGitHubCommits() {
  const response = await fetch('https://api.github.com/search/commits?q=author:zaap13', {
    headers: {
      'Accept': 'application/vnd.github.cloak-preview',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    },
    next: {
      revalidate: 86400
    }
  });

  if (!response.ok) {
    console.error("Failed to fetch GitHub commits", await response.text());
    return 0;
  }

  const data = await response.json();
  return data.total_count;
}