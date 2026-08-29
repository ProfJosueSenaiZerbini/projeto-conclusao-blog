const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.routes");
const postRoutes = require("./routes/posts.Routes");
const adminRoutes = require("./routes/admin.Routes");
const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem:"API funcionando"
    })
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin/posts",adminRoutes);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`servidor funcionando em http://localhost:${PORT}`);
});