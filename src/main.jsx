import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import AddItem from "./pages/AddItem.jsx";
import ViewItems from "./pages/ViewItems.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/view-items" />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="view-items" element={<ViewItems />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
