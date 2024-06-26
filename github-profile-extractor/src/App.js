import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const fetchRepos = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
      setError(null);
    } catch (err) {
      setRepos([]);
      setError('User not found or no public repositories');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">GitHub Profile Extractor</h1>
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
          <button
            onClick={fetchRepos}
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            Fetch Repos
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="list-none p-0">
          {repos?.map((repo) => (
            <li key={repo.id} className="mb-2">
              <a href={repo.html_url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
