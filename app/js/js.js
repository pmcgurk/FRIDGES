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
      $(document).on("click", ".editModalButton", editModal);
      $(document).on("click", ".claimButton", claimItem);
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

  function claimItem() {
      var user = JSON.parse(localStorage.user);
      pid = $(this).attr("pid");
      details = {
          "pid": pid,
          "owner": user.id
      };
      $.ajax({
          url: "php/claimItem.php",
          data: details
      }).done(editResponse);
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
      pid = $(this).attr("pid");
      name = $(this).attr("name");
      date = $(this).attr("date");
      owner = $(this).attr("owner");
      $('#editConfirmButton').attr("pid", pid);
      $('#editConfirmButton').attr("name", name);
      $('#editConfirmButton').attr("date", date);
      $('#editConfirmButton').attr("owner", owner);
      $('#editConfirmButton').click(editItem);
      $('#productEditName').attr("placeholder", name);
      $('#productEditBestBefore').attr("placeholder", date);
      $('#productEditOwner').attr("placeholder", owner);
      $('#editItemModal').openModal();
  }

  function editItem() {
      var user = JSON.parse(localStorage.user);
      var owner = $('#editConfirmButton').attr("owner");
      //TODO fix this to get the real owner
      if (owner == user.id || owner == 1) {
          var details = {};
          details.pid = $('#editConfirmButton').attr("pid");
          details.bestbefore = $('#productEditBestBefore').val();
          if (details.bestbefore == "") {
              details.bestbefore = $('#productEditBestBefore').attr("placeholder");
          }
          details.owner = $('#productEditOwner').val();
          if (details.owner == "") {
              details.owner = $('#productEditOwner').attr("placeholder");
          }
          details.name = $('#productEditName').val();
          if (details.name == "") {
              details.name = $('#productEditName').attr("placeholder");
          }
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
      $('#changeUserModal').closeModal();
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
          userList = userList + "<a class='modal-action modal-close changeUserSelection' uid=" + id + " name = " + name + ">" +
              id + ": " +
              name + "</a><br>";
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
          var img = products[i].getElementsByTagName("img")[0].childNodes[0].nodeValue;
          var uid = products[i].getElementsByTagName("uid")[0].childNodes[0].nodeValue;
          var uname = products[i].getElementsByTagName("uname")[0].childNodes[0].nodeValue;
          var json = {
              "pid": pid,
              "name": name,
              "date": date,
              "img": img,
              "uid": uid,
              "uname": uname
          };
          data.push(json);
      }
      var table = "<table><thead><tr><th>Image</th><th>Owner</th><th>Product</th><th>Date</th></tr></thead><tbody>";
      for (var i = 0; i < data.length; i++) {
          if (data[i].uid == 1) {
              table = table + "<tr><td><img height='50px' src='" + data[i].img + "'></td><td>" + data[i].uname + "</td><td>" + data[i].name + "</td><td>" + data[i].date + "</td><td><a pid='" + data[i].pid + "' date='" + data[i].date + "' name='" + data[i].name + "' owner='" + data[i].uid + "'  class='claimButton btn green'>Claim</a></td><td><a class='btn red' onclick='removeThisItem(" + data[i].pid + "," + data[i].uid + ")'>Remove</a></td></tr>";
          } else {
              table = table + "<tr><td><img height='50px' src='" + data[i].img + "'></td><td>" + data[i].uname + "</td><td>" + data[i].name + "</td><td>" + data[i].date + "</td><td><a pid='" + data[i].pid + "' date='" + data[i].date + "' name='" + data[i].name + "' owner='" + data[i].uid + "'  class='editModalButton btn yellow darken-2'>Edit</a></td><td><a class='btn red' onclick='removeThisItem(" + data[i].pid + "," + data[i].uid + ")'>Remove</a></td></tr>";
          }
      }
      table = table + "</tbody></table>";
      $('#productDisplay').html(table);

  }

  function getDoorText(data) {
      if (data) {
          return "Door Open";
      } else {
          return "Door Closed";
      }
  }

  function updateData(data) {
      //console.log(data);
      $('#temperatureDisplayText').text(data.temp);
      $('#targetTemperatureDisplayText').text(data.target);
      $('#doorStatusDisplayText').text(getDoorText(data.doorOpen));
      $('#lastUpdatedText').text(data.time)
      getProducts();
  }