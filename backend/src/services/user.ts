import { connection } from '../db'
import { UserInputError } from 'apollo-server'

export const findUser = async (username: string): Promise<userInDb> => {
  const sql_select = `select * from public."User" where "username" = '${username}' limit 1`
  const client = await pool.connect()
  try {
    const res = await client.query(sql_select)
    return res.rows[0]
  } catch (err: any) {
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}

export const addFriendtoUser = async (user_id: number, person_id: number) => {
  const sql = `
    INSERT INTO public.friends (person_id,user_id)
	VALUES (${person_id},${user_id});
`
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res.rowCount > 0
  } catch (err: any) {
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}

export const findFriends = async (user_id: number) => {
  const sql = `
    SELECT p.* FROM public.friends f
    join public.person p on f.person_id=p.id
    where user_id = ${user_id}
`
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res.rows
  } catch (err: any) {
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}

export const newUser = async (username: string, hasshed_password: string) => {
  const sql = `
         --sql
            INSERT INTO public."User" (username,hasshed_password)
            VALUES ('${username}','${hasshed_password}')
            RETURNING *;
        `

  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res.rows[0]
  } catch (err: any) {
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}

export const checkFriendship = async (user_id: number, person_id: number) => {
  const sql = `
    SELECT id FROM public.friends f
    where user_id in (${user_id}) and person_id in (${person_id})
  `
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    console.log(res)
    return res.rows[0]
  } catch (err: any) {
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}
