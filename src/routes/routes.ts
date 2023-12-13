import { Router, Request, Response } from "express";
import { CreateUser } from "../controllers/create-user";
import CreateLogin from "../controllers/create-login";

const route = Router();

route.post("/user", async (req: Request, res: Response) => new CreateUser().execute(req.body))

route.post("/login", async (req: Request, res: Response) => new CreateLogin().execute(req.body))

export default route;