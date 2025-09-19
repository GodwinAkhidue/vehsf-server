import { Query_Psql_DB } from "../../../config/psql_config.js";
import uuid_ossp from "./uuid-ossp.js";

export default async function Users() {
  const result = await uuid_ossp();

  if (!result) {
    return false;
  }

  const query = `CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
        created_at TIMESTAMP DEFAULT NOW()
    );`;

  const response = await Query_Psql_DB(query);
  const { error } = response;

  if (error) {
    return false;
  }

  return true;
}
