const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("PABLO YUKUTALA AI fonctionne !");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Écris un message pour commencer."
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Tu es PABLO YUKUTALA AI, un assistant intelligent, utile et respectueux. Réponds dans la langue utilisée par l'utilisateur."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });
  } catch (error) {
    console.error("Erreur IA :", error.message);
    res.status(500).json({
      error: "Impossible de répondre pour le moment. Vérifie la configuration du serveur."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PABLO YUKUTALA AI démarré sur le port ${PORT}`);
});
