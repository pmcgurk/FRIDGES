  $(document).ready(function () {
      $('.button-collapse').sideNav({
          closeOnClick: true
      });
      $(document).ready(function () {
          $('.scrollspy').scrollSpy();
      });


      $(document).ready(function () {
          $('.table-of-contents').pushpin({
              top: $('.table-of-contents').offset().top
          });
      });

  });