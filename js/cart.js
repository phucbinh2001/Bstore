let cart = [];
const addToCart = async (id, soluong) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Đã thêm vào giỏ hàng",
    showConfirmButton: false,
    timer: 1000,
  });

  const sluong = soluong == null ? 1 : soluong;
  let storage = localStorage.getItem("cart");
  if (storage) {
    cart = JSON.parse(storage);
  }

  let product = await getProductById(id);

  let item = cart.find((c) => c.product.id == id);
  if (item) {
    item.quantity += sluong;
  } else {
    cart.push({ product, quantity: sluong });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

const showCart = () => {
  let storage = localStorage.getItem("cart");
  if (storage) {
    cart = JSON.parse(storage);
  }
  if (cart.length == 0) {
    $("#commerce").html(`
      <div class="empty">
      <img src="./images/empty.svg" alt="">
      <p>Chưa có sản phẩm nào, <a href="./index.html">Mua ngay</a></p>
      </div>
    `);
  } else {
    let total = 0;
    $("#carts").html("");
    cart.forEach((v, i) => {
      $("#carts").append(
        `
      <tr class="cart_item">
        <td class="product-remove hidden-xs pt-5">
        <button onclick="removeItem(${v.product.id})" type="button" class="btn btn-outline-secondary">&times;</button>
        </td>
        <td class="product-thumbnail hidden-xs">
          <a>
            <img width="100" height="150" src="./images/dienthoai/${v.product.anh}" alt="Product-2" />
          </a>
        </td>
        <td class="pt-5 product-name">
          <a href="">` +
          v.product.tensp +
          `</a>
        </td>
        <td class="pt-5 product-price text-center">
          <span class="amount">${v.product.gia.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}</span>
        </td>
        <td class="pt-5 product-quantity text-center">
          <div class="product-quantity">
            <div class="quantity">
              <div class="input-group">
                <button class="btn btn-outline-secondary" type="button">
                  -
                </button>
                <input style="text-align: center" type="number" class="form-control" placeholder="1" aria-label="Recipient's username with two button addons"
                value="${v.quantity}"/>
                <button class="btn btn-outline-secondary" type="button">
                  +
                </button>
              </div>
            </div>
          </div>
        </td>
        <td class="pt-5 product-subtotal hidden-xs text-center">
          <span class="amount">${(
            v.product.gia * v.quantity
          ).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}</span>
        </td>
      </tr>
      `
      );
      total += v.product.gia * v.quantity;
      $("#tong").html(
        total.toLocaleString("it-IT", { style: "currency", currency: "VND" })
      );
    });
  }
};

const xoagiohang = () => {
  localStorage.setItem("cart", "");
  showCart();
};

const removeItem = (id) => {
  let storage = localStorage.getItem("cart");
  if (storage) {
    cart = JSON.parse(storage);
  }
  cart = cart.filter((item) => item.product.id != id);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  showCart();
};

const checkout = async () => {
  Swal.fire({
    title: "Đặt hàng thành công",
    text: "Chúng tôi cam kết giao hàng trong 1 - 3 ngày",
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Trở về trang chủ",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location = "./index.html";
    }
  });

  var thanhtoan = document.getElementsByName("thanhtoan");

  for (var i = 0, length = thanhtoan.length; i < length; i++) {
    if (thanhtoan[i].checked) {
      thanhtoan = (thanhtoan[i].value);
      break;
    }
  }

  var vanchuyen = document.getElementsByName("vanchuyen");

  for (var i = 0, length = vanchuyen.length; i < length; i++) {
    if (vanchuyen[i].checked) {
      vanchuyen = (vanchuyen[i].value);
      break;
    }
  }

  const data = {
    address: document.getElementById("diachi").value,
    hoten: document.getElementById("hoten").value,
    sdt: document.getElementById("sdt").value,
    ghichu: document.getElementById("ghichu").value,
    trangthai: null,
    thanhtoan,
    vanchuyen,
    ngaydat: new Date(),
  };
  console.log(data.thanhtoan);
  if (data.address == "" || data.hoten == "" || data.sdt == "") {
    Swal.fire({
      icon: "error",
      title: "Chưa điền thông tin",
      text: "Hãy kiểm tra lại!",
    });
  } else {
    const urlProducts = url + "orders";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = await fetchAPI(urlProducts, option);
    processOrderDetail(res.id);
  }
};

const processOrderDetail = async (orderId) => {
  let storage = localStorage.getItem("cart");
  if (storage) {
    cart = JSON.parse(storage);
  }

  let orderDetails = [];
  cart.forEach((v) => {
    let orderDetail = {
      order_id: orderId,
      tendt: v.product.tensp,
      gia: v.product.gia,
      quantity: v.quantity,
    };
    orderDetails.push(orderDetail);
  });
  console.log(orderDetails);
  let promises = orderDetails.map((item) => {
    return postOrderDetail(item);
  });
  Promise.all(promises);
  cart = [];
  localStorage.removeItem("cart");
};

const postOrderDetail = async (data) => {
  const urlProducts = url + "chitietdonhang";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log(urlProducts);
  console.log(option.body);
  await fetchAPI(urlProducts, option);
};
