import { connection } from '../db'

export const newNota = async (content: string, title: string) => {
  const sql = `
        INSERT INTO note (title,content)
        VALUES ('${title}','${content}')
        RETURNING *;
    `
  await connection.connectAsync()
  try {
    const res = await connection.queryAsync(sql)
    return res[0]
  } catch (err: any) {
    console.log(err)
  } finally {
    await connection.closeAsync()
  }
}

export const updateNote = async (id: number, content: string) => {
  const sql = `
        UPDATE note
        SET content='${content}'
        WHERE id in (${id})
        RETURNING *;
    `

  await connection.connectAsync()
  try {
    const res = await connection.queryAsync(sql)
    return res[0]
  } catch (err: any) {
    console.log(err)
  } finally {
    connection.closeAsync()
  }
}

export const countNotes = async () => {
  const sql = `
     --sql
     select count(*) from public.person;
    `
  await connection.connectAsync()
  try {
    const res = await connection.queryAsync(sql)
    return res[0].count
  } catch (err) {
    console.log(err)
  } finally {
    connection.closeAsync()
  }
}

export const getNote = async (id: number) => {
  const sql = `
     --sql
     select * from public.person where id = ${id} limit 1;
     `
  await connection.connectAsync()
  try {
    const res = await connection.queryAsync(sql)
    return res[0]
  } catch (err) {
    console.log(err)
  } finally {
    connection.closeAsync()
  }
}

export const getAllNotes = async (hasDelete: boolean) => {
  const not = hasDelete ? 'not' : ''
  const sql = `
     --sql
     select * from public.person
     where has_delete is ${not} null;
    `
  await connection.connectAsync()
  try {
    const res = await connection.queryAsync(sql)
    return res
  } catch (err) {
    console.log(err)
  } finally {
    connection.closeAsync()
  }
}

export default {
  countNotes,
  getAllNotes,
  getNote
}
