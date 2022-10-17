import { UserInputError } from 'apollo-server'

import { countPersons, getAllPerson, getPerson } from './services/note'

export const personCount = async (): Promise<Number | undefined> => {
  try {
    return await countPersons()
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

const allNotes = async (root: undefined, { hadPhone }: allPersonArgs) => {
  try {
    return getAllPerson(hadPhone)
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

const findNote = async (root: undefined, { name }: findPersonArgs) => {
  try {
    return getPerson(name)
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

const me = async (
  root: undefined,
  args: undefined,
  { currentUser }: Context
) => {
  return currentUser
}

export default {
  allNotes,
  findNote,
  me
}
