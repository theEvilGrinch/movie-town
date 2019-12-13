// Липкое меню
var navPos, winPos, navHeight;

function refreshVar() {
	navPos = $('nav.main-header__menu').offset().top;
	navHeight = $('nav.main-header__menu').outerHeight(true);
}

refreshVar();

window.onresize = refreshVar();
$('<div class="clone-nav"></div>').insertBefore('nav.main-header__menu').css('height', navHeight).hide();

$(window).scroll(function () {
	winPos = $(window).scrollTop();
	if (winPos >= navPos) {
		$('nav.main-header__menu').addClass('fixed shadow');
		$('.clone-nav').show();
	} else
	{
		$('nav.main-header__menu').removeClass('fixed shadow');
		$('.clone-nav').hide();
	}
});

var mnavPos, mwinPos, mnavHeight;
function refreshMobVar() {
	mnavPos = $('nav.main-header__menu-mobile').offset().top;
	mnavHeight = $('nav.main-header__menu-mobile').outerHeight(true);
}

refreshMobVar();
window.onresize = refreshMobVar();
$('<div class="clone-mobile-nav"></div>').insertBefore('nav.main-header__menu-mobile').css('height', mnavHeight);
$('.clone-mobile-nav').hide();
$(window).scroll(function () {
	mwinPos = $(window).scrollTop();
	if (mwinPos >= mnavPos) {
		$('nav.main-header__menu-mobile').addClass('mobile-fixed');
		$('.clone-mobile-nav').show();
	} else {
		$('nav.main-header__menu-mobile').removeClass('mobile-fixed');
		$('.clone-mobile-nav').hide();
	}
});
// Липкое меню END
//
// Присваивание класса активному пункту меню
$(function () {
	$('.main-header__menu ul li a').each(function () {
		var currentLocation = window.location.href;
		var topMenuLinkLocation = this.href;
		if (currentLocation === topMenuLinkLocation) {
			$(this).addClass('main-header__menu-active-item');
		}
	});
});
// Присваивание класса активному пункту меню END
//
function slider() {
//Верхний слайдер новинок
var sliderWrapper = $('.main-header__slider-wrapper');
var slideWidth = jQuery('.main-header__slider-items').outerWidth();
var scrollSlider = sliderWrapper.position().left - slideWidth;
$('.main-header__slider-arrow-right').click(function () {
	sliderWrapper.animate({left: scrollSlider}, 300, function () {
		sliderWrapper.find('.main-header__slider-items:first').appendTo(sliderWrapper).parent().css({'left': 0});
	});
});
$('.main-header__slider-arrow-left').click(function () {
	sliderWrapper.css({'left': scrollSlider}).find('.main-header__slider-items:last').prependTo(sliderWrapper).parent().animate({left: 0}, 300);
});

}
// Функция вызывается только если на странице есть слайдер, иначе крашится весь дальнейший JS
if ($('.main-header__slider').is('.main-header__slider')) {
	slider();
}
//Верхний слайдер новинок END
//
// Развораяивание списка сортировки фильмов
$("ul.sort").hide();

$('.main-content__sort-wrapper').click(function () {
	$("ul.sort").slideToggle(300);
});

$('.main-content__sort-wrapper').mouseleave(function () {
	$("ul.sort").slideUp(300);
});
//Развораяивание списка сортировки фильмов END
//
// Мобильное меню
var mobileMenu = document.querySelector('.main-header__menu-mobile-lables-wrapper');

$('.main-header__menu-mobile-wrapper').css('opacity', '0.85');

mobileMenu.addEventListener('click', function () {

	this.classList.toggle('checked');

	$('.main-header__menu-mobile-list-wrapper').slideToggle(300);


	if (mobileMenu.classList.contains('checked')) {
		$('.main-header__menu-mobile-close-lable').show(300);
		$('.main-content__aside-genre').clone().appendTo('.main-header__menu-mobile-aside-wrapper').show(300);
		$("div.main-header__menu-mobile-aside-wrapper").show(300);
		$('.main-header__menu-mobile-menu-lable').hide();
		$('<div class="body-overlay"></div>').insertAfter('footer').hide();
		$('.body-overlay').show(300);
		$('.main-header__menu-mobile-wrapper').css('opacity', '1');

		function hideMenuByOverlayAnsESCClick() {
			$('.main-header__menu-mobile-list-wrapper').slideUp(300);
			mobileMenu.classList.remove('checked');
			$('.main-header__menu-mobile-close-lable').hide();
			$('.main-header__menu-mobile-menu-lable').show(300);
			$('.main-header__menu-mobile-aside-wrapper').hide(300);
			$('.body-overlay').hide(300);
			$('.body-overlay').remove();
			$('.main-header__menu-mobile-aside-wrapper .main-content__aside-genre').remove();
			$('.main-header__menu-mobile-wrapper').css('opacity', '0.85');
			$('.main-header__menu-mobile-inner-wrapper').css({'position': 'relative', 'z-index': '4'});
		}

		$('.body-overlay').click(function () {
			hideMenuByOverlayAnsESCClick();
		});

		document.addEventListener('keydown', function (e) {
			if (e["keyCode"] === 27) {
				hideMenuByOverlayAnsESCClick();
			}
		});
	}
	else {
		$('.main-header__menu-mobile-wrapper').css('opacity', '0.85');
		$('.body-overlay').hide(300);
		$('.body-overlay').remove();
		$('.main-header__menu-mobile-aside-wrapper').hide(300);
		$('.main-header__menu-mobile-close-lable').hide();
		$('.main-header__menu-mobile-menu-lable').show(300);
		$('.main-header__menu-mobile-aside-wrapper').hide(300);
		$('.main-header__menu-mobile-aside-wrapper .main-content__aside-genre').remove();
	}
});
// Мобильное меню END
//
// Плавная прокрутка кнопки вверх
$('.go-to-top').click(function () {
	var scroll_el = $(this).attr('href');
	if ($(scroll_el).length !== 0) {
		$('html, body').animate({scrollTop: $(scroll_el).offset().top}, 700);
	}
	return false;
});
// Плавная прокрутка кнопки вверх END
//
//Сброс рамки после клика на кнопку/ссылку
$('a, button').on('mouseup', function() {
	$(this).blur();
});
//Сброс рамки после клика на кнопку/ссылку END
//
// Переключение плеера / трейлера в fullstory
$('.fullstory__view-online-player-check').click(function () {
	$('.fullstory__view-online-player-wrapper').show();
	$('.fullstory__view-online-trailer-wrapper').hide();
	$(this).addClass('player-checked');
	$('.fullstory__view-online-trailer-check').removeClass('trailer-checked')
});
$('.fullstory__view-online-trailer-check').click(function () {
	$(this).addClass('trailer-checked');
	$('.fullstory__view-online-player-check').removeClass('player-checked');
	$('.fullstory__view-online-player-wrapper').hide();
	$('.fullstory__view-online-trailer-wrapper').show();
});
// Переключение плеера / трейлера в fullstory END
//
// Скрытие рекламного блока sape 728x90 в fullstory при маленьком разрешении
function hide_fullstory_sape() {
	if ($('.fullstory').width() <= 728) {
		$('.fullstory__sape-wrapper').hide();
	}
	else {
		$('.fullstory__sape-wrapper').show();
	}
}

hide_fullstory_sape();

$(window).resize(function () {
	hide_fullstory_sape();
});
// Скрытие рекламного блока sape 728x90 в fullstory при маленьком разрешении END