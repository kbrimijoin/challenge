$(function() {
    
	//animate nav height to reveal background snippet on scroll
	$(window).scroll(function() {		
		if($(window).scrollTop() > 0) {
			$('nav').animate({height: 80}, 200);
		}
	});

	$('.new-message').click(function() {

	});

});