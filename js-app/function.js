/*!
 *
 * Ivan Eremeev - 2019
 * Skype: ivan.eremeev_1
 * Telegram: IvanMessage
 * Email: ivan.frontcoder@gmail.com
 *
 */

// Подключение файлов. При использовании gulp поменять "// @prepros-append" на "//="
// @prepros-append libs-settings/slick_settings.js

// Брэйкпоинты js
var	breakXl = 1400,
		breakLg = 1260,
		breakMd = 1050,
		breakSm = 769,
		breakXs = 500;

$(document).ready(function () {

	// Отмена перехода по ссылкам
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Мобильное меню
	myMenu($('#menu'));

	// Скролл в блоке выбора городов
	cityScroll($('#buySelect'));

	// Inputmask.js // Маска для поля ввода телефона
	$('[name=tel]').inputmask("+7(999)999 99 99",{ showMaskOnHover: false });

	// matchHeight // Задание елементам одинаковой высоты
	$('.js-match-height').matchHeight();

	// Выпадайки Dropdown
	dropdown();

	// Открытие/закрытие фильтра с фирмами и цветами на мобилке
	filtersBtn();

	// Добавление родителю инпута класса .active при фокусе инпута
	inputFocus();

	// Autosize Изменение высоты текстового поля при добавлении контента
	autosize($('textarea'));
	
	// Модальное окно
	// Задать кнопке, по которой открывается окно класс ".modal-trigger" и атрибут "data-modal", с id окна.
	// Пример <button>(class="modal-trigger" data-modal="#modal-1")</button>
	modal();

	// Открыть модальное окно
	// modalShow($('#modal-1'));

	// Закрыть модальное окно
	// modalHide($('#modal-1'));

	// Инициализация стилизуемого скроллбара
	$('.js-scrollbar').scrollbar();

	// Fancybox. Открыть картинки на странице товара
	$().fancybox({
	  selector : '#item-images_slider2 .slick-slide:not(.slick-cloned)',
	  backFocus : false,
	  afterShow : function( instance, current ) {
	    $('#item-images_slider2').slick('slickGoTo', parseInt(current.index), true);
	    console.log(current.opts.$orig);
	  },
    buttons: [
      "zoom",
      "close"
    ]
	});
	$(document).on('click', '.slick-cloned', function(e) {
	  var $slides = $(this)
	    .parent()
	    .children('.slick-slide:not(.slick-cloned)');

	  $slides
	    .eq( ( $(this).attr("data-slick-index") || 0) % $slides.length )
	    .trigger("click.fb-start", { $trigger: $(this) });

	  return false;
	});

	// Инициализация слайдера с карточками товаров
	cardsSlider($('#cards-slider'));
	
	// Инициализация слайдера на странице товара
	itemSlider($('#item-images_slider1'), $('#item-images_slider2'));

	// Добавить убрать количество товара
	inputCount();

	// Переместить блок в другое место, взависимости от ширины экрана
	movement($('.item-images'), $('#moveItem'), breakMd);
	movement($('.order_price-one'), $('.item-count'), breakSm);
	movement($('.order-map_map'), $('.order-map_mobileto'), breakSm);

	// Блок с табами на странице товара
	itemTabs();

	// Простая выпадайка
	easyDropdown($('#item-map-open'), $('.item-map_dropdown'));
	easyDropdown($('.location-wrapper'), $('.location-dropdown'));

	// Вставляет svg в html, позволяет управлять цветом через css 
	$('img[src$=".svg"]').each(function(){
	  var $img = $(this);
	  var imgClass = $img.attr('class');
	  var imgURL = $img.attr('src');
	  $.get(imgURL, function(data) {
	    var $svg = $(data).find('svg');
	    if(typeof imgClass !== 'undefined') {
	      $svg = $svg.attr('class', imgClass+' replaced-svg');
	    }
	    $svg = $svg.removeAttr('xmlns:a');
	    if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	      $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	    }
	    $img.replaceWith($svg);
	  }, 'xml');
	});

	// Задаем фоновое изображение .data-img из атибута data
	function imgData() {
		var block = $('.data-img');
		block.each(function(index, el) {
			var blockData = $(this).data('img');
			$(this).css({
				'background-image': 'url('+ blockData +')'
			});
		});
	};
	imgData();
	
});

// Мобильное меню
function myMenu(menu) {
	var menuBtn = menu.find('#menu-btn'),
			close = menu.find('#menu-close'),
			documentWidth = parseInt(document.documentElement.clientWidth),
			windowsWidth = parseInt(window.innerWidth),
			html = $('html');
	menuBtn.click(function () {
		var scrollbarWidth = windowsWidth - documentWidth;
		html.toggleClass('lock').css('padding-right',scrollbarWidth);
		menu.toggleClass('open');
		menuBtn.toggleClass('is-active');
		close.click(function() {
			html.removeClass('lock').css('padding-right',0);
			menu.removeClass('open');
			menuBtn.removeClass('is-active');
		});
	});	
};

