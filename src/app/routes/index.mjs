import express from "express"
import path from "path"

const router = express.Router()


// Rutas para las vistas principales
router.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/index.html"));
});

router.get("/index", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/index.html"));
});

router.get("/cards", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/cards.html"));
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/register.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/login.html"));
});

router.get("/profile", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/profile.html"));
});

router.get("/shop", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/shop.html"));
});

router.get("/openpack", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/openpack.html"));
});

router.get("/addtokens", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/addtokens.html"));
});

router.get("/social", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/social.html"));
});

router.get("/socialprofile", (req, res) => {
    res.sendFile(path.join(path.resolve(), "views/socialprofile.html"));
});



export default router