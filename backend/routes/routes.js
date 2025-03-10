import { Router } from "express";
import { getAllStore, login, register, createStore, createProduct, getProductStore } from "../controllers/controller.js";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/login", login, (req, res) => {
    res.send("Login");
});

router.post("/register", register, (req, res) => {
    res.send("Register");
});

router.post("/createStore", createStore, (req, res) => {
    res.send("Create Store");
});

router.post("/createProduct", upload.single("file"), createProduct, (req, res) => {
    res.send("Create Product");
});

router.get("/getAllStore", getAllStore, (req, res) => {
    res.send("Get All Store");
});

router.get("/getProductStore", getProductStore, (req, res) => {
    res.send("Get Products Store");
});

router.delete("/deleteProduct", (req, res) => {
    res.send("Delete Product");
});

router.post("/editProduct", (req, res) => {
    res.send("Edit Product");
})

export default router;