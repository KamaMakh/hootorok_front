const serverUrl = process.env.DEV ? 'http://localhost:13579' : 'https://baza-hutorok.com:13579';
const registerUrl = `${serverUrl}/auth/register`;
const resetPasswordUrl = `${serverUrl}/auth/sendRecoveryHash`;

export {
  serverUrl,
  registerUrl,
  resetPasswordUrl,
};
