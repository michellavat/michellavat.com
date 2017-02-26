$( document ).ready(function() {
	setBackgroundHDimensions();
	activateScrollToAnimation();
	initializeAjaxForm();

	$("a.mainNavEl").on('click', function(event) {
		if($(window).width() < 814){
			toggleMenu($('#toggleNavigation'));
		}
	});

	$('#toggleNavigation').click(function(){
		toggleMenu(this);
	});


	$(window).resize(function() {
		setBackgroundHDimensions();
	});


});

/* Resize BackgroundImage in Intro */

function setBackgroundHDimensions() {
	$("#backgroundIntroFullScreen").css("height", window.innerHeight);
	$("#backgroundIntroFullScreen").css("width", $(window).width());
}

/* Activate Scroll Animation */

function activateScrollToAnimation(){
	$("a").on('click', function(event) {

	    // Make shure the links on privacy policy page stay normal
		if($(this).hasClass("privacyPolicy")){
		}
		
	    // Make sure this.hash has a value before overriding default behavior
	    else if (this.hash !== "") {
	      // Prevent default anchor click behavior
	      event.preventDefault();

	      // Store hash
	      var hash = this.hash;

	      // Using jQuery's animate() method to add smooth page scroll
	      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	      $('html, body').animate({
	        scrollTop: $(hash).offset().top
	      }, 900, function(){
	   
	        // Add hash (#) to URL when done scrolling (default click behavior)
	        window.location.hash = hash;
	      });
	    } // End if
	 });
}

/* Toggle Navigaiton  */

function toggleMenu(toggleNavigation){
    $( "#menu" ).fadeToggle( "fast", function() {

  	});

	if($(toggleNavigation).hasClass("is-active")){
		$(toggleNavigation).removeClass("is-active");
	} else if(!$(toggleNavigation).hasClass("fa-times")){
		$(toggleNavigation).addClass("is-active");
	}
	
}


function initializeAjaxForm(){

$("#contactForm").submit(function(event) {

      /* stop form from submitting normally */
      event.preventDefault();

      /* get the action attribute from the <form action=""> element */
      var $form = $( this ),
          url = $form.attr( 'action' );

      /* Send the data using post */
      var posting = $.post( url, { Name: $('#contactName').val(), Email: $('#contactEmail').val() , Message: $('#contactMessage').val() } );

      /* Alerts the results */
      posting.done(function( data ) {
      	$("#successMessage").addClass("fadeIn");
      	$("#contactSubmit").css("display","none");
      });
    });
}


/*
*
* Scroll Actions (not for Privacy Policy Page)
*
*/


$(window).scroll(function (event) {
	if (!$("body").hasClass("privacyPolicy")){

		  var scroll = $(window).scrollTop();
		  var heightIntro = $('#intro').offset().top;
		  var heightSkills = $('#skills').offset().top;
		  var heightWorks = $('#works').offset().top;
		  var heightContact = $('#contact').offset().top;

		  if (scroll <  heightSkills) {
		    $(".mainNavEl").removeClass("active");
		  }  
		  if (scroll >=  heightSkills) {
		    $(".mainNavEl").removeClass("active");
		    $("#skillsAnchor").addClass("active");
		  }  
		  if (scroll >=  heightWorks-3) {
		    $(".mainNavEl").removeClass("active");
		    $("#worksAnchor").addClass("active");
		  }  
		  if (scroll >=  heightContact-3) {
		    $(".mainNavEl").removeClass("active");
		    $("#contactAnchor").addClass("active");
		  }  

		/* Fade In or Out - Header  */
		if (scroll >  120) {
			$("header").addClass("fadeIn"); 
			$("header").removeClass("fadeOut"); 

		}
		else if(scroll <= 300 && $("header").hasClass("fadeIn")) {
			$("header").removeClass("fadeIn"); 
			$("header").addClass("fadeOut"); 
		}
	}

	/* Fade In or Out - Header  */
	if (scroll >  heightIntro-100) {
		$("header").css("fadeIn"); 

	}
	else if(scroll <= heightIntro-100 && $("header").hasClass("fadeIn")) {
		$("header").removeClass("fadeIn"); 
		$("header").addClass("fadeOut"); 
	}
});
