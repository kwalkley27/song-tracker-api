import supertest from "supertest";
import express from "express";
import { playedSongsRouter } from "../playedsongs.router.js";

const app = express();
app.use(express.json());
app.use(playedSongsRouter);

describe("PlayedSongs API", () => {
  it("GET / should return all played songs", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("POST / should add a new played song", async () => {
    const newPlayedSong = {
      userId: 1,
      songId: 1,
      score: 85,
    };

    const response = await supertest(app).post("/").send(newPlayedSong);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', newPlayedSong.userId);
    expect(response.body).toHaveProperty('songId', newPlayedSong.songId);
    expect(response.body).toHaveProperty('score', newPlayedSong.score);
  });

  it("POST / should return a 400 error if required fields are missing", async () => {
    const invalidPlayedSong = {
      userId: 1,
      songId: 1,
    };

    const response = await supertest(app).post("/").send(invalidPlayedSong);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it("POST / should return a 400 error for invalid score range", async () => {
    const invalidPlayedSong = {
      userId: 1,
      songId: 1,
      score: 150, // Out of range
    };

    const response = await supertest(app).post("/").send(invalidPlayedSong);
    expect(response.status).toBe(400);
  });

  it("POST / should return a 400 error for negative score", async () => {
    const invalidPlayedSong = {
      userId: 1,
      songId: 1,
      score: -10,
    };

    const response = await supertest(app).post("/").send(invalidPlayedSong);
    expect(response.status).toBe(400);
  });

  it("GET /latest/:userId should return latest played songs for a user", async () => {
    const response = await supertest(app).get("/latest/1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /latest/:userId should return 400 for invalid userId", async () => {
    const response = await supertest(app).get("/latest/invalid");
    expect(response.status).toBe(400);
  });
});
