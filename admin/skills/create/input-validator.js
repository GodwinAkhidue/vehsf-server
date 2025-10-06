export default function Input_Validator(body) {
  const { name } = body;

  if (typeof name !== "string") {
    return `the name of the skill must be a string`;
  }
  if (name.length <= 0) {
    return `skill cannot be empty`;
  }

  return true;
}
