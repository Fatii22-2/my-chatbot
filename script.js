const API_KEY = "AIzaSyDHhvNVVNs1bT9E6GHLAsZ6DE5yVunhWeg"; // Remplace par ta clé
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Fonction pour ajouter un message à l'écran
function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll vers le bas
}

// Fonction pour appeler l'API
async function getBotResponse(prompt) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "Désolé, j'ai un petit problème technique.";
    }
}

// Gestion de l'envoi
sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, true); // Message utilisateur
    userInput.value = "";

    const response = await getBotResponse(text);
    addMessage(response, false); // Réponse du bot
});

// Envoi avec la touche Entrée
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
