  $(document).ready(function () {
      update();
      $('.button-collapse').sideNav({
          menuWidth: 175,
          closeOnClick: true
      });
      interval = setInterval(update, 500);
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