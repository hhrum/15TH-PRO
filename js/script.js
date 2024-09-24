const teamSwiper = new Swiper('.team-swiper', {
    centeredSlides: true,
    freeMode: true,
    watchSlidesProgress: true,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 3,
            initialSlide: 1,
            spaceBetween: 30,
        },
    }
})

const serviceSwiper = new Swiper('.service-swiper', {
    centeredSlides: true,
    slideActiveClass: 'service--active',
    freeMode: true,
    watchSlidesProgress: true,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 2,
            initialSlide: 1,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 3,
            initialSlide: 1,
            spaceBetween: 30,
        },
        1920: {
            slidesPerView: 4,
            spaceBetween: 30,
        }
    }
});

$(document).ready(function () {
    $('.header__burger').click(function () {
        $('.navigation-menu').addClass('show')
    })

    $('.navigation-menu__close').click(function () {
        $('.navigation-menu').removeClass('show')
    })

    $('.navigation-menu__link').click(function () {
        $('.navigation-menu').removeClass('show')
    })
})

// 
$(document).ready(function () {
    function createSvgBorderForElement($element, cornerSize, animate = false) {
        // Получаем размеры элемента
        const width = $element.outerWidth();
        const height = $element.outerHeight();
        const offset = $element.offset();

        // Создаем SVG с обводкой
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "svg-border");
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.style.position = 'absolute';
        svg.style.top = `0px`;
        svg.style.left = `0px`;
        svg.style.pointerEvents = 'none'; // Чтобы SVG не мешал взаимодействию с элементом

        // Создаем основной квадрат
        const mainSquare = document.createElementNS(svgNS, "rect");
        mainSquare.setAttribute("x", cornerSize / 2);
        mainSquare.setAttribute("y", cornerSize / 2);
        mainSquare.setAttribute("width", !animate ? width - cornerSize : 0);
        mainSquare.setAttribute("height", !animate ? height - cornerSize : 0);
        mainSquare.setAttribute("fill", "none");
        mainSquare.setAttribute("stroke", "#719B00");
        svg.appendChild(mainSquare);

        if (animate) {
            $(mainSquare).animate({
                width: width - cornerSize,
                height: height - cornerSize
            }, 500)
        }

        // Функция для создания угловых квадратов
        function createCornerSquare(x, y, animate = false) {
            const cornerSquare = document.createElementNS(svgNS, "rect");
            cornerSquare.setAttribute("x", !animate ? x : 0);
            cornerSquare.setAttribute("y", !animate ? y : 0);
            cornerSquare.setAttribute("width", cornerSize);
            cornerSquare.setAttribute("height", cornerSize);
            cornerSquare.setAttribute("fill", "#BAFF00");
            svg.appendChild(cornerSquare);

            if (animate) {
                $(cornerSquare).animate({
                    x,
                    y,
                }, 500)
            }
        }

        // Создаем угловые квадраты
        createCornerSquare(0, 0);
        createCornerSquare(width - cornerSize, 0, animate);
        createCornerSquare(0, height - cornerSize, animate);
        createCornerSquare(width - cornerSize, height - cornerSize, animate);

        // Добавляем SVG в документ
        $element.append(svg);
    }

    // Инициализация обводки
    const $targetElement = $('.with-green-border');
    const cornerSize = 10;
    $targetElement.each(function () {
        delay =  $(this).data('delay') || 0
        
        setTimeout(() => createSvgBorderForElement($(this), cornerSize, true), delay)
    })

    // Обновление обводки при изменении размеров окна
    $(window).resize(function () {
        // Удаляем предыдущий SVG, если он существует
        $('.svg-border').remove();
        $targetElement.each(function () {
            createSvgBorderForElement($(this), cornerSize);
        })
    });
});