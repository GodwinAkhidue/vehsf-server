import Admins from "./admin/route.js";
import Donations from "./donations/route.js";
import Skills from "./skills/route.js";
import Users from "./users/route.js";
import Hero_Banners from "./hero-banners/route.js";
import NewsAndBlogs from "./news-and-blogs/route.js";
import ExploreImpact from "./explore-impact/route.js";
import Ngo_Positions from "./ngo-positions/route.js";
import Temporary_Users from "./temp-user/route.js";

export default async function Create_Tables() {
  const skills = await Skills();
  const users = await Users();
  const donations = await Donations();
  const admins = await Admins();
  const hero_banners = await Hero_Banners();
  const news_and_blogs = await NewsAndBlogs();
  const explore_impact = await ExploreImpact();
  const ngo_positions = await Ngo_Positions();
  const temp_user = await Temporary_Users();

  if (
    !skills ||
    !users ||
    !donations ||
    !admins ||
    !hero_banners ||
    !news_and_blogs ||
    !explore_impact ||
    !ngo_positions ||
    !temp_user
  ) {
    return false;
  }

  return true;
}
