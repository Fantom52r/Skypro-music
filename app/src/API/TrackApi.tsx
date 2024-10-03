const URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const getData = async () => {
  try {
    const response = await fetch(`${URL}/catalog/track/all`)
      .then((res) => res.json())
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error("Произошла ошибка " + error);
  }
};

export const registerUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${URL}/user/signup/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username: "testVasya",
      }),
    });
    return response.json();
  } catch (error) {}
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${URL}/user/login/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const user = await response.json();
    return user;
  } catch (error) {
alert(error)  }
};
