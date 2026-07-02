import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("===== isAuthenticated =====");
        console.log("Cookies:", req.cookies);

        const token = req.cookies.token;
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        console.log("Decoded Token:", decode);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid token",
            success: false,
        });
    }
};

export default isAuthenticated;