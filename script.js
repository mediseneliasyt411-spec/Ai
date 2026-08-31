const input = document.getElementById("userInput");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    message.innerHTML = `
        <div class="avatar">
            ${type === "ai" ? "🤖" : "👤"}
        </div>

        <div class="bubble">
            ${text}
        </div>
    `;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}


function respond(text) {

    const message = text.toLowerCase();

    let response;

    if (message.includes("hola")) {

        response = "¡Hola! 😎 Soy Lunes.";

    } 
    
    else if (message.includes("cómo estás") ||
             message.includes("como estas")) {

        response = "Estoy funcionando perfectamente 🤖🔥";

    } 
    
    else if (message.includes("tu nombre") ||
             message.includes("quién eres") ||
             message.includes("quien eres")) {

        response = "Soy Elias AI, tu asistente personal.";

    } 
    
    else if (message.includes("adiós") ||
             message.includes("adios")) {

        response = "¡Nos vemos! 👋";

    } 
    
    else {

        response =
            "Todavía estoy aprendiendo 🧠. " +
            "Pronto podremos conectarme a una IA real.";

    }

    setTimeout(() => {

        addMessage(response, "ai");

    }, 500);
}


function sendMessage() {

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    addMessage(text, "user");

    input.value = "";

    respond(text);
}


button.addEventListener("click", sendMessage);


input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});
