# Ivy-homes
Assignment 

Approach :
Retry Mechanism: The backend includes a retry function (fetchWithRetry) to handle failed API requests.
Error Handling: Logs errors and returns appropriate HTTP status codes.
Frontend Integration: The EJS template allows dynamic data fetching using fetch.
Findings:
API requests sometimes fail, making the retry mechanism crucial.
Ensuring correct query encoding improves API responses.
Tools & Scripts
Node.js & Express.js: Backend framework for handling API requests.
EJS: Template engine for rendering UI dynamically.
node-fetch: Fetching API data in Node.js.
Postman: API testing.
cURL: Manual API testing.
API Requests & DataTotal 
requests made: 50+ (testing across versions v1, v2, v3)
Total records obtained: ~300+ names across different queries.
How to Run:
Install dependencies: npm install express cors node-fetch ejs
Start the server: node app.js (npx nodemon app.js)
Open http://localhost:3000/ in your browser.
