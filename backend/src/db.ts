import { MySqlConnection } from 'mysqlconnector'

export const connection = new MySqlConnection(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_NAME
)
