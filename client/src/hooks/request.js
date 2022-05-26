const API_URL = 'http://localhost:8000';

// Load categories and return as JSON.
async function httpGetCategories() {
  const response = await fetch(`${API_URL}/categories`);
  return await response.json();
}

// Load plans and return as JSON.
async function httpGetPlans(startDate, endDate) {
  const response = await fetch(`${API_URL}/plans/search`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start: startDate,
      end: endDate,
    }),
  });
  return await response.json();
}

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

// Edit plan data
async function httpEditPlan(id, plan) {
  try {
    return await fetch(`${API_URL}/plans/${id}`, {
      method: 'put',
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

export { httpGetCategories, httpGetPlans, httpSubmitPlan, httpEditPlan };
