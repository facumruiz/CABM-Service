import express from 'express';
import { verifyRole } from '../../middleware/authMiddleware.js';
import { createItemMenu, getAllItemsMenu, getItemMenuById, updateItemMenu, deleteItemMenu } from '../../controllers/cabm/menuItemController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MenuItems
 *   description: Operaciones relacionadas con los ítems del menú
 */

/**
 * @swagger
 * /menu-items:
 *   get:
 *     summary: Obtener todos los ítems del menú
 *     tags: [MenuItems]
 *     responses:
 *       200:
 *         description: Lista de ítems del menú
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 */
 router.get('/', (req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), getAllItemsMenu);

 /**
  * @swagger
  * /menu-items/{id}:
  *   get:
  *     summary: Obtener un ítem del menú por ID
  *     tags: [MenuItems]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: ID del ítem del menú
  *     responses:
  *       200:
  *         description: Ítem del menú encontrado
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/MenuItem'
  *       404:
  *         description: Ítem del menú no encontrado
  */
 router.get('/:id',(req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), getItemMenuById);
 
 /**
  * @swagger
  * /menu-items:
  *   post:
  *     summary: Crear un nuevo ítem del menú
  *     tags: [MenuItems]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/MenuItem'
  *     responses:
  *       201:
  *         description: Ítem del menú creado exitosamente
  */
 router.post('/', (req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), createItemMenu);
 
 /**
  * @swagger
  * /menu-items/{id}:
  *   patch:
  *     summary: Actualizar un ítem del menú
  *     tags: [MenuItems]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: ID del ítem del menú
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/MenuItem'
  *     responses:
  *       200:
  *         description: Ítem del menú actualizado
  */
 router.patch('/:id', (req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), updateItemMenu);
 
 /**
  * @swagger
  * /menu-items/{id}:
  *   delete:
  *     summary: Eliminar un ítem del menú
  *     tags: [MenuItems]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: ID del ítem del menú
  *     responses:
  *       200:
  *         description: Ítem del menú eliminado exitosamente
  *       404:
  *         description: Ítem del menú no encontrado
  */
 router.delete('/:id', (req, res, next) => req.app.verifyToken(req, res, next), verifyRole(['admin']), deleteItemMenu);
 
 export default router;
 
