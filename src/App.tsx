import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GameModes } from './components/GameModes';
import { CharacterAndArsenal } from './components/CharacterAndArsenal';
import { LoadoutSimulator } from './components/LoadoutSimulator';
import { TacticalMap } from './components/TacticalMap';
import { SystemSpecs } from './components/SystemSpecs';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { GameplayModal } from './components/GameplayModal';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [gameplayModalOpen, setGameplayModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F0F12] text-slate-100 flex flex-col selection:bg-[#FFB800] selection:text-black">
      {/* Navigation Header */}
      <Navbar onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          onOpenDownload={() => setDownloadModalOpen(true)}
          onOpenGameplay={() => setGameplayModalOpen(true)}
        />

        {/* 2. Game Modes Showcase */}
        <GameModes />

        {/* 3. Character Abilities & Weapon Arsenal */}
        <CharacterAndArsenal />

        {/* 4. Interactive Bermuda Tactical Map Drop Zone Selector */}
        <TacticalMap />

        {/* 5. Interactive Loadout Simulator */}
        <LoadoutSimulator />

        {/* 6. System Requirements & Download Center */}
        <SystemSpecs onOpenDownload={() => setDownloadModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      <GameplayModal
        isOpen={gameplayModalOpen}
        onClose={() => setGameplayModalOpen(false)}
      />
    </div>
  );
}
