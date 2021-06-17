const getProductsNew = async () => {
  const urlProducts = url + "products";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  console.log(urlProducts);
  showDuLieu(res);
};

const showDuLieu = (data) => {
  productsNew = data.filter((value) => value.new == true);
  for (let index = 0; index < 8; index++) {
    const product = productsNew[index];
    $('#spmoi').append(`
    <div class="sanpham-item">
          <div onclick="productDetail(${product.id})" class="product-thumb clearfix">
            <a  class="product-thumb">
              <img src="./images/dienthoai/${product.anh}" />
            </a>
            <span class="badge bg-danger tag">New</span>
          </div>
          <div class="product-info text-center clearfix">
            <h5 class="card-title">${product.tensp}</h5>
            <div class="price">
              <p class="gia text-danger">${product.gia.toLocaleString("it-IT", { style: "currency", currency: "VND",})}</p>
            </div>
          </div>
          <div class="add-to-cart text-center">
            <a onclick="addToCart(${product.id})" class="btn btn-danger w-100">THÊM VÀO GIỎ</a>
          </div>
        </div>
    `);
  }

  productsChay = data;
  for (let index = 0; index < 8; index++) {
    const product = productsChay[index];
    let tag = "";
    if (product.new == true) {
      tag = '<span class="badge bg-danger tag">New</span>';
    } else {
      tag = "";
    }
    $('#spbanchay').append(`
      <div class="sanpham-item">
        <div onclick="productDetail(${product.id})" class="product-thumb clearfix">
          <a class="product-thumb">
            <img src="./images/dienthoai/${product.anh}" />
          </a>
          ${tag}
        </div>
          <div class="product-info text-center clearfix">
            <h5 class="card-title">${product.tensp}</h5>
            <div class="price">
              <p class="gia text-danger">${product.gia.toLocaleString("it-IT", { style: "currency", currency: "VND",})}</p>
            </div>
          </div>
          <div class="add-to-cart text-center">
            <a onclick="addToCart(${product.id})" class="btn btn-danger w-100">THÊM VÀO GIỎ</a>
          </div>
        </div>
    `);
      `

        `;
  }
  addHover();
};

const addHover = () => {
  sanpham = document.getElementsByClassName("sanpham-item");
  for (let i = 0; i < sanpham.length; i++) {
    sanpham[i].onmouseover = function () {
      sanpham[i].children[2].style.opacity = "1";
    };
    sanpham[i].onmouseout = function () {
      sanpham[i].children[2].style.opacity = "0";
    };
  }
}

const getProductByBrand = async (id) => {
  const urlProducts = url + "products";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  const brandInfo = await showBrandName(id);
  showBrandProduct(res, id, brandInfo.tenthuonghieu);
};


const showBrandProduct = (data, id, brandname) => {
  if (id == null) {
    products = data;
    brandname = "Thương hiệu";
  } else {
    products = data.filter((value) => value.id_thuonghieu == id);
  }
  $('#brandname').html(brandname);
  $('#productBrand').html('');
  products.forEach((v) => {
    let tag = "";
    if (v.hot == true) {
      tag = '<span class="badge bg-danger tag">HOT</span>';
    } else {
      tag = "";
    }
    $('#productBrand').append(`
      <div class="sanpham-item">
        <div onclick="productDetail(${v.id})"  class="product-thumb clearfix">
          <a class="product-thumb">
            <img src="./images/dienthoai/${v.anh}"/>
          </a>
          ${tag}
        </div>
        <div class="product-info text-center clearfix">
          <h5 class="card-title">${v.tensp}</h5>
          <div class="price">
            <p class="gia text-danger">
              ${v.gia.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
        <div class="add-to-cart text-center">
          <a onclick="addToCart(${v.id})" class="btn btn-danger w-100">THÊM VÀO GIỎ</a>
        </div>
      </div>
    `);
  });
  addHover();
};

const showBrandName = async (id) => {
  const urlProducts = url + "brands/" + id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await fetchAPI(urlProducts, option);
};
