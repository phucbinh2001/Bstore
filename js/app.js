const url = "https://60cac2df21337e0017e42f3b.mockapi.io/";

const fetchAPI = async (url, option) => {
  const response = await fetch(url, option);
  return response.json();
};
