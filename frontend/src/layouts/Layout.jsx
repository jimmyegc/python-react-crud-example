import React from "react";
import "./Layout.css";
import { Header } from '../components/Header'
export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* <header className="layout-header">
        <h1>Mi Aplicación</h1>
      </header> */}

      <main className="flex-1 p-5">
        {children}
      </main>

      <footer className="bg-[#222] text-white text-center p-3">
        <p>© 2025 - nmda solutions</p>
      </footer>
    </div>
  );
};
