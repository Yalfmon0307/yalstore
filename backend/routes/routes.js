import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/login", (req, res) => {
    res.send("Login");
});

router.post("/register", (req, res) => {
    res.send("Register");
});

router.post("/createStore", (req, res) => {
    res.send("Create Store");
});

router.post("/createProduct", (req, res) => {
    res.send("Create Product");
});

router.get("/getAllStore", (req, res) => {
    res.send("Get All Store");
});

router.get("/getAllStoreProduct", (req, res) => {
    res.send("Get All Store Product");
});

router.delete("/deleteProduct", (req, res) => {
    res.send("Delete Product");
});

router.post("/editProduct", (req, res) => {
    res.send("Edit Product");
})

export default router;