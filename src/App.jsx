import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>

      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <h1 className="text-lg font-bold">Item Manager</h1>
        <div className="space-x-4">
          <Link to="/view-items" className="hover:underline">
            View Items
          </Link>
          <Link to="/add-item" className="hover:underline">
            Add Item
          </Link>
        </div>
      </nav>


      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
