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

      $('#addConfirmButton').click(addItem);
      $('#removeButton').click(removeItem);
      $('#registerConfirmButton').click(register);
      $('#changeButton').click(changeUser);
      interval = setInterval(update, 2000);
  });

  function update() {
      getData();
  }

  function getData() {
      $.getJSON("data.json", updateData);
  }

  function showAddItem() {
      Materialize.toast("Display Modal with Forms to add item", 2000);
  }

  function addItem() {
      var details = {};
      details.name = $("#productName").val();
      details.bestbefore = $("#productBarcode").val();
      details.barcode = $("#productBestBefore").val();
      details.uid = "1"; //TODO set this to curUser.id;
      console.log(details);
      $.ajax({
          url: "php/addItem.php",
          data: details
      }).done(addItemResponse);
  }

  function addItemResponse(response) {
      console.log(response);
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

  function register() {
      var details = {};
      //details.username = $("#registerForm :input[name=username]").val();
      //TODO hook up to form
      details.name = $('#registerUserName').val();
      $.ajax({
          url: "php/register.php",
          data: details
      }).done(registerResponse);
  }

  function registerResponse(response) {
      console.log("Server Response: " + response);
      //TODO change to toast
  }

  function changeUser() {
      //TODO currently lists all users, should display nicely and allow user to choose, setting curUser to choice.
      $.ajax({
          url: "php/getUsers.php"
      }).done(changeResponse);
  }

  function changeResponse(response) {
      users = [];
      var parser;
      var xmlDoc;
      if (window.DOMParser) {
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(response, "text/xml");
      } else {
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(response);
      }
      var users = xmlDoc.getElementsByTagName("user");
      for (var i = 0; i < users.length; i++) {
          var id = users[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
          var name = users[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
          console.log(id + ": " + name);
      }
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