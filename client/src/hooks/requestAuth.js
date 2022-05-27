const API_URL = 'http://localhost:8000';

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

// Submit given plan data to plan system.
// async function httpSubmitPlan(plan) {
//   try {
//     return await fetch(`${API_URL}/plans`, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(plan),
//     });
//   } catch (err) {
//     return {
//       ok: false,
//     };
//   }
// }

export { httpLogin };
