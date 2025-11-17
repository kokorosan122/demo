document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const askButton = document.getElementById('ask-button');
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const mainCloseButton = document.getElementById('modal-close-button-main');
    
    const contentSections = {
        ask: document.getElementById('modal-content-ask'),
        yes: document.getElementById('modal-content-yes'),
        response: document.getElementById('modal-content-response'),
        success: document.getElementById('modal-content-success'),
    };

    const actionButtons = {
        yes: document.getElementById('yes-btn'),
        maybe: document.getElementById('maybe-btn'),
        no: document.getElementById('no-btn'),
        saveDate: document.getElementById('save-date-btn'),
    };

    const backToAskButtons = document.querySelectorAll('.back-to-ask-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal-btn');

    const dateInput = document.getElementById('date-input');
    const timeInput = document.getElementById('time-input');
    const locationInput = document.getElementById('location-input');
    const responseMessage = document.getElementById('response-message');
    const askButtonsContainer = document.getElementById('ask-buttons');
    const spotifyPlayer = document.getElementById('spotify-player');

    // --- State ---
    let noButtonScale = 1;

    // --- Functions ---
    const openModal = (content) => {
        modalContainer.classList.remove('hidden');
        spotifyPlayer.classList.add('opacity-0', 'pointer-events-none');
        renderContent(content);
    };

    const closeModal = () => {
        modalContainer.classList.add('hidden');
        spotifyPlayer.classList.remove('opacity-0', 'pointer-events-none');
        // Hide all content sections to reset for next open
        Object.values(contentSections).forEach(section => section.classList.add('hidden'));
    };

    const renderContent = (content) => {
        // Hide all first
        Object.values(contentSections).forEach(section => section.classList.add('hidden'));
        // Show the correct one
        if (contentSections[content]) {
            contentSections[content].classList.remove('hidden');
        }
    };

    const updateSaveButtonState = () => {
        actionButtons.saveDate.disabled = !dateInput.value || !timeInput.value;
    };

    const createGoogleEvent = () => {
        const title = encodeURIComponent("Date with Marc 💕");
        const description = encodeURIComponent("Can't wait to see you 😍");
        const loc = locationInput.value ? `&location=${encodeURIComponent(locationInput.value)}` : "";
        
        const start = new Date(`${dateInput.value}T${timeInput.value}:00`);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

        const toUTC = (date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${toUTC(start)}/${toUTC(end)}&details=${description}${loc}`;
        
        window.open(url, "_blank");
        renderContent('success');
    };

    const handleNoHover = () => {
        actionButtons.yes.style.transform = `scale(1.1)`;
        noButtonScale = Math.max(0.6, noButtonScale * 0.95);
        actionButtons.no.style.transform = `scale(${noButtonScale})`;
    };

    const resetButtons = () => {
       actionButtons.yes.style.transform = `scale(1)`;
       noButtonScale = 1;
       actionButtons.no.style.transform = `scale(1)`;
    };

    // --- Event Listeners ---
    askButton.addEventListener('click', () => openModal('ask'));

    mainCloseButton.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    closeModalButtons.forEach(btn => btn.addEventListener('click', closeModal));

    actionButtons.yes.addEventListener('click', () => renderContent('yes'));
    actionButtons.saveDate.addEventListener('click', createGoogleEvent);

    actionButtons.maybe.addEventListener('click', () => {
        responseMessage.textContent = "That's okay! I'll take that as a soft yes 😏";
        renderContent('response');
    });

    actionButtons.no.addEventListener('click', () => {
        responseMessage.textContent = "Oh no 😅 Guess I’ll become a priest now 🧘‍♂️";
        renderContent('response');
    });

    backToAskButtons.forEach(btn => {
        btn.addEventListener('click', () => renderContent('ask'));
    });

    dateInput.addEventListener('input', updateSaveButtonState);
    timeInput.addEventListener('input', updateSaveButtonState);

    actionButtons.no.addEventListener('mouseover', handleNoHover);
    askButtonsContainer.addEventListener('mouseleave', resetButtons);
    
    // Initial call to render icons
    lucide.createIcons();
});
