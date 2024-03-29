const express = require('express')
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require('./category.controller')
const { validateCategory } = require('./middlewares/category.validator')
const { checkToken } = require('../../middlewares/checkToken')
const { onlyAdmin } = require('../../middlewares/onlyAdmin')
const { getCategoryById } = require('./category.controller')

// Controllers

// Middlewares

const categoryRouter = express.Router()

// Endpoints
categoryRouter.post('/',
  checkToken,
  onlyAdmin,
  validateCategory,
  createCategory
)

categoryRouter.get('/', getAllCategories)

categoryRouter.get('/:id', getCategoryById)

// Update categories (ONLYADMIN)

categoryRouter.patch('/:id',
  checkToken,
  onlyAdmin,
  validateCategory,
  updateCategory
)
// Delete category (ONLYADMIN)

categoryRouter.delete('/:id',
  checkToken,
  onlyAdmin,
  deleteCategory
)

module.exports = { categoryRouter }



/* DOCUMENTATION */


/**
 * @openapi
 * /category:
 *    post:
 *        tags:
 *            - category
 *        summary: "Add a new category"
 *        description: "This route is for add a new new Category"
 *        security:
 *          - JWT: []
 *        requestBody:
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: "#/components/schemas/addCategory"
 *                    example:
 *                       name: Shoes
 *        responses:
 *                "201":
 *                    description: category created
 *                "400":
 *                    description: category created fail
 * 
 */


/**
 * @openapi
 * /category:
 *    get:
 *        tags:
 *            - category
 *        summary: "get categories"
 *        description: "This route is for get all categories"
 *        responses:
 *                "200":
 *                    description: success
 *                "400":
 *                    description: fail
 * 
 */


/**
 * @openapi
 * /category/{id}:
 *    get:
 *        tags:
 *            - category
 *        summary: "get category by id"
 *        description: "this route is for get one category by id"
 *        parameters:
 *             - in: path
 *               name: id
 *               required: true
 *               schema:
 *                  type: integer
 *        responses:
 *                "200":
 *                    description: success
 *                "400":
 *                    description: fail
 * 
 */


/**
 * @openapi
 * /category/{id}:
 *    delete:
 *        tags:
 *            - category
 *        summary: "delete a category by id"
 *        description: "this route is for delete a category"
 *        parameters:
 *             - in: path
 *               name: id
 *               required: true
 *               schema:
 *                  type: integer
 *        responses:
 *                "204":
 *                    description: success
 *                "400":
 *                    description: fail
 * 
 */

/**
 * @openapi
 * /category/{id}:
 *    patch:
 *        tags:
 *            - category
 *        summary: "update the category name"
 *        description: "this route is update the category name"
 *        parameters:
 *             - in: path
 *               name: id
 *               required: true
 *               schema:
 *                  type: integer
 *        security:
 *          - JWT: []
 *        requestBody:
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: "#/components/schemas/addCategory"
 *                    example:
 *                       name: Jeans
 *        responses:
 *                "204":
 *                    description: success
 *                "400":
 *                    description: fail
 */