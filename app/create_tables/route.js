import Admins from "./admin/route.js";
import Banners from "./banners/route.js";
import Donations from "./donations/route.js";
import Skills from "./skills/route.js";
import Users from "./users/route.js";

export default async function Create_Tables() {
  const skills = await Skills();
  const users = await Users();
  const donations = await Donations();
  const admins = await Admins();
  const banners = await Banners();

  if (!skills || !users || !donations || !admins || !banners) {
    return false;
  }

  return true;
}
