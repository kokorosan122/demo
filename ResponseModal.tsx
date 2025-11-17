import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Heart, Send } from 'lucide-react';
import { ModalContent } from '../types';

interface ResponseModalProps {
    content: ModalContent;
    setContent: (content: ModalContent) => void;
    onClose: () => void;
}

const ResponseModal: React.FC<ResponseModalProps> = ({ content, setContent, onClose }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('19:00');
    const [location, setLocation] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [noButtonScale, setNoButtonScale] = useState(1);

    useEffect(() => {
        setIsSaveDisabled(!date || !time);
    }, [date, time]);

    const createGoogleEvent = () => {
        const title = encodeURIComponent("Date with Marc 💕");
        const description = encodeURIComponent("Can't wait to see you 😍");
        const loc = location ? `&location=${encodeURIComponent(location)}` : "";

        const start = new Date(`${date}T${time}:00`);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

        const toUTC = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${toUTC(start)}/${toUTC(end)}&details=${description}${loc}`;

        window.open(url, "_blank");
        setContent('success');
    };
    
    const handleNoHover = () => {
      // Shrink 'No', grow 'Yes' a bit
      const yesBtn = document.getElementById('yesBtn');
      if (yesBtn) {
        yesBtn.style.transform = `scale(1.1)`;
      }
      setNoButtonScale(prev => Math.max(0.6, prev * 0.95));
    };

    const resetButtons = () => {
       const yesBtn = document.getElementById('yesBtn');
       if (yesBtn) {
         yesBtn.style.transform = `scale(1)`;
       }
       setNoButtonScale(1);
    }

    const renderContent = () => {
        switch (content) {
            case 'ask':
                return (
                    <div className="text-center animate-fade-in-up" onMouseLeave={resetButtons}>
                        <h2 className="text-2xl font-bold text-text-main mb-4">So... would you go on a date with me? 😊</h2>
                        <div className="flex gap-4 justify-center items-center mt-4">
                            <button id="yesBtn" onClick={() => setContent('yes')} className="bg-gradient-to-r from-accent to-heart text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform duration-300 hover:scale-105">Yes 💕</button>
                            <button onClick={() => setContent('maybe')} className="bg-gradient-to-r from-pink-300 to-rose-300 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform duration-300 hover:scale-105">Maybe 🤔</button>
                            <button onMouseOver={handleNoHover} style={{transform: `scale(${noButtonScale})`}} onClick={() => setContent('no')} className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform duration-300 hover:scale-105">No 😅</button>
                        </div>
                    </div>
                );
            case 'yes':
                return (
                    <div className="text-center animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center justify-center gap-2">Yay! Let's plan it <Heart className="text-heart" /></h2>
                        <div className="space-y-4 my-6 text-left">
                           <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-rose-200 rounded-lg focus:ring-accent focus:border-accent" />
                           </div>
                           <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-rose-200 rounded-lg focus:ring-accent focus:border-accent" />
                           </div>
                           <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                                <input type="text" placeholder="Where? (e.g. Our favorite café ☕)" value={location} onChange={e => setLocation(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-rose-200 rounded-lg focus:ring-accent focus:border-accent" />
                           </div>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button onClick={createGoogleEvent} disabled={isSaveDisabled} className="flex items-center gap-2 bg-gradient-to-r from-accent to-heart text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                Save Our Date <Send size={18} />
                            </button>
                            <button onClick={() => setContent('ask')} className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-full transition-colors duration-300 hover:bg-gray-300">Back</button>
                        </div>
                    </div>
                );
            case 'maybe':
            case 'no':
                 const message = content === 'maybe' 
                    ? "That's okay! I'll take that as a soft yes 😏" 
                    : "Oh no 😅 Guess I’ll become a priest now 🧘‍♂️";
                return (
                     <div className="text-center animate-fade-in-up">
                        <p className="text-lg text-text-main mb-4">{message}</p>
                        <div className="flex gap-4 justify-center mt-4">
                            <button onClick={() => setContent('ask')} className="bg-accent text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform duration-300 hover:scale-105">Let me reconsider...</button>
                            <button onClick={onClose} className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-full transition-colors duration-300 hover:bg-gray-300">Close</button>
                        </div>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center animate-fade-in-up">
                         <Heart className="mx-auto text-heart animate-pulse" size={48} />
                         <h2 className="text-2xl font-bold text-text-main mt-4 mb-2">It's a date!</h2>
                         <p className="text-muted mb-6">The event has been opened in your Google Calendar. Can't wait! ❤️</p>
                         <button onClick={onClose} className="bg-gradient-to-r from-accent to-heart text-white font-bold py-2 px-8 rounded-full shadow-md transition-transform duration-300 hover:scale-105">Awesome!</button>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!content) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-card rounded-2xl shadow-pink-lg p-6 sm:p-8 w-full max-w-md">
                 <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-accent transition-colors">
                    <X size={24} />
                 </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default ResponseModal;
