import mongoose from 'mongoose';

const { Schema } = mongoose;

const bebidaSchema = new Schema({
    nombre: { type: String, required: true },
    foto: { type: String },
    variedad: { type: String },
    cosecha: { type: String },
    region: { type: String },
    elaboracion: { type: String },
    publicaPrecio: { type: Boolean, default: false },
    precio: { type: Number },
    otrasPropiedades: { type: String },
    disponibilidad: { type: Boolean, default: true },
    orden: { type: Number }
});


const Bebida = mongoose.model('Bebida', bebidaSchema);

export default Bebida;
