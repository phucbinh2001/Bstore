const getSanPham = async () => {
  const urlProducts = url + "products";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  showDuLieu(res);
};

const showDuLieu = (products) => {
  $("#tableProducts").html("");
  products = products.sort((a, b) => b.id - a.id);
  products.forEach((product) => {
    let hotTag = product.hot
      ? "<span class='label label-rouded label-danger '>HOT</span>"
      : "";
    let showTag = product.show
      ? "<span class='text-success'>Đang hiện</span>"
      : "<span class='text-danger'>Đang ẩn</span>";

    let mota =
      product.mota == "" || product.mota == null
        ? "Chưa có mô tả"
        : product.mota;
    $("#tableProducts").append(`
        <tr>
            <td>${product.id}</td>
            <td><b>${product.tensp}</b><br>
            ${showTag}
            <br>Tồn: ${product.soluong}<br>
            ${hotTag}
            </td>
            <td class="align-middle"><img width="80px" src="../../images/dienthoai/${
              product.anh
            }" alt=""></td>
            <td style="text-align: center;">${product.gia.toLocaleString(
              "it-IT",
              { style: "currency", currency: "VND" }
            )}</td>
            <td>${mota.substring(0, Math.min(mota.length, 180))}</td>
            <td>
            <p>Lượt mua: ${product.luotmua}</p>
            <p>Ngày nhập: ${moment(product.ngaynhap).format("DD/MM/YYYY")}</p>
            </td>
            <td style="text-align: center;"><a href="./sanpham_sua.html?id=${
              product.id
            }"><i class="mdi mdi-lead-pencil .md-24"></i></a></td>
            <td onclick=removeConfirm(${
              product.id
            }) style="text-align: center; cursor: pointer; color: #ef5350"><a><i class="mdi mdi-delete md-24"></i></a></td>
        </tr>
    `);
  });
};

const getThuongHieu = async () => {
  const urlProducts = url + "brands";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return (res = await fetchAPI(urlProducts, option));
};

const formThuongHieu = async (id_thuonghieu) => {
  //Điền dữ liệu option
  const thuongHieu = await getThuongHieu();
  thuongHieu.forEach((v) => {
    let selected = v.id == id_thuonghieu ? "selected" : "";
    $("#thuonghieu").append(`
        <option ${selected} value="${v.id}">${v.tenthuonghieu}</option>
    `);
  });
};

const suaSanPham = () => {
  idProduct = getParam("id");
  getSanPhambyId(idProduct);
};

const getSanPhambyId = async (id) => {
  const urlProducts = url + "products/" + id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);

  //Điền dữ liệu lên form
  let isHide = res.show == true ? false : true;
  let isHot = res.hot == true ? true : false;
  $("#tendt").val(res.tensp);
  $("#soluong").val(res.soluong);
  $("#gia").val(res.gia);
  $("#anhsp").attr("src", "../../images/dienthoai/" + res.anh);
  $("#hot").attr("checked", isHot);
  $("#anhien").attr("checked", isHide);
  $("#submit").attr("onclick", `updateProduct(${res.id})`);
  await formThuongHieu(res.id_thuonghieu);
};

const updateProduct = async (id) => {
  if (
    $("#tendt").val() == "" ||
    $("#gia").val() == "" ||
    $("#soluong").val() == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Vui lòng điên đủ thông tin",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    isHide = document.getElementById("anhien").checked;
    show = isHide ? false : true;
    isHot = document.getElementById("hot").checked;
    hot = isHot ? true : false;

    const data = {
      // todo: lam tinh nang luu anh
      tensp: $("#tendt").val(),
      gia: Number($("#gia").val()),
      soluong: $("#soluong").val(),
      id_thuonghieu: $("#thuonghieu :selected").val(),
      hot,
      show,
      mota: $("#elm1").val(),
    };
    const urlProducts = url + "products/" + id;
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetchAPI(urlProducts, option);

    //Thong bao
    Swal.fire({
      icon: "success",
      title: "Đã lưu thay đổi",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location = "./sanpham.html";
    }, 800);
  }
};

// *** Thêm sản phẩm
const themSP = async () => {
  if (
    $("#tendt").val() == "" ||
    $("#gia").val() == "" ||
    $("#soluong").val() == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Vui lòng điên đủ thông tin",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    isHide = document.getElementById("anhien").checked;
    show = isHide ? false : true;
    isHot = document.getElementById("hot").checked;
    hot = isHot ? true : false;

    const data = {
      // todo: lam tinh nang luu anh
      tensp: $("#tendt").val(),
      gia: $("#gia").val(),
      soluong: $("#soluong").val(),
      id_thuonghieu: $("#thuonghieu :selected").val(),
      hot,
      show,
      mota: $("#elm1").val(),
      ngaynhap: new Date(),
      luotmua: 0,
    };
    const urlProducts = url + "products";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetchAPI(urlProducts, option);

    //Thong bao
    Swal.fire({
      icon: "success",
      title: "Đã thêm sản phẩm",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location = "./sanpham.html";
    }, 800);
  }
};

// Xoá sản phẩm
const removeConfirm = (id) => {
  Swal.fire({
    title: "Xác nhận xoá",
    text: "Bạn có chắc muốn xoá sản phẩm này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xoá ngay",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Đã xoá!", "", "success");
      removeSP(id);
    }
  });
};

const removeSP = async (id) => {
  const urlProducts = url + "products/" + id;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetchAPI(urlProducts, option);
  await getSanPham();
};
