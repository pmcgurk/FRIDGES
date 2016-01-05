  $(document).ready(function () {
      update();
      var lastModal = "",
          modalOpenFunc = function () {
              console.log("opening modal: " + $(this).attr("value"));
              if (lastModal != "") {
                  $('#' + lastModal).closeModal();
                  console.log("closing modal: " + lastModal);
              }
              lastModal = $(this).attr("value");
              $('#' + $(this).attr("value")).openModal();
          }
      $('.button-collapse').sideNav({
          menuWidth: 175,
          closeOnClick: true
      });
      $('.modal-trigger').leanModal();

      $('.modal-opener').click(modalOpenFunc);
      interval = setInterval(update, 2000);
  });

  function update() {
      getData();
  }

  function getData() {
      $.getJSON("../static/data.json", updateData);
  }

  function dismissItem(data) {
      console.log("Remove item PID: " + data);
  }


  function updateData(data) {
      //console.log(data);
      $('#temperatureDisplayText').text(data.temp);
      $('#targetTemperatureDisplayText').text(data.target);
      $('#doorStatusDisplayText').text(data.doorOpen);
      $('#lastUpdatedText').text(data.time)
      displayProducts(data.products);
  }

  function displayProducts(data) {
      //console.log(data);
      var table = "<table><thead><tr><th>Product</th><th>Date</th></tr></thead><tbody>";
      for (var i = 0; i < data.length; i++) {
          table = table + "<tr><td>" + data[i].name + "</td><td>" + data[i].date + "</td><td><a class='red-text' onclick='dismissItem(" + data[i].pid + ")'>X</a></td></tr>";
      }
      table = table + "</tbody></table>";
      $('#productDisplay').html(table);
  }