import supertest from "supertest";
import express from "express";
import { songsRouter } from "../songs.router.js";

const app = express();
app.use(express.json());
app.use(songsRouter);

describe("Songs API", () => {
  it("GET / should return all songs", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("POST / should add a new song", async () => {
    const newSong = {
      artist: "Test Artist",
      title: "Test Title",
      length: 180,
      genre: "Test Genre",
    };

    const response = await supertest(app).post("/").send(newSong);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newSong);
  });

  it("POST / should return a 400 error if required fields are missing", async () => {
    const newSong = {
      artist: "Test Artist",
      title: "Test Title",
    };

    const response = await supertest(app).post("/").send(newSong);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it("POST / should return a 400 error for invalid data types", async () => {
    const invalidSong = {
      artist: "Test Artist",
      title: "Test Title",
      length: "not a number", // Invalid type
      genre: "Test Genre",
    };

    const response = await supertest(app).post("/").send(invalidSong);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it("POST / should return a 400 error for negative song length", async () => {
    const invalidSong = {
      artist: "Test Artist",
      title: "Test Title",
      length: -10,
      genre: "Test Genre",
    };

    const response = await supertest(app).post("/").send(invalidSong);
    expect(response.status).toBe(400);
  });
});