// Скролл в блоке выбора городов
function cityScroll(menuItem) {
	menuItem.find('a[href^="#"]').click( function(e){
		e.preventDefault();
		var scroll_el = $(this).attr('href'),
				time = 500,
				blockScroll = $('.buy_scroll');
		blockScroll.animate({ scrollLeft: $(scroll_el).position().left }, time);
		menuItem.find('a[href^="#"]').removeClass('active');
		$(this).addClass('active');
	});
};

// // Модальное окно
function modal(modal) {
	$('.modal-trigger').on('click', function() {
		var $this = $(this),
				data = $this.data('modal'),
				thisModal = $(data);
		modalShow(thisModal);
	});
};
// Открытие модального окна
function modalShow(thisModal) {
	var html = $('html'),
			modalClose = thisModal.find($('.modal_close')),
			documentWidth = parseInt(document.documentElement.clientWidth),
			windowsWidth = parseInt(window.innerWidth),
			scrollbarWidth = windowsWidth - documentWidth;
	thisModal.show(0, function() {
		setTimeout(thisModal.addClass('open'),500);
	});
	html.addClass('lock').css('padding-right',scrollbarWidth);
	modalClose.on('click', function() {
		modalHide(thisModal);
	});
	thisModal.on('click', function(e) {
		if (thisModal.has(e.target).length === 0) {
			modalHide(thisModal);
		}
	});
};
// Закрытие модального окна
function modalHide(thisModal) {
	var html = $('html');
	thisModal.removeClass('open');
	thisModal.hide();
	html.removeClass('lock').css('padding-right',0);
};

// Выпадайки в фильтре
function dropdown() {
	var trigger = $('.js-drop-trigger'),
			dropdown = $('.js-dropdown'),
			select = $('.js-dropdown-wrapper'),
			link = $('.js-drop_link'),
			triggerText = [];
	// Перебираем селекты, создаем массив с текстами селектов и задаем каждому селекту data-index для вывода этого текста из массива в селект
	trigger.each(function(index, el) {
		triggerText.push($(this).find('span').text());
		$(this).data('index', index);
	});
	// Клик по селекту
	trigger.click(function() {
		// Если селект не содержит класс .active, задаем его и открываем выпадайку классом .open
		if (!$(this).hasClass('active')) {
			trigger.removeClass('active');
			dropdown.removeClass('open');
			$(this).next(dropdown).addClass('open');
			$(this).addClass('active');
		// Иначе убираем активный класс и закрываем выпадайку
		}else {
			trigger.removeClass('active');
			dropdown.removeClass('open');
		}
	});
	// Клик вне селекта. Закрываем выпадайку
	$(document).mouseup(function (e) {
		if (!select.is(e.target) && select.has(e.target).length === 0) {
			trigger.removeClass('active');
			dropdown.removeClass('open');
		}
	});
	// Клик по ссылке в выпадайке
	link.click(function() {
		var linkText = $(this).text(),
				linkImgSrc = $(this).find('img').attr('src');
		// Если клик по .dropdown_link--reset то зададим изначальный текст селекту
		if ($(this).hasClass('dropdown_link--reset')) {
			var index = $(this).closest(select).find(trigger).data('index'),
					inputs = $(this).closest(select).find('input');
			$(this).closest(select).find(link).removeClass('active');
			inputs.prop('checked', false);
			$(this).closest(select).find(trigger).removeClass('select').find('span').text(triggerText[index]);
			trigger.removeClass('active');
			dropdown.removeClass('open');
		}// Если по .item-dropdown_label--colors, то достаем из него урл картинки и ставим в trigger
		else if ($(this).hasClass('item-dropdown_label--colors')) {
			$(this).closest(select).find(link).removeClass('active');
			$(this).addClass('active');
			$(this).closest(select).find(trigger).find('img').attr('src', linkImgSrc);
			console.log('true');
			trigger.removeClass('active');
			dropdown.removeClass('open');
		}// Если по любой другой ссылке, то зададим текст из этой ссылки
		else{
			$(this).closest(select).find(link).removeClass('active');
			$(this).addClass('active');
			$(this).closest(select).find(trigger).addClass('select').find('span').text(linkText);
			trigger.removeClass('active');
			dropdown.removeClass('open');
		}
	});
};

// Открытие/закрытие фильтра с фирмами и цветами на мобилке
function filtersBtn() {
	var btn = $('.filters-btn'),
			filters = $('#filters'),
			close = $('#close-filters')
	btn.mouseup(function() {
		if (!btn.hasClass('active')) {
			btn.addClass('active');
			filters.addClass('open');
		}else {
			btn.removeClass('active');
			filters.removeClass('open');
		}
	});
	close.click(function() {
		btn.removeClass('active');
		filters.removeClass('open');
	});
};

// Добавить убрать количество товара
function inputCount() {
	var count = $('.count'),
			minus = count.find('.count-minus'),
			result = count.find('.count-result'),
			input = result.find('input'),
			plus = count.find('.count-plus'),
			val = 0;
	minus.click(function() {
		if (val > 1) {
			val --;
			input.val(val);
		}
	});
	plus.click(function() {
		if (val < 999) {
			val ++;
			input.val(val);
		}
	});
};

