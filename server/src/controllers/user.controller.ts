import { Request, Response } from "express";
import { User } from "../model/m_user";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";


// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
export const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { nombre, apellido, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('El usuario ya existe');
    }

    const user = await User.create({
        nombre,
        apellido,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            isVerified: user.isVerified
        });
    } else {
        res.status(400);
        throw new Error('Datos de usuario inválidos');
    }
});

// @desc    Loggearse con email y contraseña
// @route   POST /api/users/login
export const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        res.status(400);
        throw new Error('El usuario no existe');
    }
    
    if (!await user.checkPassword(password)) {
        res.status(400);
        throw new Error('El usuario y la contraseña no son válidos');
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
    )

    res.status(201).json({
        _id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        isVerified: user.isVerified,
        token
    });
});

// @desc    obtener todos los usuarios (FOR TESTING) TODO: Delete
// @route   GET /api/users/
export const getUsers = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const users = await User.find({})
        res.status(201).json(users)
    } catch(err) {
        res.status(400)
        throw new Error('No se pudo completar la consulta')
    }
});