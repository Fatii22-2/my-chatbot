// 1. Remplace BIEN cette clé. Si elle ne marche pas, le mode "Démo" prendra le relais.
const API_KEY = "AIzaSyDHhvNVVNs1bT9E6GHLAsZ6DE5yVunhWeg"; 
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Réponses de secours au cas où l'API Google ne répond pas
const backupResponses = [
    "C'est une excellente question sur le Marketing Digital !",
    "En tant qu'assistant, je vous recommande d'analyser vos KPIs.",
    "Le SEO et le SEA sont complémentaires pour votre stratégie.",
    "Avez-vous pensé à optimiser votre tunnel de conversion ?",
    "Je suis actuellement en mode démonstration, mais je peux vous dire que l'IA va transformer le marketing !"
];

function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

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
        
        // Si l'API renvoie une erreur ou pas de résultat
        if (!data.candidates || data.error) {
            throw new Error("API Offline");
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.log("Mode secours activé...");
        // Choisi une réponse au hasard dans la liste de secours
        return backupResponses[Math.floor(Math.random() * backupResponses.length)];
    }
}

sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, true);
    userInput.value = "";

    // Petit délai pour faire "plus humain"
    setTimeout(async () => {
        const response = await getBotResponse(text);
        addMessage(response, false);
    }, 500);
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
