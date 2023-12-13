import { Router, Request, Response } from "express";
import { CreateUser } from "../controllers/create-user";
import CreateLogin from "../controllers/create-login";
import { auth } from "../middlewares/auth";

const route = Router();

route.post("/user", async (req: Request, res: Response) => new CreateUser().execute(req.body))

route.post("/login", async (req: Request, res: Response) => new CreateLogin().execute(req.body))

route.use(auth)
// Com o middleware criado, poderá fazer a autenticação do usuário, assim, tendo mais segurança no momento que precisar acessar alguma
// determinada rota

export default route;