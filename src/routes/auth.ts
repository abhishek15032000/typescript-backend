import {Router} from "express";

import {register, login} from "../controllers/authController.js";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          email: 
 *                              type: string
 *                          password: 
 *                              type: string
 *      responses:
 *          201:
 *              description: User registered successfully
 *          400:
 *              description: Invalid request
 *          500:
 *              description: Internal server error
 */

router.post("/register", register);

/**
 * @openapi
 * /api/v1/auth/login:
 *  post:
 *      summary: Login with email and password
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email: 
 *                              type: string
 *                          password: 
 *                              type: string
 *      responses:
 *          200:
 *              description: User logged in successfully
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Internal server error
 */
router.post("/login", login);

export default router;