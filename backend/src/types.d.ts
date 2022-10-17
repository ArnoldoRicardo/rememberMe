interface Note {
  id: number
  content: string
  title: string
}

type findNoteArgs = Pick<Note, 'id'>

type editNumberArgs = Pick<Note, 'id' | 'content' | 'title'>

interface allPersonArgs {
  hadPhone: boolean
}

interface User {
  id: number
  username: string
  password?: string
  hasshed_password?: string
}

type userInDb = Required<Omit<User, 'password'>>

type userArgs = Required<Pick<User, 'username' | 'password'>>

interface Context {
  currentUser: userInDb
}
