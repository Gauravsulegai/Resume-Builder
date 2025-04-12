// === FILE: /server/routes/resumeRoutes.js ===
const router = require("express").Router();
const Resume = require("./models/Resume");
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

router.get("/", async (req, res) => {
  const resumes = await Resume.find({ userId: req.user._id });
  res.json(resumes);
});

router.post("/", async (req, res) => {
  const newResume = new Resume({ userId: req.user._id, ...req.body });
  await newResume.save();
  res.status(201).json(newResume);
});

router.post("/optimize", async (req, res) => {
  const { jobDescription, resumeContent } = req.body;

  const prompt = `Improve this resume content for the job: ${jobDescription}\n\n${resumeContent}`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  res.json({ optimized: response.data.choices[0].message.content });
});

module.exports = router;