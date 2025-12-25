import { model, Schema } from "mongoose";
import { IEntidad } from "./types";

interface IUser extends IEntidad {
    nombre: string;
    apellido: string;
    // comunidades: string[];
    // familiares: string[];
    email: string;
    password: string;
    avatarUrl?: string;
    isVerified: boolean;
}

const userSchema = new Schema<IUser> ({
    nombre: { 
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    apellido: { 
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true
    },
    email: { 
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        select: false
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        select: false
    },
    avatarUrl: { type: String },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const User = model<IUser>('User', userSchema);
export { IUser, userSchema, User };