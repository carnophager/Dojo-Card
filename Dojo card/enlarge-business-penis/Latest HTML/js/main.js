var nicesx;
var c=4000;
var passed=0;
var stay=0;
var finished=0;
var is_animating = 1;
var is_loading = 0;
var hand=1;
var animateh;
var animaterh;
var handreversing=0;
var handanim=0;
var handposition;
var blinking;
var chbg=1;

(function($) {
	var imgList = [];
	$.extend({
		preload: function(imgArr, option) {
			var setting = $.extend({
				init: function(loaded, total) {},
				loaded: function(img, loaded, total) {},
				loaded_all: function(loaded, total) {}
			}, option);
			var total = imgArr.length;
			var loaded = 0;
			
			setting.init(0, total);
			for(var i in imgArr) {
				imgList.push($("<img />")
					.attr("src", imgArr[i])
					.load(function() {
						loaded++;
						setting.loaded(this, loaded, total);
						if(loaded == total) {
							setting.loaded_all(loaded, total);
						}
					})
				);
			}
			
		}
	});
})(jQuery);

function closeAnimation() {
		$('.tetris').fadeOut('slow', function() {
			
			$('.txt4').css('-webkit-transform', 'translate3d(0,1200px,0)').css('-o-transform', 'translate3d(0,1200px,0)').css('-ms-transform', 'translate3d(0,1200px,0)').css('-moz-transform', 'translate3d(0,1200px,0)').css('transform', 'translate3d(0,1200px,0)');
			$('.texts').fadeOut('slow',function() {
				$(this).remove();
			});
			$('.tetris').html('');
			$('.blackbg').remove();
			$('.main').fadeIn('slow');
			handposition=$('.hand').offset().left;
			var toggleClassFcn = function(){$(".scrollon").toggleClass("hidden");}
			blinking=setInterval(toggleClassFcn, 700);
		});
		return false;
}

function animateTetris(id) {
	if(id==19) {
		is_animating = 0;
		if(!is_loading) {
			closeAnimation();
		}
		return false;
	}
	else {
		$('#piece'+id).fadeIn('fast',function() {
			$('.show').removeClass('show');
			if(id<8) {
				$('.txt'+id).addClass('show');
			}
			else if(id<15) {
				$('.txt'+(id-7)).addClass('show')
			}
			else {
				$('.txt'+(id-14)).addClass('show');
			}
			animateTetris(id+1);
		});
	}
}


$(document).ready(function() {
    
	$("#yes").mouseenter(function() {
		$(this).attr('src','img/yesmo.jpg');
	}).mouseleave(function() {
		$(this).attr('src','img/yes.jpg');
	});
	$("#no").mouseenter(function() {
		$(this).attr('src','img/nomo.jpg');
	}).mouseleave(function() {
		$(this).attr('src','img/no.jpg');
	});
		$("body").ezBgResize({
		    img : "img/bgr.jpg", // Required.
		    opacity : 1, // Optional. Default is 100% (1).
		    center : true // Optional. Default is true.
		});
	
	
		nicesx = $("#boxscroll").niceScroll(".slider",{touchbehavior:true,cursorcolor:"#FF00FF",cursoropacitymax:0.6,cursorwidth:24,usetransition:true,hwacceleration:true,autohidemode:"hidden"});
		
		$("#yes, #no").bind('click',function() {
			$('.start').fadeOut();
			$('.tetris').show();
			$('.texts').show();
			animateTetris(1);
			$.preload([
				"img/penis_hd.png",
				"img/penis_hd_end.png",
				"img/penis_hd_new.png",
				"img/background.png",
				"img/scrollonstart.png",
				"img/slogans/1.png",
				"img/slogans/2.png",
				"img/slogans/3.png",
				"img/slogans/4.png",
				"img/slogans/5.png",
				"img/slogans/6.png",
				"img/slogans/7.png",
				"img/slogans/8.png",
				"img/slogans/9.png",
				"img/slogans/10.png",
				"img/slogans/11.png",
				"img/slogans/12.png",
				"img/slogans/13.png",
				"img/slogans/14.png",
				"img/slogans/15.png",
				"img/slogans/16.png",
				"img/slogans/17.png",
				"img/slogans/18.png",
				"img/hands/hand1.png",
				"img/hands/hand2.png",
				"img/hands/hand3.png",
				"img/hands/hand4.png",
				"img/hands/hand5.png",
				"img/hands/hand6.png",
				"img/hands/hand7.png",
				"img/hands/hand8.png",
				"img/hands/hand9.png",
				'img/portfolio.png',
				'img/contact.png'
			], {
				loaded_all: function(loaded, total) {
					is_loading = 0;
					if(!is_animating) {
						closeAnimation();
					}
				}
			});
		});

	var full=19*8000;
	var scroll;
	$('#rail_scroll').draggable({axis:"x",containment: "parent",drag:function (e,u) {
		pos = u.position.left+100;
		scroll=$('#rail').width();
		theend=handposition+$('.hand').width();
		x=Math.round((pos/scroll)*full);
		if((x*0.9)<=theend) {
			nicesx.doScrollLeft(x*1.18);
			slogansAnimate(x);
		}
		else {
		}
	}});
});

function slogCI(img) {
	$('#slog').attr('src','img/slogans/'+img+'.png');
	$('#slog').show();
    setTimeout( function(){
    	$('#slog').css('-webkit-transform','translate3d(0,0,0)').css('-moz-transform','translate3d(0,0,0)').css('-ms-transform','translate3d(0,0,0)').css('-o-transform','translate3d(0,0,0)').css('transform','translate3d(0,0,0)');
    },400);
	
}
function slogHide() {
	$('#slog').css('-webkit-transform','translate3d(0,1200px,0)').css('-moz-transform','translate3d(0,1200px,0)').css('-ms-transform','translate3d(0,1200px,0)').css('-o-transform','translate3d(0,1200px,0)').css('transform','translate3d(0,1200px,0)');
	setTimeout( function(){
    	$('#slog').hide();
    },400);
}
function slogansAnimate(x) {
	b=c-x;
	var full=18*8000;
	if(x>500) {
		$('.scrollonstart').fadeOut();
	}
	scroll=$('#rail').width();
	push = Math.round((x/full)*scroll)-100;
	if(push<0) push=0;
	$('#rail_scroll').css('left',push);
	if(x>4500 && chbg) {
		chbg=0;
		$('.slider .penis_hd').addClass('new');
	}
	//console.log("b:"+b+" | passed:"+passed+ " | stay:"+stay);
	for(i=1;i<=18;i++) {
		if(passed==(i-1) && stay==0 && b<=0) {
			c+=4000;
			slogCI(i);
			passed=i;
			stay=1;
		}
		if(passed==(i+1) && b>=8000) {
			slogHide();
			setTimeout( function(){
				slogCI(passed);
   			},1000);
   			passed-=1;
   			c-=8000;
			stay=1;
		}
	}
	b=c-x;
	if(stay==1 && b<=0) {
		slogHide();
		c+=4000;
		stay=0;
		scrollon = Math.round(passed/2.2);
		if(scrollon<1) scrollon=1;
		$('.scrollon').attr('src','img/scrollon/'+scrollon+'.png');
	}
}
function finish() {
	finished = 1;
	clearInterval(blinking);
	$('.penis_hd').remove();
	$('.end').remove();
	$("#rail_scroll").draggable("destroy");
	nicesx.remove();
	$('.slider').removeAttr('style');
	$('#portfolio').add('#contact').show();
}
