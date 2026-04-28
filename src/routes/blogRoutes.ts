import {Router} from "express";

import {createBlog, listBlogs, getBlogById, updateBlog} from "../controllers/blogController.js";
import requireAuth from "../middlewares/auth.js";
import upload from "../utility/uploader.js";

const router = Router();

/**
 * @openapi
 * /api/v1/blogs/getall:
 *  get:
 *    summary: Get all blogs
 *    description: Returns all blogs
 *    tags: [Blogs]
 *    responses:
 *      200:
 *        description: Success
 *      500: 
 *        description: Internal Server Error
 */
router.get("/getall", listBlogs);


/**
 * @openapi
 * /api/v1/blogs/{id}:
 *  get:
 *    summary: Get blog by ID
 *    description: Returns blog by ID
 *    tags: [Blogs]
 *    responses:
 *      200:
 *        description: Success
 *      404: 
 *        description: Not Found
 *      500:
 *        description: Internal Server Error  
 */
router.get("/:id", getBlogById);
 /**
  * @openapi
  * /api/v1/blogs:
  *  post:
  *    summary: Create a blog
  *    description: Creates a new blog
  *    tags: [Blogs]
  *    security:
  *      - bearerAuth: []
  *    requestBody:
  *      required: true
  *      content:
  *        multipart/form-data:
  *          schema:
  *            type: object
  *            properties:
  *              title:
  *                type: string
  *              content:
  *                type: string
  *              image:
  *                type: string
  *                format: binary
  *    responses:
  *      200:
  *        description: Success
  *      400: 
  *        description: Bad Request
  *      500: 
  *        description: Internal Server Error

  */
router.post("/", requireAuth, upload.single("image"), createBlog);

/**
 * @openapi
 * /api/v1/blogs/{id}:
 *  put:
 *    summary: Update a blog
 *    description: Updates a blog by ID
 *    tags: [Blogs]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              content:
 *                type: string
 *              image:
 *                type: string
 *                format: binary
 *    responses:
 *      200:
 *        description: Success   
 *      403: 
 *        description: Forbidden
 *      500: 
 *        description: Internal Server Error
 */
router.put("/:id", requireAuth, upload.single("image"), updateBlog);

export default router;