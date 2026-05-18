const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Add rating
async function addRating() {
    const response = await fetch("http://localhost:3000/ratings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: 1,
            rating: 5
        })
    });

    const data = await response.json();
    console.log("Add:", data);
}

// Get average
async function getAverage() {
    const response = await fetch("http://localhost:3000/ratings/average");
    const data = await response.json();
    console.log("Average:", data);
}

// Delete rating
async function deleteRating() {
    const response = await fetch("http://localhost:3000/ratings/1", {
        method: "DELETE"
    });

    const data = await response.json();
    console.log("Delete:", data);
}

// Running each test
async function runTest() {
    await addRating();
    await getAverage();
    await deleteRating();
    await getAverage();
}

runTest();