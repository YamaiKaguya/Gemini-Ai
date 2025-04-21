const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
	const { message } = req.body;
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

	try {
		const result = await model.generateContent(message);
		const response = await result.response;
		res.json({ reply: await response.text() });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

// app.get("/", (req, res) => {
// 	res.send(`
//       <h1>Gemini Chat API</h1>
//       <p>Use <code>/chat</code> endpoint with POST requests to interact with Gemini.</p>
//    `);
// });
