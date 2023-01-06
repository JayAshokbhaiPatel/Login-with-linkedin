import { LINKEDIN_API } from '../../config/app';

function Button() {
  const popUp = () => {
    const { clientID, redirectURI, oauthUrl, scope, state } = LINKEDIN_API;

    const finalURL = `${oauthUrl}&client_id=${clientID}&scope=${scope}&state=${state}&redirect_uri=${redirectURI}`;

    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      finalURL,
      'Linkedin',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
        width +
        ', height=' +
        height +
        ', top=' +
        top +
        ', left=' +
        left
    );
  };

  return (
    <>
      <button onClick={popUp}>Sign in with Linkedin</button>
    </>
  );
}

export default Button;
