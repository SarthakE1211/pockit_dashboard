const UserLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Handle successful login
    }
  } catch {
    // Handle error
  }
};

export default UserLogin