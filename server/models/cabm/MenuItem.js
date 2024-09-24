import mongoose from 'mongoose';

const { Schema } = mongoose;

const MenuItemSchema = new Schema({
    nombre: { type: String, required: true },
    foto: { type: String },
    tipo: { type: String, enum: ['Entrada', 'Plato', 'Postre'], required: true },
    ingredientes: { type: [String], required: true }, // Cambia a array de strings
    preparacion: { type: String },
    aptoCeliaco: { type: Boolean, default: false },
    otros: [{ // Cambia a array de objetos
        etiqueta: { type: String, required: true },
        contenido: { type: String, required: true }
    }],
    orden: { type: Number }
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

export default MenuItem;

