import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { password } = req.body;

  if (!password || password !== process.env.SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const messages = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({ messages });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}
