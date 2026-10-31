import jwt from 'jsonwebtoken';

export const verifyResetToken = (req, res, next) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(401).json({
                message: "Reset token is required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};