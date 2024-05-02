import Router from 'express-router'

const router = Router()
router.route('/login').post(loginUser);

export default router

