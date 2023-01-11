import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

function LinkedinPage() {
  const router = useRouter();

  const callApi = useCallback(async () => {
    if (router.query?.code) {
      window.localStorage.setItem('code', router.query.code as string);
      window.close();
      router.push('/profile');
    }
  }, [router]);

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
