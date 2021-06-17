const getthuonghieu = async () => {
  const urlProducts = url + "brands";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  console.log(urlProducts);
  showBrands(res);
};

const showBrands = (data) => {
  brandsArr = data;
  brandsArr.forEach((v) => {
    $('#brandList').append(
    `<li class="list-group-item w-100"
    onclick="getProductByBrand(${v.id})">${v.tenthuonghieu}</li>`
    )
  })
};
