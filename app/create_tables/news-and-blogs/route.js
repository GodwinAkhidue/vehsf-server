import { Query_Psql_DB } from "../../../config/psql_config.js";

export default async function NewsAndBlogs() {
  const query = `CREATE TABLE IF NOT EXISTS news_and_blogs (
        id VARCHAR PRIMARY KEY,
        image JSONB,
        title VARCHAR,
        content TEXT,
        created_at TIMESTAMP DEFAULT NOW()
    );`;

  const response = await Query_Psql_DB(query);
  const { error } = response;

  if (error) {
    return false;
  }
  return true;
}
