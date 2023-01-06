// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import axios from 'axios';

import { CLIENT_SECRET, LINKEDIN_API } from '../config/app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === 'POST') {
    const { code } = req.body;

    if (code) {
      const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };

      const accessTokenApiResponse = await axios.post(
        `https://www.linkedin.com/oauth/v2/accessToken?code=${code}&grant_type=authorization_code&client_id=${LINKEDIN_API.clientID}&client_secret=${CLIENT_SECRET}&redirect_uri=${LINKEDIN_API.redirectURI}`,
        {},
        config
      );

      if (accessTokenApiResponse.status === 200) {
        if (accessTokenApiResponse.data) {
          return res.status(200).json(accessTokenApiResponse.data);
        }
      }
    }
  }
}
