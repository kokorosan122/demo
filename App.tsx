import React, { useState } from 'react';
import ProposalCard from './components/ProposalCard';
import ResponseModal from './components/ResponseModal';
import SpotifyPlayer from './components/SpotifyPlayer';
import { ModalContent } from './types';

export default function App() {
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  const openModal = (content: ModalContent) => {
    // We don't want to set null, so we check for it.
    if (content) {
        setModalContent(content);
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="bg-background min-h-screen font-sans text-text-main flex flex-col items-center justify-center p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100 to-background z-0"></div>
        <div className="hearts-container">
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
        </div>
        <main className="z-10 w-full">
            <ProposalCard onAskClick={() => openModal('ask')} />
            {modalContent && (
                <ResponseModal
                    content={modalContent}
                    setContent={setModalContent}
                    onClose={closeModal}
                />
            )}
        </main>
        <SpotifyPlayer isModalOpen={!!modalContent} />
        <footer className="absolute bottom-4 text-center text-muted text-sm z-10">
            Made with <span className="text-heart">♥</span> just for you. Use PC for best experience 💻
        </footer>
    </div>
  );
}