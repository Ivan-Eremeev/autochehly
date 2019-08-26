function cardsSlider(slider) {
  slider.slick({
    slidesToShow: 4, // Сколько слайдов показывать на экране
    slidesToScroll: 2, // Сколько слайдов пролистывать за раз
    dots: false, // Пагинация
    arrows: false, // Стрелки
    infinite: true, // Зацикленное пролистывание
    swipe: false, // Перелистывание пальцем
    draggable: false, // Перелистывание мышью
    responsive: [ // Адаптация
      {
      breakpoint: breakSm,
        settings: {
          slidesToShow: 2, // Сколько слайдов показывать на экране
          swipe: true, // Перелистывание пальцем
          draggable: true, // Перелистывание мышью
        }
      }
    ]
  });

  // Кастомные кнопки "вперед" "назад"
  $('#cards-slider-prev').click(function() {
    slider.slick('slickPrev');
  });
  $('#cards-slider-next').click(function() {
    slider.slick('slickNext');
  });
};


function itemSlider(slider, sliderFor) {
  slider.slick({
    slidesToShow: 4, // Сколько слайдов показывать на экране
    slidesToScroll: 1, // Сколько слайдов пролистывать за раз
    asNavFor: sliderFor, // Связь со слайдерами
    dots: false, // Пагинация
    arrows: true, // Стрелки
    prevArrow: '<div class="item-images_controll item-images_prev"><span class="icon-keyboard_arrow_up"></span></div>',
    nextArrow: '<div class="item-images_controll item-images_next"><span class="icon-keyboard_arrow_down"></span></div>',
    focusOnSelect: true, // Выбрать слайд кликом
    infinite: true, // Зацикленное пролистывание
    vertical: true, // Вертикальный слайдер
  });

  sliderFor.slick({
    slidesToShow: 1, // Сколько слайдов показывать на экране
    slidesToScroll: 1, // Сколько слайдов пролистывать за раз
    dots: false, // Пагинация
    arrows: false, // Стрелки
    fade: true, // Плавный переход (анимация исчезновения появления) В false будет листаться
    asNavFor: slider, // Связь со слайдерами
    responsive: [ // Адаптация
      {
      breakpoint: breakMd,
        settings: {
          dots:true,
          fade: false
        }
      }
    ]
  });

};