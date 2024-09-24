import PlanificacionMenu from '../../models/cabm/PlanificacionMenu.js';


export const getAllPlanificacionesMenu = async (req, res) => {
    try {
        const planificacionesMenu = await PlanificacionMenu.find();
        res.status(200).json(planificacionesMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPlanificacionMenuById = async (req, res) => {
    try {
        const planificacionMenu = await PlanificacionMenu.findById(req.params.id);
        if (!planificacionMenu) return res.status(404).json({ message: 'Planificación de menú no encontrada' });
        res.status(200).json(planificacionMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPlanificacionMenu = async (req, res) => {
    const nuevaPlanificacionMenu = new PlanificacionMenu(req.body);
    try {
        const savedPlanificacionMenu = await nuevaPlanificacionMenu.save();
        res.status(201).json(savedPlanificacionMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePlanificacionMenu = async (req, res) => {
    try {
        const planificacionMenuActualizada = await PlanificacionMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!planificacionMenuActualizada) return res.status(404).json({ message: 'Planificación de menú no encontrada' });
        res.status(200).json(planificacionMenuActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePlanificacionMenu = async (req, res) => {
    try {
        const planificacionMenuEliminada = await PlanificacionMenu.findByIdAndDelete(req.params.id);
        if (!planificacionMenuEliminada) return res.status(404).json({ message: 'Planificación de menú no encontrada' });
        res.status(200).json({ message: 'Planificación de menú eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};