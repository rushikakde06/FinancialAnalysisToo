// src/components/Header.js
import React from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Maersk Q2 2025 Interim Report
        </h1>
        <span className="text-sm opacity-90">Financial Analysis Tool</span>
      </div>
    </header>
  );
}