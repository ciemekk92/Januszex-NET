import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

// Mock the request issued by the react app to get the client configuration parameters.
// @ts-ignore
window.fetch = () => {
  return Promise.resolve(
    {
      ok: true,
      json: () => Promise.resolve({
        "authority": "https://localhost:5001",
        "client_id": "Januszex",
        "redirect_uri": "https://localhost:5001/authentication/login-callback",
        "post_logout_redirect_uri": "https://localhost:5001/authentication/logout-callback",
        "response_type": "id_token token",
        "scope": "JanuszexAPI openid profile"
     })
    });
};
