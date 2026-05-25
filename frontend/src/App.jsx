import { useState } from "react";

function App() {

  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRepositories = async () => {

    setLoading(true);

    const response = await fetch(
      `http://localhost:8080/api/repositories/search?keyword=${keyword}`
    );

    const data = await response.json();

    setRepositories(
      Array.isArray(data) ? data : []
    );

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gray-950 text-white p-8">

      <h1 className="text-5xl font-bold text-center mb-10 text-blue-400">
        RepoSense
      </h1>

      <div className="flex justify-center gap-3 mb-10">

        <input
          type="text"
          placeholder="Search repositories..."
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          className="
            w-[400px]
            p-3
            rounded-lg
            bg-gray-800
            border
            border-gray-700
            outline-none
          "
        />

        <button
          onClick={searchRepositories}
          className="
            bg-blue-500
            hover:bg-blue-600
            px-6
            rounded-lg
            font-semibold
          "
        >
          Search
        </button>

      </div>

      {loading && (
        <p className="text-center text-gray-400">
          Searching...
        </p>
      )}

      <div className="grid gap-6">

        {repositories.map((repo) => (

          <div
            key={repo.id}
            className="
              bg-gray-900
              border
              border-gray-800
              p-6
              rounded-xl
              hover:border-blue-500
              transition
            "
          >

            <h2 className="text-2xl font-bold text-blue-400">
              {repo.repoName}
            </h2>

            <p className="text-gray-300 mt-3">
              {repo.description}
            </p>

            <div className="flex gap-6 mt-4 text-gray-400">

              <p>
                ⭐ {repo.stars}
              </p>

              <p>
                {repo.language}
              </p>

              <p>
                Score: {repo.score}
              </p>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;