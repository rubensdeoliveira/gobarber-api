import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('E-mail ou senha inválidos')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('E-mail ou senha inválidos')
    }

    const token = sign({}, '870fee1ca6c36660677957ded75dc663', {
      subject: user.id,
      expiresIn: '1d',
    })

    return { user, token }
  }
}

export default AuthenticateUserService
