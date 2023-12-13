import { compare } from "bcrypt"
import { prisma } from "../config/prisma"
import { sign } from "jsonwebtoken"

export default class CreateLogin {
    async execute(body: Body) {
        const { email, password } = body

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return {
                statusCode: 400,
                message: "E-mail está inválido."
            }
        }

        const verifyPassword = await compare(password, user.password)

        if (!verifyPassword) {
            return {
                statusCode: 400,
                message: "Senha está inválida."
            }
        }

        const token = sign({
            id: user.id
        }, process.env.JWT_PASS ?? "", {
            expiresIn: "5h"
        })

        const { password: _, ...userLogin } = user

        return {
            user: userLogin,
            token: token
        }
    }
}

type Body = {
    email: string,
    password: string
}