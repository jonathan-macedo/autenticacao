import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../config/prisma";

type JwtPayloand = {
    id: number
}

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers

    if (!authorization) {
        return {
            statusCode: 401,
            message: "Acesso negado!"
        }
    }

    const token = authorization.split(" ")[1]

    const { id } = verify(token, process.env.JWT_PASS ?? "") as JwtPayloand

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if (!user) {
        return {
            statusCode: 401,
            message: "Acesso negado!"
        }
    }

    const { password: _, ...loggedUser } = user

    req.user = loggedUser

    next()
}