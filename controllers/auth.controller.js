export const register = (req, res) => {
    try {
        const { email, password, name } = req.body;
        return res.status(400).json({ email, password, name });
    } catch (e) {
        console.log(e.message);
        return res.status(400).json({message:e.message});
    }
}

export const login = (req, res) => {
    try {
        const { email, password } = req.body;
        return res.status(400).json({ email, password });
    } catch (e) {
        console.log(e.message);
        return res.status(400).json({message:e.message});
    }
}