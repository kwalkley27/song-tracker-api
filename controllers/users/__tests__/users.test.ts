import supertest from "supertest";
import express from "express";
import { usersRouter } from "../users.router.js";

const app = express();
app.use(express.json());
app.use(usersRouter);

describe("Users API", () => {
  it("GET / should return paginated users", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it("POST / should add a new user with valid API key", async () => {
    const newUser = {
      username: `testuser${Date.now()}`,
      instrument: "Guitar",
    };

    const response = await supertest(app)
      .post("/")
      .set("X-API-Key", "test-key-abcdef")
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', newUser.username);
    expect(response.body).toHaveProperty('instrument', newUser.instrument);
  });

  it("POST / should return 401 without API key", async () => {
    const newUser = {
      username: `testuser${Date.now()}`,
      instrument: "Guitar",
    };

    const response = await supertest(app).post("/").send(newUser);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it("POST / should return 403 with invalid API key", async () => {
    const newUser = {
      username: `testuser${Date.now()}`,
      instrument: "Guitar",
    };

    const response = await supertest(app)
      .post("/")
      .set("X-API-Key", "invalid-key")
      .send(newUser);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('error');
  });

  it("POST / should return a 400 error if required fields are missing", async () => {
    const newUser = {
      username: "testuser",
    };

    const response = await supertest(app)
      .post("/")
      .set("X-API-Key", "test-key-abcdef")
      .send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it("POST / should return a 400 error for invalid username format", async () => {
    const invalidUser = {
      username: "ab", // Too short
      instrument: "Piano",
    };

    const response = await supertest(app)
      .post("/")
      .set("X-API-Key", "test-key-abcdef")
      .send(invalidUser);
    expect(response.status).toBe(400);
  });

  it("POST / should return a 400 error for username with invalid characters", async () => {
    const invalidUser = {
      username: "user@name!", // Invalid characters
      instrument: "Drums",
    };

    const response = await supertest(app)
      .post("/")
      .set("X-API-Key", "test-key-abcdef")
      .send(invalidUser);
    expect(response.status).toBe(400);
  });
});