// Переместить блок в другое место, взависимости от ширины экрана
function movement(block, moveTo, mediaBreak) {
	var prevBlock = $('<div id="moveBack-'+block.attr('class')+'"></div>');
			block.before(prevBlock);
	function move() {
		if ($(window).width() < mediaBreak) {
			moveTo.after(block);
		}else {
			prevBlock.after(block);
		}
	};
	move();
	$(window).resize(function() {
		move();
	});
};

// Блок с табами на странице товара
function itemTabs() {
	var block = $('#item-tabs'),
			triggersWrap = $('.item-tabs_triggers'),
			triggers = block.find('.item-tabs_trigger'),
			dropdowns = block.find('.item-tabs_dropdown');
	triggers.each(function(index, el) {
		$(this).attr('data-index', index);
	});
	var firstTrigger = $('.item-tabs_trigger[data-index=0]');
	function blockHeight() {
		if (($(window).width() >= breakLg)) {
			var triggersHeight = triggersWrap.outerHeight(),
					dropHeight = $('.item-tabs_dropdown.open').outerHeight();
			block.height(triggersHeight + dropHeight);
		}
	};
	blockHeight();
	triggers.click(function() {
		if (!$(this).hasClass('active')) {
			triggers.removeClass('active');
			dropdowns.removeClass('open');
			$(this).addClass('active');
			$(this).next(dropdowns).addClass('open');
		}else {
			if ($(window).width() < breakLg) {
				triggers.removeClass('active');
				dropdowns.removeClass('open');
			}
		}
		blockHeight();
	});
	$(window).resize(function() {
		if (($(window).width() >= breakLg)) {
			triggers.removeClass('active');
			dropdowns.removeClass('open');
			firstTrigger.addClass('active')
			.next(dropdowns).addClass('open');
			blockHeight();
		}else {
			block.removeAttr('style');
		}
	});
};

// Простая выпадайка
function easyDropdown(link, drop) {
	var	close = drop.find('.js-close');
	link.click(function() {
		if (!link.hasClass('active')) {
			$(this).addClass('active');
			drop.addClass('open');
		}else {
			link.removeClass('active');
			drop.removeClass('open');
		}
	});
	close.click(function() {
		link.removeClass('active');
		drop.removeClass('open');
	});
};

// Добавление родителю инпута класса .active при фокусе инпута
function inputFocus() {
	var input = $('.js-input-focus');
	input.focus(function() {
		$(this).parent().addClass('active');
	});
	input.focusout(function() {
		if ($(this).val() == '') {
			$(this).parent().removeClass('active');
		}
	});
};

function calcPrice() {
	var calc = $('#calc'),
			minus = $('#calc-minus'),
			plus = $('#calc-plus'),
			result = $('#calc-result'),
			reset = $('#reset'),
			onePrice = $('#one-price'),
			allPrice = $('.js-all-price'),
			deliveryPrice = $('#delivery-price'),
			resultPrice = $('#result-price'),
			allPriceInput = $('#all-price-input'),
			deliveryPriceInput = $('#delivery-price-input'),
			resultPriceInput = $('#result-price-input'),
			deliveryButtons = $('#delivery-buttons input'),
			val = 1;
	deliveryPrice.text($('#delivery-buttons input:checked').data('price'));
	allPrice.text(onePrice.text() * val);
	allPriceInput.val(onePrice.text() * val);
	resultPrice.text(onePrice.text() * val + parseInt(deliveryPrice.text()));
	deliveryPriceInput.val(deliveryPrice.text());
	resultPriceInput.val(resultPrice.text());
	minus.click(function() {
		if (val > 1) {
			val --;
			result.val(val);
			allPrice.text(onePrice.text() * val);
			resultPrice.text(onePrice.text() * val + parseInt(deliveryPrice.text()));
			allPriceInput.val(onePrice.text() * val);
			deliveryPriceInput.val(deliveryPrice.text());
			resultPriceInput.val(resultPrice.text());
		}
	});
	plus.click(function() {
		if (val < 999) {
			val ++;
			result.val(val);
			allPrice.text(onePrice.text() * val);
			resultPrice.text(onePrice.text() * val + parseInt(deliveryPrice.text()));
			allPriceInput.val(onePrice.text() * val);
			deliveryPriceInput.val(deliveryPrice.text());
			resultPriceInput.val(resultPrice.text());
		}
	});
	reset.click(function() {
		val = 1;
		result.val(val);
		allPrice.text(onePrice.text() * val);
		resultPrice.text(onePrice.text() * val + parseInt(deliveryPrice.text()));
		allPriceInput.val(onePrice.text() * val);
		deliveryPriceInput.val(deliveryPrice.text());
		resultPriceInput.val(resultPrice.text());
	});
	deliveryButtons.change(function() {
		allPrice.text(onePrice.text() * val);
		resultPrice.text(onePrice.text() * val + parseInt(deliveryPrice.text()));
		allPriceInput.val(onePrice.text() * val);
		deliveryPriceInput.val(deliveryPrice.text());
		resultPriceInput.val(resultPrice.text());
		deliveryPrice.text($('#delivery-buttons input:checked').data('price'));
	});
};
calcPrice();