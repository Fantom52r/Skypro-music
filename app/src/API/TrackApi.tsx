const URL =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";

export const getData = async () => {
  try {
    const response = await fetch(URL)
      .then((res) => res.json())
      .then((res) => res.data);
return response
  } catch (error) {
    console.error("Произошла ошибка " + error);
  }
};
