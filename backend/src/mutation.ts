import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInputError, AuthenticationError } from 'apollo-server'

import { findUser, newUser } from './services/user'
import { newNota, updateNote, getNote } from './services/note'

export const addNote = async (
  root: undefined,
  { id, content }: Note,
  { currentUser }: Context
) => {
  if (!currentUser) throw new AuthenticationError('not authenticated')
  try {
    if (id) {
      return updateNote(id, content)
    } else {
      const title = content.split(/\r?\n/)[0]
      return newNota(content, title)
    }
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

export const createUser = async (
  root: undefined,
  { username, password }: userArgs
) => {
  const hasshed_password = await bcrypt.hash(password, 10)
  return await newUser(username, hasshed_password)
}

export const login = async (
  root: undefined,
  { username, password }: userArgs
) => {
  const user = await findUser(username)
  const hasshed_password = user.hasshed_password
  if (!(await bcrypt.compare(password, hasshed_password))) {
    throw new UserInputError('wrong credentials')
  }
  const jwt_secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'default'
  return {
    value: jwt.sign(user, jwt_secret)
  }
}

export default {
  addNote,
  createUser,
  login
}
