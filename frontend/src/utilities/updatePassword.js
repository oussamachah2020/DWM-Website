const updatePassword = async (password, url, token) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  let isSuccess = false;
  const json = await response.json();
  if (response.ok) {
    isSuccess = true;
  }

  return { isSuccess, json };
};

export default updatePassword;
