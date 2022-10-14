const {
    login,
    register,
    getMe
} = require('../services/auth.service');

export async function registerUserHandler(req, res) {
    try {
        const user = await register(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function loginUserHandler(req, res) {
    try {
        const user = await login(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function getMeHandler(req, res) {
    try {
        const user = await getMe(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}