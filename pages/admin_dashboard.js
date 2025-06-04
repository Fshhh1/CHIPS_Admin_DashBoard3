
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [authURL, setAuthURL] = useState('/api/auth/github');

  const fetchRepos = () => {
    fetch('/api/github-repos')
      .then((res) => res.json())
      .then((data) => setRepos(data.repos))
      .catch((error) => console.error(error));
  };

  const fetchFileContent = (owner, repo, path) => {
    fetch(`/api/github-file?owner=${owner}&repo=${repo}&path=${path}`)
      .then((res) => res.json())
      .then((data) => setFileContent(data.content))
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 25</h1>

        <a href={authURL} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4 inline-block">
          Connect with GitHub
        </a>

        <button onClick={fetchRepos} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4">
          Fetch My GitHub Repositories
        </button>

        <ul>
          {repos.map((repo) => (
            <li key={repo.name} onClick={() => setSelectedRepo(repo)}>
              <strong>{repo.name}</strong> — {repo.description}
            </li>
          ))}
        </ul>

        {selectedRepo && (
          <div className="mt-4">
            <h2 className="text-xl">Selected Repo: {selectedRepo.name}</h2>
            {/* Example call to fetch a file, hardcoded path to README.md */}
            <button
              onClick={() =>
                fetchFileContent(selectedRepo.owner.login, selectedRepo.name, 'README.md')
              }
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mt-2"
            >
              View README.md
            </button>
            <pre className="bg-gray-800 p-4 mt-2">{fileContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
