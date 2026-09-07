import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/AppRouter.jsx";

function App() {
  // <h1 className="text-2xl ">Hello this is App</h1>;
  return <RouterProvider router={router} />;
}

export default App;
