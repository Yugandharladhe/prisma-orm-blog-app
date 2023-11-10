import jwt from "jsonwebtoken";
import prisma from "../DB/db.config.js";


const protect = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log(process.env.APPSETTING_JWT_SECRET);
            const decoded = jwt.verify(token, process.env.APPSETTING_JWT_SECRET);
            const userdetails = await prisma.user.findUnique({
                where: {
                    id: decoded?.id
                }
            })
            if (userdetails) {
                req.userDetails = userdetails
                next();
            } else {
                res.json({ message: "User not found", status: false })
            }

        } catch (error) {
            console.log(error);
            response(res, 401, false, "Error", error);
        }
    } else {
        res.json({ message: "Not Authorized, No Token!", status: false }).status(401);
    }
}

export default protect;