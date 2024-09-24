import Bebida from '../../models/cabm/Bebida.js';

export const getAllBebidas = async (req, res) => {
    try {
        const bebidas = await Bebida.find();
        res.status(200).json(bebidas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBebidaById = async (req, res) => {
    try {
        const bebida = await Bebida.findById(req.params.id);
        if (!bebida) return res.status(404).json({ message: 'Bebida no encontrada' });
        res.status(200).json(bebida);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBebida = async (req, res) => {
    const nuevaBebida = new Bebida(req.body);
    try {
        const savedBebida = await nuevaBebida.save();
        res.status(201).json(savedBebida);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBebida = async (req, res) => {
    try {
        const bebidaActualizada = await Bebida.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bebidaActualizada) return res.status(404).json({ message: 'Bebida no encontrada' });
        res.status(200).json(bebidaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBebida = async (req, res) => {
    try {
        const bebidaEliminada = await Bebida.findByIdAndDelete(req.params.id);
        if (!bebidaEliminada) return res.status(404).json({ message: 'Bebida no encontrada' });
        res.status(200).json({ message: 'Bebida eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};