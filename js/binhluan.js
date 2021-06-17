const themBinhluan = async () => {
  if ($("#username").val() == "" || $("#noidung").val() == "") {
    Swal.fire({
      icon: "warning",
      title: "Vui lòng điên đủ thông tin",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    const data = {
      username: $("#username").val(),
      noidung: $("#noidung").val(),
      idsp: Number($("#idsp").val()),
    };

    const urlProducts = url + "comments";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetchAPI(urlProducts, option);
    showComment();
  }

  //   //Thong bao
  //   Swal.fire({
  //     icon: "success",
  //     title: "Đã lưu",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  //   setTimeout(() => {
  //     window.location = "./danhmuc.html";
  //   }, 800);
};

const showComment = async () => {
  let id = localStorage.getItem("idProduct");
  const urlProducts = url + "comments";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetchAPI(urlProducts, option);
  cmt = res.filter((value) => value.idsp == id);
  $("#cmt_box").html("");
  cmt.forEach((v) => {
    $("#cmt_box").append(`
      <div
        class="d-flex justify-content-between mb-3 align-items-center"
        >
        <div class="user d-flex flex-row align-items-center">
            <img
            src="./images/avatar.png"
            width="40" height="40"
            class="user-img rounded-circle mr-2 pr-2"
            style="
    margin-right: 10px; object-fit:cover
"
            />
            <span
            ><small class="font-weight-bold text-primary"
                >${v.username}</small
            ><br>
            <small class="font-weight-bold"
                >${v.noidung}</small
            ></span
            >
        </div>
        </div>
      `);
  });
};

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

const getParam = (param) => {
  let url = window.location.href;
  url = new URL(url);
  return url.searchParams.get(param);
};
