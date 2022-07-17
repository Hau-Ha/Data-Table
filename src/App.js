import "./App.css";
import { Table } from "./Pages/Table/Table";
import { SingleUser } from "./Pages/SingleUser/SingleUser.js";
import React from "react";
import { Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/:userId" element={<SingleUser />} />
      </Routes>
    </div>
  );
}
