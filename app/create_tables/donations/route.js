import { Query_Psql_DB } from "../../../config/psql_config.js";

export default async function Donations() {
  const query = `CREATE TABLE IF NOT EXISTS donations (
        id VARCHAR UNIQUE,
        amount INT,
        donationType VARCHAR,
        donationPurpose VARCHAR,
        paymentMethod VARCHAR,
        firstname VARCHAR,
        lastname VARCHAR,
        email VARCHAR,
        transactionReference VARCHAR UNIQUE,
        status VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
    );`;

  const response = await Query_Psql_DB(query);
  const { error } = response;

  if (error) {
    return false;
  }
  return true;
}
