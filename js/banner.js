const getBanner = async () => {
  const urlProducts = url + "banners";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  console.log(urlProducts);
  showBanner(res);
};

const showBanner = (data) => {
  data.forEach((v, i) => {
    let active = "";
    if (i == 0) {
      active = "active";
    }
    $('#topBanner').append(`
    <div class="carousel-item ${active}">
          <div class="slide-content">
            ${v.content}
          </div>
          <img src="./images/${v.img}" class="d-block w-100">
        </div>
    `);

  });
};
