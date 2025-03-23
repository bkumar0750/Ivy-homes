const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());

// Serve static files if needed
app.use(express.static(path.join(__dirname, "public")));

// Retry function for API requests
async function fetchWithRetry(url, retries = 3, delay = 1000) {
    const fetch = (await import("node-fetch")).default;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Retry ${i + 1}/${retries} failed:`, error);
            await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
    }
    throw new Error("Max retries reached");
}

// API Endpoint for autocomplete
app.get("/ivy", async (req, res) => {
    const query = req.query.q;
    const version = req.query.version || "v1" || "v2" || "v3"; // Default to v1 if not provided

    if (!query) {
        return res.status(400).json({ error: "Query required" });
    }

    try {
        const apiUrl = `http://35.200.185.69:8000/${version}/autocomplete?query=${query}`;
        console.log(`Fetching data from: ${apiUrl}`);
        
        const data = await fetchWithRetry(apiUrl);

        res.json(data);
    } catch (error) {
        console.error(`Error fetching ${version} data:`, error);
        res.status(500).json({ error: `Failed to fetch ${version} data` });
    }
});

// Render the EJS file
app.get("/", (req, res) => {
    res.render("ivy"); // Ensure you have "views/ivy.ejs"
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
