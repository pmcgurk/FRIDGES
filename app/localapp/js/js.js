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
      interval = setInterval(update, 1000);
  });

  function update() {
      getData();
  }

  function getData() {
      $.getJSON("../data.json", updateData);
  }

  function updateData(data) {
      console.log(data);
      $('#temperatureDisplayText').text(data.temp);
      $('#targetTemperatureDisplayText').text(data.target);
      $('#doorStatusDisplayText').text(data.doorOpen);
      var dt = new Date();
      $('#lastUpdatedText').text(dt.toLocaleString())
  }