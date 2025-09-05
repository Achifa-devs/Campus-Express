export function generateSixDigitId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
export function generateTenDigitId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}
