const express = require("express");
const { pool } = require("../config/dbConfig");

const app = express();

app.get("/users/bible", async (req, res) => {
	try {
		const { rows } = await pool.query(`SELECT * FROM englishbible`);

		res.json(rows);
	} catch {
		console.error("Error fetching books:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}

	console.log({ rows });
});
