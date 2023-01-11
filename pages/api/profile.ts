import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === 'POST') {
    const { code } = req.body;

    if (code) {
      const profileData = await axios.get(`https://api.linkedin.com/v2/me`, {
        headers: {
          Authorization: `Bearer ${code}`,
        },
      });

      if (profileData.status === 200) {
        return res.status(200).json(profileData.data);
      }
    }
  }
}
