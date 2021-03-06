(function ($) {
    $(document).ready(function () {
      $('section#slideshow').attr('data-offset', 40);
      $('section#services').attr('data-offset', 60);
      $('section#portfolio').attr('data-offset', 80);
      $('section#prices').attr('data-offset', 100);
      $('section#contacts').attr('data-offset', 120);
        /* Панель навигации */
        // Описываем функцию, которая
        function lpHeader() {
            if ($(window).scrollTop() == 0) { // Если находимся в начале страницы
                $('header').addClass('top'); // Добавляет класс top для панели
            } else { // Иначе
                $('header.top').removeClass('top'); // Удаляет его
            }
        }
        // Вызываем эту функцию
        lpHeader(); // Единожды при загрузке страницы
        $(window).on('scroll', lpHeader); // И каждый раз при скролле

        /* Плавный скролл при клике на ссылку в меню */
        // Помещаем в переменную ссылку на меню
        var lpNav = $('header ul');
        // При клике на ссылку в меню
        lpNav.find('li a').on('click', function (e) {
            // Определяем элемент на странице, на который ссылается ссылка по ID
            var linkTrgt = $($(this).attr('href'));
            if (linkTrgt.attr('data-offset')) {
              var dataOffset = linkTrgt.attr('data-offset');
            } else dataOffset = 44;
            if (linkTrgt.length > 0) { // Если такой элемент присутствует
                e.preventDefault(); // Отменяем переход по умолчанию
                var offset = linkTrgt.offset().top; // Определяем отступ целевого элемента от начала документа
                $('body, html').animate({
                    scrollTop: offset - dataOffset
                }, 750); // Плавно скролим документ к этому месту
            }
        });

        /* Отслеживание активного экрана */
        // Описываем функцию, которая вычисляет активный экран
        function lpSetNavActive() {
            // В этой переменной в конце each будет ID активного экрана
            var curItem = '';
            // Чтобы он туда попал, перебираем все экраны
            $('section').each(function () {
                // И если положение экрана от начала страницы меньше текущего скролла
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id'); // В переменную вносим ID этого экрана
                }
            });
            // Далее, если href ссылки внутри активного пункта меню не совпадает с ID найденного нами активного экрана
            // Либо активные элементы отсутствуют в меню
            if (lpNav.find('li.active a').attr('href') != '#' + curItem || lpNav.find('li.active').length == 0) {
                // Удаляем класс у текущего активного элемента
                lpNav.find('li.active').removeClass('active');
                // И добавляем класс active пункту, внутри которого лежит ссылка, у которой href совпал с ID активного экрана
                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');
            }
        }
        // Вызываем эту функцию
        lpSetNavActive(); // Единожды при загрузке страницы
        $(window).on('load scroll', lpSetNavActive); // И каждый раз при скролле

    });
})(jQuery);
