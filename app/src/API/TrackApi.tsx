const URL =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track";

export const getData = async () => {
  try {
    const response = await fetch(`${URL}/all`)
      .then((res) => res.json())
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error("Произошла ошибка " + error);
  }
};

// Сказано Убрать , но я  закоментил на всякий случай!

// export const getTrack = async (id) => {
//   try {
//     const response = await fetch(`${URL}/${id}`)
//       .then((res) => res.json())
//       .then((res) => res.data);
//     return response;
//   } catch (error) {
//     console.error("Произошла ошибка " + error);
//   }
// };
