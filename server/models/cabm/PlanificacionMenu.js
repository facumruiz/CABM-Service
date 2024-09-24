import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlanificacionMenuSchema = new Schema({
    dia: { type: Date, required: true },
    periodo: { type: String, enum: ['Almuerzo', 'Cena'], required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
});

const PlanificacionMenu = mongoose.model('PlanificacionMenu', PlanificacionMenuSchema);

export default PlanificacionMenu;
