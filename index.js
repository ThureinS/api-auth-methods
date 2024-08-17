import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "trs";
const yourPassword = "trs123";
const yourAPIKey = "fe091a43-56c3-4d0b-9f72-480ea0b95caf";
const yourBearerToken = "8e060a2a-57ff-49cb-a824-c970a6a70a15";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const result = await axios.get(API_URL + "random");
  const data = JSON.stringify(result.data);
  res.render(__dirname + "/views/index.ejs", { content: data });
});

app.get("/basicAuth", async (req, res) => {
  const result = await axios.get(API_URL + "all/?page=2", {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  const data = JSON.stringify(result.data);
  res.render(__dirname + "/views/index.ejs", { content: data });
});

app.get("/apiKey", async (req, res) => {
  const result = await axios.get(
    `${API_URL}filter/?score=5&apiKey=${yourAPIKey}`
  );
  const data = JSON.stringify(result.data);
  res.render(__dirname + "/views/index.ejs", { content: data });
});

app.get("/bearerToken", async (req, res) => {
  const result = await axios.get(API_URL + "secrets/42", {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });
  const data = JSON.stringify(result.data);
  res.render(__dirname + "/views/index.ejs", {
    content: data,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
