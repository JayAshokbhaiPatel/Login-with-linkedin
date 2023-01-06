export const LINKEDIN_API = {
  clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
  redirectURI: 'http://localhost:3000/auth/linkedin',
  oauthUrl: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
  scope: 'r_liteprofile%20r_emailaddress',
  state: '123456',
};

export const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
