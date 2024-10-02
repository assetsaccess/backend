const { Router } = require('express');
const UserController = require('../controllers/userController');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing the Auth
 */

/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Returns a sample message
 *     responses:
 *       200:
 *         description: A successful response
 */

// Route for user registration
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', UserController.register);

// Route for user login
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticates a user and returns a token
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', UserController.login);

// Protected route for accessing user profile
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Accesses the user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted to the user profile
 *       403:
 *         description: Forbidden
 */
router.get('/profile', authenticateJWT, authorizeRole(['user', 'admin']), (req, res) => {
    // Respond with a message and HTTP status code
    res.status(200).json({ message: 'You have access to this route' });
});

module.exports = router;