import MenuItem from '../../models/cabm/MenuItem.js';


export const getAllItemsMenu = async (req, res) => {
    try {
        const itemsMenu = await MenuItem.find(); // Cambié ItemMenu a MenuItem
        res.status(200).json(itemsMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getItemMenuById = async (req, res) => {
    try {
        const itemMenu = await MenuItem.findById(req.params.id); // Cambié ItemMenu a MenuItem
        if (!itemMenu) return res.status(404).json({ message: 'Ítem de menú no encontrado' });
        res.status(200).json(itemMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createItemMenu = async (req, res) => {
    const nuevoItemMenu = new MenuItem(req.body); // Cambié ItemMenu a MenuItem
    try {
        const savedItemMenu = await nuevoItemMenu.save();
        res.status(201).json(savedItemMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateItemMenu = async (req, res) => {
    try {
        const itemMenuActualizado = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Cambié ItemMenu a MenuItem
        if (!itemMenuActualizado) return res.status(404).json({ message: 'Ítem de menú no encontrado' });
        res.status(200).json(itemMenuActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteItemMenu = async (req, res) => {
    try {
        const itemMenuEliminado = await MenuItem.findByIdAndDelete(req.params.id); // Cambié ItemMenu a MenuItem
        if (!itemMenuEliminado) return res.status(404).json({ message: 'Ítem de menú no encontrado' });
        res.status(200).json({ message: 'Ítem de menú eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};