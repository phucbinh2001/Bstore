const getNSX = async () => {
  const urlProducts = url + "brands";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  await showNSX(res);
};

const showNSX = async (data) => {
  NhaSX = data;
  $("#nsxTable").html("");
  NhaSX.forEach((v) => {
    showStatus =
      v.show == true
        ? '<i class="mdi mdi-eye"></i>'
        : '<i class="mdi mdi-eye-off"></i>';
    $("#nsxTable").append(
      `<tr>
        <td>${v.id}</td>
        <td>${v.tenthuonghieu}</td>
        <td style="text-align: center;">${showStatus}</i></td>
        <td style="text-align: center;"><a href="./danhmuc_sua.html?id=${v.id}")><i class="mdi mdi-lead-pencil .md-24"></i></a></td>
        <td style="text-align: center;"><a style="text-align: center; cursor: pointer; color: #ef5350" onclick=removeConfirm(${v.id})><i class="mdi mdi-delete md-24"></i></a></td>
      </tr>`
    );
  });
};

const suaNSX = () => {
  idNSX = getParam("id");
  getNSXById(idNSX);
};

const getNSXById = async (id) => {
  const urlProducts = url + "brands/" + id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  console.log(res);

  //Điền dữ liệu lên form
  $("#tennsx").val(res.tenthuonghieu);
  let ischeck = res.show == true ? false : true;
  $("#anhien").attr("checked", ischeck);
  $("#submit").attr("onclick", `updateNSX(${res.id})`);
};

const getSanPhambyNSX = async (id) => {
  const urlProducts = url + "products";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchAPI(urlProducts, option);
  soluong = res.filter((sp) => sp.id_thuonghieu == id);
  return soluong.length;
};

const removeConfirm = async (id) => {
  soLuongsp = await getSanPhambyNSX(id);
  if (soLuongsp > 1) {
    Swal.fire({
      title: "Không thể xoá",
      text:
        `Hiện có ${soLuongsp} sản phẩm thuộc nhà sản xuất này. Bạn chỉ có thể ẩn NSX này!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ẩn nhà sản xuất",
      cancelButtonText: "Đóng",
    }).then((result) => {
      if (result.isConfirmed) {
        hideNSX(id);
        // ?? làm sao chạy được await trong chỗ này
      }
    }).then(()=>{
       Swal.fire("Đã ẩn nhà sản xuất này!", "", "success");
    })
  } else {
    Swal.fire({
      title: "Xác nhận xoá",
      text:
        "Bạn có muốn xoá nhà sản xuất này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xoá ngay",
      cancelButtonText: "Đóng",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã xoá!", "", "success");
        removeNSX(id);
      }
    });
  }
};

const removeNSX = async (id) => {
  const urlProducts = url + "brands/" + id;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetchAPI(urlProducts, option);
  getNSX();
};


const hideNSX = async (id) => {
  const data = {
    show: false,
  };
  const urlProducts = url + "brands/" + id;
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetchAPI(urlProducts, option);
  getNSX();
}



const updateNSX = async (id) => {
  isHide = document.getElementById("anhien").checked;
  show = isHide ? false : true;
  const data = {
    show,
    tenthuonghieu: document.getElementById("tennsx").value,
  };
  const urlProducts = url + "brands/" + id;
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
    window.location = "./danhmuc.html";
  }, 800);
};

const themNSX = async () => {
  isHide = document.getElementById("anhien").checked;
  show = isHide ? false : true;
  const data = {
    show,
    tenthuonghieu: document.getElementById("tennsx").value,
  };
  const urlProducts = url + "brands";
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
    title: "Đã lưu",
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    window.location = "./danhmuc.html";
  }, 800);
};
