import React, { useState } from "react";
import type { Route } from "./+types/home";
import { OSProvider } from "../context/OSContext";
import PortfolioOS from "../components/PortfolioOS";
import Win12LoginScreen from "../components/Win12LoginScreen";
import Win12LoadingScreen from "../components/Win12LoadingScreen";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ehz OS - Interactive Portfolio Desktop" },
    { name: "description", content: "An interactive desktop-like portfolio showcasing projects, skills, and experience in a unique OS interface." },
  ];
}

type AppState = 'boot' | 'login' | 'desktop';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('boot');

  const handleBootComplete = () => {
    setAppState('login');
  };

  const handleLogin = () => {
    setAppState('desktop');
  };

  // Show boot/loading screen first
  if (appState === 'boot') {
    return <Win12LoadingScreen onComplete={handleBootComplete} />;
  }

  // Show login screen after boot
  if (appState === 'login') {
    return <Win12LoginScreen onLogin={handleLogin} />;
  }

  // Show Portfolio OS after login
  return (
    <OSProvider>
      <PortfolioOS />
    </OSProvider>
  );
}
