const getDonHang = async () => {
  const urlProducts = url + "orders";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  showDuLieu(res);
  thongkedon(res);
};

const showDuLieu = (donHang) => {
  donHang = donHang.sort((a, b) => b.id - a.id);
  donHang.forEach((dh) => {
    let statusTag;
    if (dh.trangthai) {
      statusTag = `<span class='label label-rouded label-success '>Đã duyệt</span>`;
    } else if (dh.trangthai == false) {
      statusTag = `<span class='label label-rouded label-danger '>Đã huỷ</span>`;
    } else {
      statusTag = `<span class='label label-warning '>Chờ duyệt</span>`;
    }

    $("#tabledonHang").append(`
        <tr>
            <td>#${dh.id}</td>
            <td>
                <a href="./donhang_chitiet.html?id=${dh.id}" style="color: unset;">
                    <b>Khách hàng:</b> ${dh.hoten}
                    <br><b>Liên hệ:</b> ${dh.sdt}
                    <br><b>Địa chỉ nhận:</b>${dh.address}<br>
                    ${statusTag}
                </a>
            </td>
            <td>
                <b>Thanh toán:</b>${dh.thanhtoan}
                <br><b>Vận chuyển:</b>
                ${dh.vanchuyen}
                <br><b>Ngày đặt:</b> ${moment(dh.ngaynhap).format('DD/MM/YYYY')}
            </td>
            <td class="align-middle text-center">
                <button onclick=chotdon(${dh.id+',true'}) class="btn btn-success btn-circle btn-lg"><i class="fa fa-check"></i></button></a>
                <button onclick=huydon(${dh.id}) class="btn btn-danger btn-circle btn-lg"><i class="fa fa-times"></i></button></a>
            </td>
        </tr>
    `);
  });
};

const thongkedon = (data) => {
  const danggiao = data.filter((dh) => dh.trangthai == true);
  const dahuy = data.filter((dh) => dh.trangthai == false);
  const choduyet = data.length - dahuy.length - danggiao.length;
  $('#danggiao').html(danggiao.length);
  $('#tatca').html(data.length);
  $('#bihuy').html(dahuy.length);
  $('#choduyet').html(data.length - danggiao.length - dahuy.length);
}


const huydon = async (id) => {
  //Thong bao
  Swal.fire({
    title: "Bạn có muốn huỷ đơn?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Đóng"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Đã huỷ!",'',"success");
    }
  });
  setTimeout(() => {
    chotdon(id, false);
  }, 800);
};

const chotdon = async (id, action) => {
  const data = {
    // todo: lam tinh nang luu anh
    trangthai: action,
  };
  const urlProducts = url + "orders/" + id;
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetchAPI(urlProducts, option);

  if (action) {
    //Thong bao
    Swal.fire({
      icon: "success",
      title: "Đã chốt đơn",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  setTimeout(() => {
      window.location = "./donhang.html";
    }, 800);
};

const thongKe = () => {
  return "chua lam";
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

const donChiTiet = async () => {
  const id = getParam("id");
  const urlProducts = url + "orders/" + id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);

  //Điền dữ liệu lên form
  $("#nguoiNhan").html(res.hoten);
  $("#diachi").html(res.address);
  $("#ngaydat").html(moment(res.ngaynhap).format('DD/MM/YYYY'));
  $("#idDonHang").html("#" + res.id);

  await getDonbyId(id);
};

const getSanPhambyId = async (id) => {
  const urlProducts = url + "products/" + id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return (res = await fetchAPI(urlProducts, option));
};

//TODO show danh sach tat ca don hang
const getDonbyId = async (id) => {
  const urlProducts = url + "chitietdonhang";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  const donHang = res.filter((dh) => dh.order_id == id);
  //Điền dữ liệu lên form
  $("#nguoiNhan").html(res.hoten);
  $("#diachi").html(res.address);
  $("#ngaydat").html(res.ngaydat);
  $("#idDonHang").html("#" + id);
  $("#action").append(`
    <button onclick=huydon(${id}) class="btn btn-danger" type="button" > <span><i class="fa fa-times"></i> Huỷ đơn</span> </button>
    <button onclick=chotdon(${id + ',true'}) class="btn btn-success" type="button" > <span><i class="fa fa-check"></i> Chốt đơn</span> </button>
  `);

  let tongcong = 0;
  donHang.forEach((dh,i) => {
    $('#tableDonhang').append(`
      <tr>
        <td class="text-center">${i+1}</td>
        <td>${dh.tendt}</td>
        <td class="text-right">${dh.quantity} </td>
        <td class="text-right"> ${dh.gia.toLocaleString("it-IT", { style: "currency", currency: "VND",})} </td>
        <td class="text-right"> ${(dh.gia * dh.quantity).toLocaleString("it-IT", { style: "currency", currency: "VND",})} </td>
      </tr>
    `);
    tongcong += (dh.gia * dh.quantity)
  });
  $('#tongcong').html(tongcong.toLocaleString("it-IT", { style: "currency", currency: "VND",}));
};
