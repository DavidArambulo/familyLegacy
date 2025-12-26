import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Knowledge } from "../model/m_knowledge";

// @desc    Crear un nuevo conocimiento (Knowledge)
// @route   POST /api/knowledge/
export const createKnowledge = expressAsyncHandler(async (req: Request, res: Response) => {
    const { title, type, content, groups, owner } = req.body;

    const knowledge = await Knowledge.create({
        title,
        type,
        content,
        groups,
        owner
    })

    if (knowledge) {
        res.status(201).json({
            _id: knowledge._id,
            title: knowledge.title,
            type: knowledge.type,
            content: knowledge.content,
            groups: knowledge.groups,
            owner: knowledge.owner,
            permissions: knowledge.permissions
        })
    } else {
        res.status(400);
        throw new Error('Datos inválidos');
    }
});

// @desc    Mostrar todos los conocimientos (Knowledge)
// @route   GET /api/knowledge/
export const getAllKnowledge = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const Knowledges = await Knowledge.find({})
        res.status(201).json(Knowledges)
    } catch(err) {
        res.status(400)
        throw new Error('No se pudo completar la consulta')
    }
});