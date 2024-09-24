import express from 'express';
import { verifyRole } from '../../middleware/authMiddleware.js';
import { createBebida, getAllBebidas, getBebidaById, updateBebida, deleteBebida } from '../../controllers/cabm/bebidaController.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Bebidas
 *   description: Operaciones relacionadas con las bebidas
 */

/**
 * @swagger
 * /bebidas:
 *   get:
 *     summary: Obtener todas las bebidas
 *     tags: [Bebidas]
 *     responses:
 *       200:
 *         description: Lista de bebidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bebida'
 */
 router.get('/', (req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), getAllBebidas);

 /**
  * @swagger
  * /bebidas/{id}:
  *   get:
  *     summary: Obtener una bebida por ID
  *     tags: [Bebidas]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: ID de la bebida
  *     responses:
  *       200:
  *         description: Bebida encontrada
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Bebida'
  *       404:
  *         description: Bebida no encontrada
  */
 router.get('/:id', (req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), getBebidaById);
 
 /**
  * @swagger
  * /bebidas:
  *   post:
  *     summary: Crear una nueva bebida
  *     tags: [Bebidas]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Bebida'
  *     responses:
  *       201:
  *         description: Bebida creada exitosamente
  */
 router.post('/', (req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), createBebida);
 
 /**
  * @swagger
  * /bebidas/{id}:
  *   patch:
  *     summary: Actualizar una bebida
  *     tags: [Bebidas]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: ID de la bebida
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Bebida'
  *     responses:
  *       200:
  *         description: Bebida actualizada
  */
 router.patch('/:id',(req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), updateBebida);
 
 /**
  * @swagger
  * /bebidas/{id}:
  *   delete:
  *     summary: Eliminar una bebida
  *     tags: [Bebidas]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: ID de la bebida
  *     responses:
  *       200:
  *         description: Bebida eliminada exitosamente
  *       404:
  *         description: Bebida no encontrada
  */
 router.delete('/:id', (req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), deleteBebida);
 
 export default router;
 
