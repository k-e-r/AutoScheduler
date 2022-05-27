const API_URL = process.env['REACT_APP_API_URL'];

// Load plans and return as JSON.
async function httpGetPlans(userId, startDate, endDate) {
  const response = await fetch(`${API_URL}/plans/search`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
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

// Delete plan data
async function httpDeletePlan(id) {
  try {
    return await fetch(`${API_URL}/plans/delete/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Search & Delete plan data
async function httpSearchDeletePlan(baseId, date) {
  try {
    return await fetch(`${API_URL}/plans/delete`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        baseId: baseId,
        date: date,
      }),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

export {
  httpGetPlans,
  httpSubmitPlan,
  httpEditPlan,
  httpDeletePlan,
  httpSearchDeletePlan,
};
