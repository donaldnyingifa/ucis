export function checkEmailContains(email, searchString) {
  const regex = new RegExp(searchString, 'i'); // 'i' flag for case-insensitive matching
  return regex.test(email);
}