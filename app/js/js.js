  $(document).ready(function () {
      if (localStorage.user == undefined) {
          localStorage.user = JSON.stringify({
              "name": "",
              id: 0
          });
      }
      update();
      $('.button-collapse').sideNav({
          menuWidth: 175,
          closeOnClick: true
      });
      $('.modal-trigger').leanModal();
      interval = setInterval(update, 2000);
  });

  function update() {
      getData();
      var user = JSON.parse(localStorage.user);
      if (user.name != undefined) {
          $(".usernameDisplay").html("Logged in as: " + user.name);
      } else {
          $(".usernameDisplay").html("Not Logged In");
      }
  }

  function getData() {
      $.getJSON("data.json", updateData);
  }

  function showAddItem() {
      Materialize.toast("Display Modal with Forms to add item", 2000);
  }

  function addItem() {
      var user = JSON.parse(localStorage.user);
      if (user.id != 0) {
          var details = {};
          details.name = $("#productName").val();
          details.barcode = $("#productBarcode").val();
          details.bestbefore = $("#productBestBefore").val();
          details.uid = user.id;
          console.log("Adding Product: " + details);
          $.ajax({
              url: "php/addItem.php",
              data: details
          }).done(addItemResponse);
      } else {
          Materialize.toast("Please log in or create a user to do this.", 2000);
      }
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
      Materialize.toast(response, 1000);
      //TODO change to toast
  }

  function changeUser() {
      var user = {};
      user.id = parseInt($(this).attr('uid'));
      user.name = $(this).attr('name');
      console.log(user);
      localStorage.user = JSON.stringify(user);
  }

  function logout() {
      Materialize.toast("Logged Out", 2000);
      localStorage.user = JSON.stringify("{'name':'','id':0}");
  }

  function getUsers() {
      //TODO currently lists all users, should display nicely and allow user to choose, setting curUser to choice.
      $.ajax({
          url: "php/getUsers.php"
      }).done(getUsersResponse);
  }

  function getUsersResponse(response) {
      var users = [];
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
      var userList = "";
      for (var i = 0; i < users.length; i++) {
          var id = users[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
          var name = users[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
          userList = userList + "<a class='modal-action modal-close changeUserSelection' uid=" + id + " name = " + name + ">" + name + "</a><br>";
      }
      $("#userList").html(userList);
      $('.changeUserSelection').click(changeUser);
  }

  function getProducts() {
      $.ajax({
          url: "php/getProducts.php"
      }).done(getProductsResponse);
  }

  function getProductsResponse(response) {
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
      var data = [];
      var products = xmlDoc.getElementsByTagName("product");
      var productList = "";
      for (var i = 0; i < products.length; i++) {
          var pid = products[i].getElementsByTagName("pid")[0].childNodes[0].nodeValue;
          var name = products[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
          var date = products[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;
          var json = '{"pid": ' + pid + ', "name": "' + name + '", "date": "' + date + '" }';
          data.push(JSON.parse(json));
      }
      var table = "<table><thead><tr><th>Product</th><th>Date</th></tr></thead><tbody>";
      for (var i = 0; i < data.length; i++) {
          table = table + "<tr><td>" + data[i].name + "</td><td>" + data[i].date + "</td><td><a class='white-text' onclick='editItem(" + data[i].pid + ")'>Edit</a></td><td><a class='red-text' onclick='removeThisItem(" + data[i].pid + ")'>Remove</a></td></tr>";
      }
      table = table + "</tbody></table>";
      $('#productDisplay').html(table);

  }

  function updateData(data) {
      //console.log(data);
      $('#temperatureDisplayText').text(data.temp);
      $('#targetTemperatureDisplayText').text(data.target);
      $('#doorStatusDisplayText').text(data.doorOpen);
      $('#lastUpdatedText').text(data.time)
      getProducts();
  }