export function checkEmailContains(email, searchString) {
  const regex = new RegExp(searchString, 'i'); // 'i' flag for case-insensitive matching
  return regex.test(email);
}

export function generateSocialSecurityNumber() {
  const firstPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const secondPart = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  const thirdPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  return `${firstPart}-${secondPart}-${thirdPart}`;
}

export function convertObjectToArray(object) {
  return Object.keys(object).map((id) => {
      const item = object[id];
      return { id, ...item };
  });
}
