import { model, Schema } from "mongoose";
import { IEntidad, IPermission } from "./types";
import { knowledgeType } from "../enums/knowledge.enums";
import { IUser } from "./m_user";
import { Role } from "../enums/permissions.enums";

interface IKnowledge extends IEntidad {
    title: string;
    type: knowledgeType;
    owner: IUser;
    content: string;
    groups?: string[];
    permissions?: IPermission[];
    history?: string[];
    shareLink?: string;
}

const knowledgeSchema = new Schema<IKnowledge> ({
    title: { type: String, required: true },
    type: { 
        type: String, 
        enum: Object.values(knowledgeType), 
        required: true 
    },
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        // required: true
    },
    content: { type: String, required: true },
    groups: [{ type: String }],
    permissions: [{
        role: { 
            type: String, 
            enum: Object.values(Role), 
            required: true 
        },
        principalId: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        }
    }],
    history: [{ type: String }],
    shareLink: { type: String }
}, { timestamps: true });

const Knowledge = model<IKnowledge>('Knowledge', knowledgeSchema);
export { IKnowledge, knowledgeSchema, Knowledge };