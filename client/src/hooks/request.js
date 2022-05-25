const API_URL = 'http://localhost:8000';

// Submit given plan data to plan system.
async function httpSubmitPlan(plan) {
  try {
    return await fetch(`${API_URL}/plans`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plan),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

export { httpSubmitPlan };
