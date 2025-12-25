import { Document, Types } from "mongoose";
import { Role } from "../enums/permissions.enums";

export interface IEntidad extends Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IPermission {
    role: Role;
    principalId: Types.ObjectId;
}