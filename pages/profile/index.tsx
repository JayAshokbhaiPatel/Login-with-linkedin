import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface API_RESPONSE {
  firstName: {
    localized: {
      en_US: string;
    };
    preferredLocale: {
      country: string;
      language: string;
    };
  };
  lastName: {
    localized: {
      en_US: string;
    };
    preferredLocale: {
      country: string;
      language: string;
    };
  };
  id: string;
  localizedFirstName: string;
  localizedLastName: string;
  profilePicture: {
    displayImage: string;
  };
}

function Profile() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [profileData, setProfileData] = useState<API_RESPONSE | null>(null);

  const getToken = useCallback(async () => {
    try {
      const code = window.localStorage.getItem('code');
      const res = await axios.post('/api/linkedin', { code: code });

      if (res.status === 200) {
        window.localStorage.setItem('linkedin', JSON.stringify(res.data));
      }
    } catch (error) {
      console.error('error', error);
    }
  }, []);

  const handleClickGetProfileData = useCallback(async () => {
    if (accessToken) {
      try {
        const res = await axios.post(`/api/profile`, { code: accessToken });
        if (res.status === 200) {
          setProfileData(res.data as API_RESPONSE);
        }
      } catch (error) {
        console.error('error', error);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const linkedinDataLS = JSON.parse(window.localStorage.getItem('linkedin') as string);
      console.log('linkedinDataLS: ', linkedinDataLS);

      if (linkedinDataLS === null) {
        getToken();
      } else {
        const access_token = linkedinDataLS?.access_token;
        setAccessToken(access_token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>Profile Page</p>
      {profileData ? (
        <>
          <p>First name : {profileData.localizedFirstName}</p>
          <p>Last Name : {profileData.localizedLastName}</p>
        </>
      ) : null}
      <button onClick={handleClickGetProfileData}>Get Profile Data</button>
    </>
  );
}

export default Profile;
