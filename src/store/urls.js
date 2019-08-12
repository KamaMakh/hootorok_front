const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
const resetPasswordUrl = `${serverUrl}/auth/sendRecoveryHash`;
const loginUrl = `${serverUrl}/auth/login`;

export {
  serverUrl,
  registerUrl,
  resetPasswordUrl,
  loginUrl,
};
