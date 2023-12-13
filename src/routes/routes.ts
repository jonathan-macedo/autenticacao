import { Router, Request, Response } from "express";
import { CreateUser } from "../controllers/create-user";

const route = Router();

route.post("/user", async (req: Request, res: Response) => new CreateUser().execute(req.body))


export default route;