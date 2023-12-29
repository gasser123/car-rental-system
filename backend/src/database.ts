import dotenv from "dotenv";
import mysql from "mysql2" ;
import { Pool } from "mysql2/typings/mysql/lib/Pool";

dotenv.config();
let DBPool:Pool;

const {
  MYSQL_HOST,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_TEST_DB,
  ENV,
} = process.env;

if (ENV === "dev") {
  DBPool = mysql.createPool({
    host: MYSQL_HOST,
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  });
} else {
  DBPool = mysql.createPool({
    host: MYSQL_HOST,
    database: MYSQL_TEST_DB,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  });
}

const DB = DBPool.promise();

export default DB;
