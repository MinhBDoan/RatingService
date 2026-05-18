const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let ratings = [];

// Add rating
app.post("/ratings", (req, res) => {
    const { userId, rating } = req.body;

    ratings.push({ userId, rating });

    res.json({ message: "Rating added successfully" });
});

// Get the average rating
app.get("/ratings/average", (req, res) => {
    if (ratings.length === 0) {
        return res.json({ average: 0 });
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / ratings.length;

    res.json({ average: avg });
});

// Delete rating
app.delete("/ratings/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);

    ratings = ratings.filter(r => r.userId !== userId);

    res.json({ message: "Rating deleted" });
});

app.listen(PORT, () => {
    console.log(`Rating service running on http://localhost:${PORT}`);
});