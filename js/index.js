import $ from "jquery"
import '../css/index.less'
import "bootstrap-sass/assets/stylesheets/_bootstrap.scss"
import "bootstrap-sass/assets/javascripts/bootstrap.js"
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'
import '../css/font-awesome.css'
import '../css/flexslider.less'
import '../css/JiSlider.less'
import './jquery.flexisel.js'
import '../js/move-top.js';
import '../js/easing.js'
import '../js/JiSlider.js'


$(document).ready(function() {
  console.log("...1t.")
    $("#flexiselDemo1").flexisel({
        visibleItems: 4,
        animationSpeed: 1000,
        autoPlay: true,
        autoPlaySpeed: 3000,        
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: { 
          portrait: { 
            changePoint:480,
            visibleItems: 1
          }, 
          landscape: { 
            changePoint:667,
            visibleItems:2
          },
          tablet: { 
            changePoint:800,
            visibleItems: 3
          }
        }
      });
    $('#JiSlider').JiSlider({color: '#fff', start: 3, reverse: true}).addClass('ff')
  $("#owl-demo2").owlCarousel({
    items : 1,
    lazyLoad : false,
    autoPlay : true,
    navigation : false,
    navigationText :  false,
    pagination : true,
  });
  // var tt = "hahahah";
  // var bb = "eeee";
  // var a = `
  //   <p>${tt}</p>
  //   <p>${val}</p>
  // `;
  $(".scroll").click(function(event){		
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
		});
    $("#bars li .bar").each(function(key, bar){
    var percentage = $(this).data('percentage');

    $(this).animate({
      'height':percentage+'%'
    }, 1000);
  })
});
