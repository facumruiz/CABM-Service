import express from 'express';
import { createPlanificacionMenu, getAllPlanificacionesMenu, getPlanificacionMenuById, updatePlanificacionMenu, deletePlanificacionMenu } from '../../controllers/cabm/planificacionMenuController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Planificaciones
 *   description: Operaciones relacionadas con la planificación de menús
 */

/**
 * @swagger
 * /planificaciones:
 *   get:
 *     summary: Obtener todas las planificaciones
 *     tags: [Planificaciones]
 *     responses:
 *       200:
 *         description: Lista de planificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanificacionMenu'
 */
router.get('/', getAllPlanificacionesMenu);

/**
 * @swagger
 * /planificaciones/{id}:
 *   get:
 *     summary: Obtener una planificación por ID
 *     tags: [Planificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la planificación
 *     responses:
 *       200:
 *         description: Planificación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanificacionMenu'
 *       404:
 *         description: Planificación no encontrada
 */
router.get('/:id', getPlanificacionMenuById);

/**
 * @swagger
 * /planificaciones:
 *   post:
 *     summary: Crear una nueva planificación
 *     tags: [Planificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanificacionMenu'
 *     responses:
 *       201:
 *         description: Planificación creada exitosamente
 */
router.post('/', createPlanificacionMenu);

/**
 * @swagger
 * /planificaciones/{id}:
 *   patch:
 *     summary: Actualizar una planificación
 *     tags: [Planificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la planificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanificacionMenu'
 *     responses:
 *       200:
 *         description: Planificación actualizada
 */
router.patch('/:id', updatePlanificacionMenu);

/**
 * @swagger
 * /planificaciones/{id}:
 *   delete:
 *     summary: Eliminar una planificación
 *     tags: [Planificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la planificación
 *     responses:
 *       200:
 *         description: Planificación eliminada exitosamente
 *       404:
 *         description: Planificación no encontrada
 */
router.delete('/:id', deletePlanificacionMenu);

export default router;

