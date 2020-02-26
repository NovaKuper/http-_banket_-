$(function() {

	$('.mfp-image-zoom').magnificPopup({
		type: 'image',
		// other options
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
	});

	$(document).ready(function() {
		$('.popup-youtube').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
	
			fixedContentPos: false
		});
	});

	$(document).ready(function() {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>Ресторан Илья Муромец</small>';
				}
			}
		});
	});

	$(document).ready(function() {
		$('.popup-gallery-stars').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>Ресторан Илья Муромец</small>';
				}
			}
		});
	});

	$(document).ready(function() {
		$('.popup-with-form').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#name',
	
			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
				}
			}
		});
	});

	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../../mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	var widthScreen = document.body.clientWidth;
	
	ymaps.ready(init);

	function init () {

		if (widthScreen > 576) {
			var myMap = new ymaps.Map("map", {
				// Центр карты, указываем коордианты
				center:[53.516025, 49.282621],
				// Масштаб, тут все просто
				zoom: 17,
				// Отключаем все элементы управления
				controls: []
			});
			}
		else {
			var myMap = new ymaps.Map("map", {
				// Центр карты, указываем коордианты
				center:[53.514912, 49.285099],
				// Масштаб, тут все просто
				zoom: 17,
				// Отключаем все элементы управления
				controls: []
			});

		};		
		
		var myGeoObjects = [];
		
		// Наша метка, указываем коордианты
		myGeoObjects = new ymaps.Placemark([53.516479, 49.284279],{
						balloonContentBody: 'Ресторан Илья Муромец',
						},{
						iconLayout: 'default#image',
						// Путь до нашей картинки
						iconImageHref: '../img/map-point.png', 
						// Размер по ширине и высоте
						iconImageSize: [228, 129],
						// Смещение левого верхнего угла иконки относительно
						// её «ножки» (точки привязки).
						iconImageOffset: [-40, -110]
		});
					
		var clusterer = new ymaps.Clusterer({
			clusterDisableClickZoom: false,
			clusterOpenBalloonOnClick: false,
		});
		
		clusterer.add(myGeoObjects);
		myMap.geoObjects.add(clusterer);
		// Отлючаем возможность изменения масштаба
		myMap.behaviors.disable('scrollZoom');

	}

});
