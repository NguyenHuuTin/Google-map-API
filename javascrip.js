function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  var myLatlng = new google.maps.LatLng(10.843582, 106.795193);
  var schLatlng = new google.maps.LatLng(10.845877, 106.794538);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myLatlng,
  });
  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);


  //Hiển thị thông tin
  const infowindow1 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>Nguyễn Hữu Tin</b><br>Năm sinh:09/08/2000<br><br>SĐT: 0941866373<br>Email:5951071106@st.utc2.edu.vn<br>Địa Chỉ:KTX ĐẠI HỌC GIAO THÔNG VẬN TẢI PHÂN HIỆU TẠI TP.HCM</div>',
    position: myLatlng,
  });

  //Hiển thị thông tin
  const infowindow2 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>PHÂN HIỆU TRƯỜNG ĐH GTVT TẠI TP. HỒ CHÍ MINH</b><br>Địa chỉ: 450-451 Lê Văn Việt, Phường Tăng Nhơn Phú A, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh</div>',
    position: schLatlng,
  });

  // Marker
  const marker = new google.maps.Marker({
    position: myLatlng,
    title: "My house",
    map,
    icon: "./img/my_img.jpg",
  });

  const marker1 = new google.maps.Marker({
    position: schLatlng,
    title: "Đại học GTVT Phân hiệu Tp.HCM",
    map,
    icon: "./img/utc2.jpg",
  });

  //   document.getElementById("myhouse") = marker;
  //   document.getElementById("utc2") = marker1;

  // Khi click vào Marker thì hiển thị
  google.maps.event.addListener(marker, "click", function () {
    infowindow1.open(map, marker);
  });
  google.maps.event.addListener(marker1, "click", function () {
    infowindow2.open(map, marker1);
  });
}

google.maps.event.addDomListener(window, "load", initMap);
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
