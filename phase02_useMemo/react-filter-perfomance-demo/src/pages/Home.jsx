import PlaygroundCard from "../components/PlaygroundCard";

import { playgroundScreens } from "../utils/dashBoardData.js";

function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold text-slate-800">
          React Performance Playground
        </h1>

        <p className="max-w-3xl text-slate-600">
          Learn React rendering behavior and performance optimization techniques
          step by step.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {playgroundScreens.map((screen) => (
          <PlaygroundCard key={screen.title} {...screen} />
        ))}
      </div>
    </div>
  );
}

export default Home;
