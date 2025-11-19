import jwt from "jsonwebtoken"

const GenerateToken = (user) => {
    const payload = {
        user: {
            id: user._id
        }
    }
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "2d" });
    return token;
}

export default GenerateToken;