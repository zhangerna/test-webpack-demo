import $ from "jquery"
import "bootstrap-sass/assets/stylesheets/_bootstrap.scss"
import "bootstrap-sass/assets/javascripts/bootstrap.min.js"
import '../css/font-awesome.css'
import '../css/index.less'
import '../css/JiSlider.less'
import '../js/move-top.js';
import '../js/easing.js'
import '../js/JiSlider.js'
import '../js/jquery.countup.js'
import '../js/jquery.waypoints.min.js'


$(document).ready(function() {
  $().UItoTop({ easingType: 'easeOutQuart' });
  $('.counter').countUp();
  console.log("...1t.")
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
