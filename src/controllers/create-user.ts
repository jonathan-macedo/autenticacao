import { hash } from "bcrypt";
import { prisma } from "../config/prisma";

export class CreateUser {
    async execute(body: Body) {
        const { name, email, password } = body

        const emailExist = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (emailExist) {
            return {
                statusCode: 400,
                message: "O e-mail informado já existe no banco de dados, por favor informe outro para sua segurança."
            }
        }

        const hashPassord = await hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassord
            }
        })

        const { password: _, ...user } = newUser

        return { user }
    }
}

type Body = {
    name: string,
    email: string,
    password: string
}