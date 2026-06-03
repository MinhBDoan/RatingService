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
    const { userId, itemId, rating } = req.body;

    // if check for required fields 
    if (userId === undefined || itemId === undefined || rating === undefined) {
    return res.status(400).json({
        message: "userId, itemId, and rating are required"
    });
}

    const numericUserId = Number(userId);
    const numericItemId = Number(itemId);
    const numericRating = Number(rating);

    // converted rating validation
    if (Number.isNaN(numericRating) || Number.isNaN(numericUserId) || Number.isNaN(numericItemId)) {
        return res.status(400).json({
            message: "userId, itemId, and rating must be valid numbers"
        });
    }

    // validation for range
    if (numericRating < 1 || numericRating > 5) {
        return res.status(400).json({
            message: "rating must be between 1 and 5"
        });
    }

    ratings.push({
        userId: numericUserId,
        itemId: numericItemId,
        rating: numericRating
    });

    res.json({ message: "Rating added successfully" });
});

// Get the average rating
app.get("/ratings/average/:itemId", (req, res) => {
    const itemId = Number(req.params.itemId);

    if (Number.isNaN(itemId)) {
        return res.status(400).json({
            message: "itemId must be a valid number"
        });
    }

    const itemRatings = ratings.filter(r => r.itemId === itemId);

    if (itemRatings.length === 0) {
        return res.json({
            itemId,
            average: 0,
            count: 0
        });
    }

    const sum = itemRatings.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / itemRatings.length;

    res.json({
        itemId,
        average: avg,
        count: itemRatings.length
    });
});

// Delete rating
app.delete("/ratings/:itemId/:userId", (req, res) => {
    const itemId = Number(req.params.itemId);
    const userId = Number(req.params.userId);

    if (Number.isNaN(itemId) || Number.isNaN(userId)) {
        return res.status(400).json({
            message: "itemId and userId must be valid numbers"
        });
    }

    const initialLength = ratings.length;

    ratings = ratings.filter(r => 
        !(r.itemId === itemId && r.userId === userId)
    );

    if (ratings.length === initialLength) {
        return res.status(404).json({
            message: "Rating not found"
        });
    }

    res.json({
        message: "Rating deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Rating service running on http://localhost:${PORT}`);
});