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


async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    // Mostrar mensaje del usuario
    addMessage(text, "user");

    input.value = "";

    // Mostrar "pensando..."
    addMessage("Pensando... 🧠", "ai");

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });

        const data = await response.json();

        // Eliminar "Pensando..."
        const messages = document.querySelectorAll(".message");

        messages[messages.length - 1].remove();

        if (!response.ok) {

            addMessage(
                "Hubo un problema al contactar con mi cerebro 😵",
                "ai"
            );

            console.error(data);

            return;
        }

        addMessage(data.reply, "ai");

    } catch (error) {

        console.error(error);

        const messages = document.querySelectorAll(".message");

        messages[messages.length - 1].remove();

        addMessage(
            "No pude conectarme con el servidor. 😕",
            "ai"
        );
    }
}


button.addEventListener("click", sendMessage);


input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
