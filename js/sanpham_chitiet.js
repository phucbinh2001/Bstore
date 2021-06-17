const getProductById = async (id) => {
  const urlProducts = url + "products/" + id;
  console.log(urlProducts);
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await fetchAPI(urlProducts, option);
};

const productDetail = (id) => {
  localStorage.setItem("idProduct", id);
  let idProduct = localStorage.getItem("idProduct");
  window.location = "./chitietsp.html";
};

showDetailProduct = async () => {
  let idProduct = localStorage.getItem("idProduct");
  const productInfo = await getProductById(idProduct);
  console.log(productInfo);
  NameElements = document.getElementsByClassName("NameProduct");
  for (let index = 0; index < NameElements.length; index++) {
    NameElements[index].innerText = productInfo.tensp;
  }

  $("#btnAddCart").html(`
    <a onclick="addToCart(${idProduct})" class="btn btn-danger">THÊM VÀO GIỎ</a>
  `);

  $("#gia").append(
    productInfo.gia.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })
  );

  $("#imgProduct").append(`
    <img style="width: 90%" src="./images/dienthoai/${productInfo.anh}" />
  `);

  $("#soluong").keyup(function (e) {
    let soluong = $("#soluong").val();
    $("#btnAddCart").html(`
      <a onclick="addToCart(${idProduct}, ${soluong})" class="btn btn-danger">THÊM VÀO GIỎ</a>
    `);
  });

  $('#idsp').val(idProduct);
};

const submitForm = async () => {
  let name = $("#name").val();
  let address = $("#address").val();
  if (name == "" || address == "") {
    alert("Kiểm tra lại dữ liệu");
  } else {
    let id = $("#id").val();
    if (id == 0) {
      await addProduct();
    } else {
      await editProduct(id);
    }
  }
};
