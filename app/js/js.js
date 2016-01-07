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

      $('#addButton').click(addItem);
      $('#removeButton').click(removeItem);
      interval = setInterval(update, 2000);
  });

  function update() {
      getData();
  }

  function getData() {
      $.getJSON("data.json", updateData);
  }

  function addItem() {
      Materialize.toast("Display Modal with Forms to add item, then add item to database", 2000);
  }

  function removeItem() {
      Materialize.toast("Display Modal with list of items, allow user to click, then remove item from database", 2000);
  }

  function removeThisItem(data) {
      Materialize.toast("Remove PID: " + data, 2000);
  }

  function editItem(data) {
      Materialize.toast("Display Modal with Forms to edit item, i.e. to add expiry date", 2000);
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
          table = table + "<tr><td>" + data[i].name + "</td><td>" + data[i].date + "</td><td><a class='white-text' onclick='editItem(" + data[i].pid + ")'>Edit</a></td><td><a class='red-text' onclick='removeThisItem(" + data[i].pid + ")'>Remove</a></td></tr>";
      }
      table = table + "</tbody></table>";
      $('#productDisplay').html(table);
  }