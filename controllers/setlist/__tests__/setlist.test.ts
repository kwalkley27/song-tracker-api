import supertest from "supertest";
import express from "express";
import { setlistRouter } from "../setlist.router.js";

const app = express();
app.use(express.json());
app.use(setlistRouter);

describe("Setlist API", () => {
  it("GET /:userId should return a setlist for a user", async () => {
    const response = await supertest(app).get("/1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /:userId should return 400 for invalid userId", async () => {
    const response = await supertest(app).get("/invalid");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it("GET /:userId should return 400 for negative userId", async () => {
    const response = await supertest(app).get("/-1");
    expect(response.status).toBe(400);
  });

  it("GET /:userId should accept limit query parameter", async () => {
    const response = await supertest(app).get("/1?limit=3");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(3);
  });

  it("GET /:userId should return 400 for invalid limit", async () => {
    const response = await supertest(app).get("/1?limit=200"); // Over max
    expect(response.status).toBe(400);
  });

  it("GET /:userId should return 400 for negative limit", async () => {
    const response = await supertest(app).get("/1?limit=-5");
    expect(response.status).toBe(400);
  });
});
