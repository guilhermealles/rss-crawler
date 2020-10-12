import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

export let sqlite: Database<sqlite3.Database, sqlite3.Statement>;

export async function initSqlite(dbPath: string): Promise<void> {
  sqlite = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
