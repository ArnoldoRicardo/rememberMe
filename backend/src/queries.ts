import { UserInputError } from 'apollo-server'

import { countNotes, getAllNotes, getNote } from './services/note'

export const personCount = async (): Promise<Number | undefined> => {
  try {
    return await countNotes()
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

const allNotes = async (root: undefined, { hadPhone }: allPersonArgs) => {
  try {
    return getAllNotes(hadPhone)
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

const findNote = async (root: undefined, { id }: findNoteArgs) => {
  try {
    return getNote(id)
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
