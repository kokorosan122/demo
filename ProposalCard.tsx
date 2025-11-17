import React from 'react';

interface ProposalCardProps {
  onAskClick: () => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ onAskClick }) => {
  return (
    <div className="bg-card rounded-2xl shadow-pink-lg p-6 sm:p-8 max-w-3xl w-full text-center mx-auto transition-transform duration-300 hover:scale-[1.01] animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold">
        Hey <span className="text-accent font-display tracking-wider">Aira</span>, got a question for you 💬
      </h1>
      <p className="text-muted mt-2">I made this tiny page just to ask something...</p>

      <div className="mt-4 bg-white/60 p-4 rounded-xl text-left text-sm sm:text-base leading-relaxed">
        <p>
          I know you said you’re not ready yet and I understand that.<br />
          Love isn’t something we should rush, and I don’t want to pressure you into anything you’re not ready for.<br /><br />
          But I just want to be honest…<br /><br />
          You’ve been on my mind more than I ever expected someone to be. Every time I talk to you and bond with you, it feels like the world slows down a bit and somehow, everything just makes sense.<br />
          Ngayun lang ulit ako na-inlove ng ganito ‘yung totoo, ‘yung ramdam ko sa puso ko.<br />
          I don’t expect anything right now. I just want you to know that I’m here and I’m willing to wait for you, no matter how long it takes.<br />
          Because some people are worth waiting for… and you’re one of them. 💖<br /><br />
          I hope I get to hug you and spend time with you soon even just a simple moment would mean a lot to me. 🤍<br /><br />
          Kahit malayo ka, malayo ako, kaya ‘yan. Distance means nothing when the feeling is real. I trust you no matter what. 💫<br />
          Pero sana… kapag ready ka na, pwede na akong manligaw sayo.🌷
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={onAskClick}
          className="bg-gradient-to-r from-accent to-heart text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-pink focus:outline-none focus:ring-4 focus:ring-accent/50"
        >
          Would you go on a date with me? 💖
        </button>
      </div>
    </div>
  );
};

export default ProposalCard;
