import { UserInputError } from 'apollo-server'

import noteService from './services/note'

export const noteCount = async (): Promise<Number | undefined> => {
  try {
    return await noteService.countNotes()
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

const allNotes = async (root: undefined, { hadPhone }: allPersonArgs) => {
  try {
    return noteService.getAllNotes(hadPhone)
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

const getNote = async (root: undefined, { id }: findNoteArgs) => {
  try {
    return noteService.getNote(id)
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

const searchNotes = async () => {}

const me = async (
  root: undefined,
  args: undefined,
  { currentUser }: Context
) => {
  return currentUser
}

export default {
  allNotes,
  getNote,
  searchNotes,
  noteCount,
  me
}
