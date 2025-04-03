export async function sendToGist(data: string, description: string, seed: number, date: string): Promise<string | undefined> {
    // Use more explicit dynamic import to prevent TypeScript transformations
    // that might convert this to a require() in the output JavaScript
    const Octokit = (await import('@octokit/rest')).Octokit;

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN, // Token de autenticação do GitHub
    });

    const fileName = `${seed}-${date}.json`;

    const response = await octokit.gists.create({
        files: {
            [fileName]: {
                content: data,
            },
        },
        public: true,
        description: description || "JSON file",
    });

    return response.data.html_url;
}

