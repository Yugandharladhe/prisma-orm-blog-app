import 'dotenv/config';
import express from 'express';
import router from './routes/routes.js';
const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())

app.use("/api",router);

// app.post("/post", async(req, res) => {
//     const { name, email, password } = req.body
//         // const user = await prisma.user.create({
//         //     data: {
//         //         name,
//         //         email,
//         //         password
//         //     }
//         // })
//     const all = await prisma.user.findMany()
//     res.json({ all })
// })


app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})