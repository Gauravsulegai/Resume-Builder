// === FILE: /server/routes/resumeAiTools.js ===
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const prompts = {
  keywords: (jobDesc, sections) =>
    `Match the following resume content with this job description and suggest important keywords to include:

Job Description:
${jobDesc}

Resume:
${JSON.stringify(sections, null, 2)}

Keywords to add:`,

  parser: (jobDesc) =>
    `Extract the key responsibilities and required skills from the following job description:

${jobDesc}

Return the output in bullet points.`,

  grammar: (sections) =>
    `Fix grammar and improve the language for the following resume sections:

${JSON.stringify(sections, null, 2)}

Return fixed content in the same JSON structure.`,

  bullet: (sections) =>
    `Convert the following resume content into impactful bullet points:

${JSON.stringify(sections, null, 2)}

Return as bullet points in the same section structure.`,
};

router.post("/ai-tools", async (req, res) => {
  const { type, jobDescription, sections } = req.body;
  if (!prompts[type]) return res.status(400).json({ error: "Invalid AI tool type" });

  try {
    const prompt = prompts[type](jobDescription, sections);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const output = completion.data.choices[0].message.content;
    res.json({ output });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "OpenAI processing failed" });
  }
});

module.exports = router;