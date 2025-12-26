import { model, Schema } from "mongoose";
import { IEntidad } from "./types";
import bcrypt from "bcrypt";

interface IUser extends IEntidad {
    nombre: string;
    apellido: string;
    // comunidades: string[];
    // familiares: string[];
    email: string;
    password: string;
    avatarUrl?: string;
    isVerified: boolean;
    checkPassword(password: string): Promise<boolean>;
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

userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return;
    }
    catch (err: any) {
        return err;
    }
});

userSchema.methods.checkPassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);
export { IUser, userSchema, User };