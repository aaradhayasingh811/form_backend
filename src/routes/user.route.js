import {Router} from "express"
const router  = Router();
import registerController from "../controllers/register.controller.js"
import loginController from "../controllers/login.controller.js";

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/').get((res,req)=>{
    res.setEncoding("Hello world");
})


export {router}