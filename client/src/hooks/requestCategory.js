const API_URL = process.env['REACT_APP_API_URL'];

// Load categories and return as JSON.
async function httpGetCategories() {
  const response = await fetch(`${API_URL}/categories`);
  return await response.json();
}

// Edit plan data
async function httpEditCategory(id, category) {
  try {
    return await fetch(`${API_URL}/categories/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

export { httpGetCategories, httpEditCategory };
