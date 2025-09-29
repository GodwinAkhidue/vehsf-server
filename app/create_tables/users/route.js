import { Query_Psql_DB } from "../../../config/psql_config.js";

export default async function Users() {
  const query = `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR UNIQUE,
        email VARCHAR UNIQUE,
        password VARCHAR,
        role VARCHAR,
        firstname VARCHAR,
        lastname VARCHAR,
        phone JSONB,
        date_of_birth VARCHAR,
        gender VARCHAR,
        location JSONB,
        languages_spoken JSONB,
        profile_picture JSONB,
        skills JSONB,
        resume_cv JSONB,
        availability VARCHAR,
        preferred_type_of_volunteering VARCHAR,
        emergency_contact_name VARCHAR,
        emergency_contact_relationship VARCHAR,
        emergency_contact_phone JSONB,
        ngo_position VARCHAR,
        ngo_location JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        verification_code INT,
        verification_code_expiry TIMESTAMP,
        verification_code_used BOOLEAN DEFAULT FALSE
    );`;

  const response = await Query_Psql_DB(query);
  const { error } = response;

  if (error) {
    return false;
  }

  return true;
}
