import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const projects = await db
      .collection("projects")
      .find({})
      .sort({ date: -1 })
      .toArray();

    res.status(200).json(projects);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}
