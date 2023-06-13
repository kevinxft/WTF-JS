/**
 * 两个字符串数字相加
 * @param {string} a
 * @param {string} b
 */
function sum(a, b) {
  const len = Math.max(a.length, b.length);
  a = a.padStart(len);
  b = b.padStart(len);
  let carry = 0;
  let ressult = "";
  for (let i = len - 1; i >= 0; i--) {
    const sum = +a[i] + +b[i] + carry;
    ressult = (sum % 10) + ressult;
    carry = Math.floor(sum / 10);
  }
  if (carry) {
    ressult = carry + ressult;
  }
  return ressult;
}
