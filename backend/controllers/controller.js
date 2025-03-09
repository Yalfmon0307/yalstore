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
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const store = await pool.query("SELECT * FROM store WHERE ownerId = $1", [result.rows[0].id]);

        const payload = {
            user: {
                id: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email,
                store: store.rows[0].id
            },
        };

        const token = jwt.sign(
            { payload},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie("token", token, { httpOnly: true , secure: true, sameSite: "none" }).json({ message: "Login successful" });

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

        if (result.rows.length === 0) {
            return res.status(500).json({ message: "Error creating user" });
        }

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error creating user" });

    }
}

export const createStore = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const ownerId = decodedToken.payload.user.id;

        const { storeName } = req.body;

        if (!storeName) {
            return res.status(400).json({ error: "Missing store name" });
        }

        const result = await pool.query(
            "INSERT INTO store (storeName, ownerId) VALUES ($1, $2) RETURNING *",
            [storeName, ownerId]
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

export const createProduct = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const ownerId = decodedToken.payload.user.id;
        const storeId = decodedToken.payload.user.store;

        const { productName, price } = req.body;

        if (!productName || !price) {
            return res.status(400).json({ error: "Missing product name or price" });
        }

        const image = req.file ? Buffer.from(req.file.buffer) : null;
        
        const result = await pool.query(
            "INSERT INTO products (productName, price, imagen, ownerId, storeId) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [productName, price, image, ownerId, storeId]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
};

