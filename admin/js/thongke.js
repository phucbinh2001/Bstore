const thongke = async () => {
  //*** So lieu/
  sanpham = await getProducts();
  donhang = await getDonHang();
  thuonghieu = await getNSX();
  donBiHuy = donhang.filter((dh) => dh.trangthai == false);
  donChoDuyet = donhang.filter((dh) => dh.trangthai == null);
  tiLeHuy = (donBiHuy.length / donhang.length) * 100;
  $("#thuonghieu").html(thuonghieu.length);
  $("#sanpham").html(sanpham.length);
  $("#donhang").html(donhang.length);
  $("#tilehuy").html(Math.round(tiLeHuy * 100) / 100 + "%");
  $("#tileBar").css("width", tiLeHuy + "%");

  //***Chart
  const config = {
    type: "doughnut",
    data: (data = {
      labels: ["Đơn bị huỷ", "Đơn chưa duyệt", "Đơn đang giao"],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            donBiHuy.length,
            donChoDuyet.length,
            donhang.length - donBiHuy.length - donChoDuyet.length,
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
      options: [],
    }),
  };

  var myChart = new Chart(document.getElementById("myChart"), config);

  //***Top 5 bán chạy
  const top5 = sanpham
    .sort(function (a, b) {
      return a.luotmua < b.luotmua ? 1 : -1;
    })
    .slice(0, 5);

  top5.forEach((v) => {
    $("#top5Table").append(`
        <tr>
            <td>${v.tensp}</td>
            <td>
                <img src="../../images/dienthoai/${v.anh}" width="80">
            </td>
            <td>${v.luotmua}</td>
            <td>${v.soluong}</td>
        </tr>
    `);
  });
};

const getProducts = async () => {
  const urlProducts = url + "products";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return (res = await fetchAPI(urlProducts, option));
};

const getDonHang = async () => {
  const urlProducts = url + "orders";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return (res = await fetchAPI(urlProducts, option));
};

const getNSX = async () => {
  const urlProducts = url + "brands";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return (res = await fetchAPI(urlProducts, option));
};
