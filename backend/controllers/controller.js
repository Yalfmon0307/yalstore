import pool from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Missing username or password" });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign(
            { user: result.rows[0]},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie("token", token, { httpOnly: true , secure: false, sameSite: "none" }).json({ message: "Login successful" });

    } catch (error) {
        console.log(error);
    }
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Missing username, email, or password" });
        }

        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, password]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
}

export const createStore = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.user.id;

        const { storeName } = req.body;

        if (!storeName) {
            return res.status(400).json({ error: "Missing store name" });
        }

        const result = await pool.query(
            "INSERT INTO store (storeName, ownerId) VALUES ($1, $2) RETURNING *",
            [storeName, userId]
        );

        res.status(201).json(result.rows[0]);
} catch (error) {
    console.log(error);
}

}
export const getAllStore = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM store");
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
    }
};
