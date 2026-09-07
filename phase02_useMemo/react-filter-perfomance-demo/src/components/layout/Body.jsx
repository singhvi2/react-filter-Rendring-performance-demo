import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Body() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Navbar />

      <main className="container mx-auto flex-1 px-4 py-6 md:px-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Body;