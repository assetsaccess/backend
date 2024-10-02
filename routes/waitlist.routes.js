const express = require('express');
const router = express.Router();
const WaitlistController = require('../controllers/waitlistController');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Waitlist
 *   description: API for managing the waitlist
 */

/**
 * @swagger
 * /api/waitlist:
 *   post:
 *     summary: Add a user to the waitlist
 *     tags: [Waitlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: The waitlist entry was successfully created.
 *       500:
 *         description: Failed to create waitlist entry.
 */
router.post('/', WaitlistController.createWaitlist);

/**
 * @swagger
 * /api/waitlist:
 *   get:
 *     summary: Get all waitlist users
 *     tags: [Waitlist]
 *     responses:
 *       200:
 *         description: Successfully fetched waitlist.
 *       500:
 *         description: Failed to fetch waitlist.
 */
router.get('/', authenticateJWT, authorizeRole(['admin']), WaitlistController.getAllWaitlist);

/**
 * @swagger
 * /api/waitlist/{id}:
 *   patch:
 *     summary: Update waitlist status
 *     tags: [Waitlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the waitlist entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, contacted, converted]
 *     responses:
 *       200:
 *         description: Successfully updated waitlist entry.
 *       404:
 *         description: Waitlist entry not found.
 *       500:
 *         description: Failed to update waitlist entry.
 */
router.patch('/:id', authenticateJWT, authorizeRole(['admin']), WaitlistController.updateWaitlist);

/**
 * @swagger
 * /api/waitlist/{id}:
 *   delete:
 *     summary: Remove a user from the waitlist
 *     tags: [Waitlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the waitlist entry
 *     responses:
 *       204:
 *         description: Successfully deleted waitlist entry.
 *       404:
 *         description: Waitlist entry not found.
 *       500:
 *         description: Failed to delete waitlist entry.
 */
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), WaitlistController.deleteWaitlist);

module.exports = router;
