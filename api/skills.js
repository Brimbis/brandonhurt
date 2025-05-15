import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const skills = await db
      .collection("skills")
      .find({})
      .toArray();

    res.status(200).json(skills);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
}
