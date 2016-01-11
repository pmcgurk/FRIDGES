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

  function removeThisItem(item, owner) {
      var user = JSON.parse(localStorage.user);
      if (owner == user.id) {
          var details = {};
          details.pid = item;
          $.ajax({
              url: "php/removeItem.php",
              data: details
          }).done(removeResponse);
      } else {
          Materialize.toast("You don't have permission to do that.", 2000);
      }
  }

  function removeResponse(response) {
      Materialize.toast(response, 1000);
      console.log(response);
  }

  function editModal() {
      //TODO fill this with the clicked products info
      $('#editConfirmButton').click(editItem);
      $('#editConfirmButton').attr("pid", 18);
      $('#productEditName').attr("placeholder", "Current Product Name");
      $('#productEditBestBefore').attr("placeholder", "Current Product BestBefore");      $('#productEditBarcode').attr("placeholder", "Current Product Barcode");
      $('#editItemModal').openModal();
  }

  function editItem() {
      var user = JSON.parse(localStorage.user);
      var owner = user.id;
      //TODO fix this to get the real owner
      if (owner == user.id) {
          var details = {};
          details.pid = $('#editConfirmButton').attr("pid");
          //TODO change from hardcoded value
          details.barcode = $('#productEditBarcode').val();
          details.bestbefore = $('#productEditBestBefore').val();
          details.name = $('#productEditName').val();
          $.ajax({
              url: "php/editItem.php",
              data: details
          }).done(editResponse);
      } else {
          Materialize.toast("You don't have permission to do that.", 2000);
      }
  }

  function editResponse(response) {
      console.log(response);
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
          var uid = products[i].getElementsByTagName("uid")[0].childNodes[0].nodeValue;
          var uname = products[i].getElementsByTagName("uname")[0].childNodes[0].nodeValue;
          var json = {
              "pid": pid,
              "name": name,
              "date": date,
              "uid": uid,
              "uname": uname
          };
          data.push(json);
      }
      var table = "<table><thead><tr><th>Owner</th><th>Product</th><th>Date</th></tr></thead><tbody>";
      for (var i = 0; i < data.length; i++) {
          table = table + "<tr><td>" + data[i].uname + "<td>" + data[i].name + "</td><td>" + data[i].date + "</td><td><a onclick='editModal()'>Edit</a></td><td><a class='red-text' onclick='removeThisItem(" + data[i].pid + "," + data[i].uid + ")'>Remove</a></td></tr>";
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