export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método no permitido"
        });
    }

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "No recibí ningún mensaje"
            });
        }

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                },

                body: JSON.stringify({
                    model: "gpt-5.6-luna",

                    instructions: `
                        Tu nombre es Lunes.

                        Eres el asistente personal del usuario.

                        Hablas principalmente en español.

                        Eres amable, inteligente, directo
                        y puedes usar un poco de humor.

                        Si el usuario pregunta tu nombre,
                        responde que te llamas Lunes.

                        Nunca digas que tu nombre es Elias AI.
                    `,

                    input: message
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(data);

            return res.status(response.status).json({
                error: "Error al comunicarse con la IA"
            });
        }

        return res.status(200).json({
            reply: data.output_text
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}
