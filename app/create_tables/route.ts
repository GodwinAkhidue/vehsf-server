import Skills from "./skills/route";
import Users from "./users/route";

export default async function Create_Tables() {
  const skills = await Skills();
  const users = await Users();

  if (!skills) {
    return false;
  }
  if (!users) {
    return false;
  }

  return true;
}
