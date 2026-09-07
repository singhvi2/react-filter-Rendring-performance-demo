import { Link } from "react-router-dom";

function PlaygroundCard({ title, description, route }) {
  return (
    <Link to={route}>
      <div
        className="
          h-full
          rounded-xl
          border
          bg-white
          p-5
          shadow-sm
          transition-all
          hover:-translate-y-1
          hover:shadow-lg
        "
      >
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>

        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </Link>
  );
}

export default PlaygroundCard;
