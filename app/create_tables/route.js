import Donations from "./donations/route.js";
import Skills from "./skills/route.js";
import Users from "./users/route.js";

export default async function Create_Tables() {
  const skills = await Skills();
  const users = await Users();
  const donations = Donations();

  if (!skills || !users || !donations) {
    return false;
  }

  return true;
}
