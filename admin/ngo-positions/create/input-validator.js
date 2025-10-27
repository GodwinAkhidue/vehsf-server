export default function Input_Validator(body) {
  const { name } = body;

  if (typeof name !== "string") {
    return `the name must be a string`;
  }
  if (name.length <= 0) {
    return `cannot be empty`;
  }

  return true;
}
