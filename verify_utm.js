const fs = require("fs");
const path = require("path");

// Read the actual file
const filePath = path.join(__dirname, "src/pages/api/send-enquiry.js");
let fileContent = fs.readFileSync(filePath, "utf8");

// Strip "export default" to make it runnable in this script context
fileContent = fileContent.replace(
  "export default async function handler",
  "async function handler",
);

// Mock process.env
process.env.PARAMANTRA_API_KEY = "test_key";
process.env.PARAMANTRA_APP_NAME = "test_app";

// Mock fetch
global.fetch = async (url, options) => {
  console.log("\n--- FETCH CALL ---");
  console.log("URL:", url);
  console.log("Method:", options.method);
  console.log("Headers:", options.headers);
  console.log("Body:", options.body);

  // Parse body to verify content
  const params = new URLSearchParams(options.body);
  console.log("\n--- PARSED BODY PARAMS ---");
  for (const [key, value] of params.entries()) {
    console.log(`${key}: ${value}`);
  }

  return {
    json: async () => ({ status: "success", data: "mock_data" }),
  };
};

// Mock req and res
const req = {
  method: "POST",
  body: {
    name: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "summer_sale",
    utm_ad_group: "ad_group_1",
    utm_term: "luxury homes",
    utm_device: "mobile",
    utm_placement: "feed",
    utm_ad_name: "banner_ad",
    gclid: "test_gclid_123",
  },
};

const res = {
  status: (code) => {
    console.log("\n--- RESPONSE STATUS ---");
    console.log("Code:", code);
    return res;
  },
  json: (data) => {
    console.log("\n--- RESPONSE JSON ---");
    console.log(data);
    return res;
  },
};

// Execute the code
console.log("Executing handler with mock request...");

// Wrap in an async IIFE to allow await if needed, but handler is async
(async () => {
  try {
    // Evaluate the modified file content to define the handler function in this scope
    // We append a call to handler(req, res) at the end
    const runnableCode = fileContent + "\n; handler(req, res);";
    await eval(runnableCode);
  } catch (error) {
    console.error("Error executing handler:", error);
  }
})();
