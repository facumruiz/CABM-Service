import express from 'express';
import cors from 'cors';
import connectDB from './services/dbService.js';

import recordRoutes from './routes/recordRoutes.js';
import userRoutes from './routes/userRoutes.js';

import bebidaRoutes from './routes/cabm/bebidaRoutes.js';
import menuItemsRoutes from './routes/cabm/menuItemRoutes.js';
import planificacionRoutes from './routes/cabm/planificacionMenuRoutes.js';

import errorMiddleware from './middleware/errorMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swaggerConfig.js';
import { PORT } from './config/env.js';

import jwt from 'jsonwebtoken';

// Conectar a la base de datos
connectDB();

const app = express();

app.set("secretKey", "1863")

app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto por la URL de tu frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'x-access-token'], // Headers permitidos
}));


// Rutas de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());
app.use('/record', recordRoutes);
//app.use('/record', verifyToken, recordRoutes);

app.use('/user', userRoutes);

// Middleware de manejo de errores
app.use(errorMiddleware);



app.use('/bebidas', bebidaRoutes);
app.use('/menu-items', menuItemsRoutes);
app.use('/planificaciones', planificacionRoutes);



function verifyToken(req, res, next) {
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (err, payload) {
    if (err) {
      res.json({ message: err.message })
    } else {
      console.log("Payload", payload)
      req.body.userId = payload.userId
      next()
    }
  })
}

app.verifyToken = verifyToken

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
