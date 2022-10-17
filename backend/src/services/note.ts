import { connection } from '../db'

export const newNota = async (content: string, title: string) => {
  const sql = `
     --sql
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

// export const updateCreateNote = async (name: string, phone: string) => {
//   const sql = `
//      --sql
//         UPDATE public.person
//         SET phone='${phone}'
//         WHERE name in (${name})
//         RETURNING *;
//     `
//   const client = await db.getConnection()
//   try {
//     const res = await client.query(sql)
//     return res[0]
//   } catch (err: any) {
//     console.log(err)
//   } finally {
//     client.release()
//   }
// }

// export const countNotes = async () => {
//   const sql = `
//      --sql
//      select count(*) from public.person;
//     `
//   const client = await db.getConnection()
//   try {
//     const res = await client.query(sql)
//     return res[0].count
//   } catch (err) {
//     console.log(err)
//   } finally {
//     client.release()
//   }
// }

// export const getNote = async (title: string) => {
//   const sql = `
//      --sql
//      select * from public.person where "title" = '${title}' limit 1;
//      `
//   const client = await db.getConnection()
//   try {
//     const res = await client.query(sql)
//     return res[0]
//   } catch (err) {
//     console.log(err)
//   } finally {
//     client.release()
//   }
// }

// export const getAllNotes = async (hasDelete: boolean) => {
//   const not = hasDelete ? 'not' : ''
//   const sql = `
//      --sql
//      select * from public.person
//      where has_delete is ${not} null;
//     `
//   const client = await db.getConnection()
//   try {
//     const res = await client.query(sql)
//     return res
//   } catch (err) {
//     console.log(err)
//   } finally {
//     client.release()
//   }
// }
