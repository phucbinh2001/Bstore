const url = "https://60cac2df21337e0017e42f3b.mockapi.io/";

const fetchAPI = async (url, option) => {
  const response = await fetch(url, option);
  return response.json();
};

const getParam = (param) => {
  let url = window.location.href;
  url = new URL(url);
  return url.searchParams.get(param);
}
