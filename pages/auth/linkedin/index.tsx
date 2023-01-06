import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

function LinkedinPage() {
  const router = useRouter();
  const { login } = useAuth();

  const callApi = useCallback(async () => {
    if (router.query.code) {
      const res = await axios.post(`/api/linkedin`, {
        code: router.query.code,
      });

      console.log('res: ', res);
      if (res.status === 200) {
        if (res.data) {
          setTimeout(() => {
            login(res.data);
          }, 3000);
          setTimeout(() => {
            window.close();
          }, 3000);
        }
      }
    }
  }, [router.query]);

  useEffect(() => {
    callApi();
  }, [callApi]);

  return (
    <div>
      <p>This is the callback page</p>
    </div>
  );
}

export default LinkedinPage;
