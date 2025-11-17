import React from 'react';

interface SpotifyPlayerProps {
  isModalOpen: boolean;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ isModalOpen }) => {
  return (
    <div className={`fixed bottom-0 left-0 w-full z-40 transition-opacity duration-500 ${isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-black/80 backdrop-blur-lg p-2 shadow-lg max-w-lg mx-auto rounded-t-lg sm:rounded-lg sm:mb-4">
             <iframe 
                style={{ borderRadius: '8px' }}
                src="https://open.spotify.com/embed/playlist/48hVcFJKu3wdbDVmPDWiJ4?utm_source=generator&autoplay=1"
                width="100%" 
                height="80" 
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            >
            </iframe>
        </div>
    </div>
  );
};

export default SpotifyPlayer;
