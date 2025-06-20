async function sendToGemini() {
    const inputText = document.getElementById('inputText').value;  
    const geminiResponse = document.getElementById('geminiResponse');  
    const cohereResponse = document.getElementById('cohereResponse');  
    const sentimentDisplay = document.getElementById('sentimentDisplay');  
    const loader = document.getElementById('loader');  


    const geminiApiKey = "AIzaSyCli-cPfcAGILoc2w8twnlaLdpAv2oSgJc";  
    const cohereApiKey = "0Lvq24f3Y8uhnS9XTYHrvQfxoC66mkQXVDVEQBq4";  

    if (!inputText.trim()) {
        geminiResponse.textContent = "Por favor, ingresa algún texto.";  
        cohereResponse.textContent = "Por favor, ingresa algún texto.";  
        sentimentDisplay.textContent = "";
        return;
    }

    geminiResponse.textContent = "";  
    cohereResponse.textContent = "";  
    sentimentDisplay.textContent = "";  
    loader.style.display = 'block';  

    const sentimentPrompt = `Analiza el siguiente texto en español y clasifícalo como "Positivo" o "Negativo" basándote únicamente en si contiene lenguaje ofensivo, grosero o muy despectivo. Si no contiene este tipo de lenguaje, clasifícalo como "Positivo". Responde solo con la palabra "Positivo" o "Negativo", sin explicaciones adicionales. Texto: "${inputText}"`;
    const sentimentResult = await getGeminiSentiment(sentimentPrompt, geminiApiKey);

    sentimentDisplay.textContent = `Sentimiento detectado (por IA): ${sentimentResult}`;
    if (sentimentResult.toLowerCase() === "negativo") {
        sentimentDisplay.classList.add('negative');
    } else {
        sentimentDisplay.classList.remove('negative');
    }

    await Promise.all([
        getGeminiResponse(inputText, geminiApiKey, geminiResponse),  
        getCohereResponse(inputText, cohereApiKey, cohereResponse),  
    ]);

    loader.style.display = 'none';
}

async function getGeminiSentiment(prompt, apiKey) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;  
    const body = { contents: [{ parts: [{ text: prompt }] }] };  

    try {
        const response = await fetch(API_URL, {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json' },  
            body: JSON.stringify(body)  
        });

        const data = await response.json();  
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;  

        if (text) {
            const cleanedText = text.trim().toLowerCase();
            if (cleanedText.includes("negativo")) {
                return "Negativo";
            }

            return "Positivo"; 
        }
        return "Error";
    } catch (error) {
        console.error("Error al obtener sentimiento de Gemini:", error);  
        return "Error al analizar sentimiento.";
    }
}

Gemini (original)
async function getGeminiResponse(prompt, apiKey, outputElement) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;  
    const body = { contents: [{ parts: [{ text: prompt }] }] };  

    try {
        const response = await fetch(API_URL, {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json' },  
            body: JSON.stringify(body)  
        });

        const data = await response.json();  
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;  
        outputElement.textContent = text || "Respuesta vacía o inesperada de Gemini.";  

    } catch (error) {
        console.error("Gemini error:", error);  
        outputElement.textContent = "Error al conectar con Gemini.";  
    }
}

Cohere (original)
async function getCohereResponse(prompt, apiKey, outputElement) {
    const API_URL = "https://api.cohere.ai/v1/chat";  
    const body = {
        message: prompt,  
        model: "command-r-plus",  
        temperature: 0.7  
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',  
                'Authorization': `Bearer ${apiKey}`  
            },
            body: JSON.stringify(body)  
        });

        const data = await response.json();  
        const text = data?.text || data?.generations?.[0]?.text;  
        outputElement.textContent = text || "Respuesta vacía o inesperada de Cohere.";  

    } catch (error) {
        console.error("Cohere error:", error);  
        outputElement.textContent = "Error al conectar con Cohere.";  
    }
}