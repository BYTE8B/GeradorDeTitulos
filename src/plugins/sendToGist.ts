

export async function sendToGist(data: string, description: string, seed: number, date: string): Promise<string | undefined> {
    // Importação dinâmica
    const { Octokit } = await import('@octokit/rest');
    
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

