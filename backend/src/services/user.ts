import { connection } from '../db'
import { UserInputError } from 'apollo-server'

export const findUser = async (username: string): Promise<userInDb> => {
  const sql_select = `select * from public."User" where "username" = '${username}' limit 1`

  await connection.connectAsync()
  try {
    const res = await connection.queryAsync(sql_select)
    return res.rows[0]
  } catch (err: any) {
    throw new UserInputError(err.message)
  } finally {
    await connection.closeAsync()
  }
}

export const newUser = async (username: string, hasshed_password: string) => {
  const sql = `
         --sql
            INSERT INTO public."User" (username,hasshed_password)
            VALUES ('${username}','${hasshed_password}')
            RETURNING *;
        `

  await connection.connectAsync()
  try {
    const res = await connection.queryAsync(sql)
    return res.rows[0]
  } catch (err: any) {
    throw new UserInputError(err.message)
  } finally {
    connection.closeAsync()
  }
}
