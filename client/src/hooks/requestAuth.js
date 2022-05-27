const API_URL = process.env['REACT_APP_API_URL'];

async function httpLogin(userInfo) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
  return await response.json();
}

async function httpRegister(userInfo) {
  const response = await fetch(`${API_URL}/user/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
  return await response.json();
}

export { httpLogin, httpRegister };
