$('#burger').on('click', function () {
    $('#menu').addClass('menu_open');
})

$("#menu *").each(function (item) {
    $(this).on('click', function (e) {
        $('#menu').removeClass('menu_open');
    });
});
new WOW().init();

$(document).ready(function () {
    $('.cakes__image').magnificPopup({
        type: 'image',
    });
    $('#orderForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const orderInput = $('.order__input')

        orderInput.each(function (element) {
            const curVal = $(this).val().trim();
            const errorMessage = $(this).next()
            if (curVal === '') {
                isValid = false;
                errorMessage.show();
                $(this).css('borderColor', 'red')
            } else {
                errorMessage.hide();
                $(this).css('borderColor', '#821328')
            }

            $(this).on('input', function () {
                errorMessage.hide();
                $(this).css('borderColor', '#821328')
            });
        })

        let userData = {
            choose: $('#chooseInput').val(),
            name: $('#orderInfoInput').val(),
            number: $('#orderNumberInput').val()
        }

        if (isValid) {
            $.ajax({
                url: 'https://testologia.ru/checkout', // Адрес, на который будет отправлен запрос
                method: 'POST', // Метод запроса (GET, POST и т.д.)
                dataType: 'json',
                data: userData,
                success: function (response) {
                    if (response.success === 1) {
                        $('#orderForm').hide();
                        $('#success__message').css('display', 'flex')
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ")
                    }
                },
                error: function (xhr, status, error) {
                    // Действия при возникновении ошибки
                    console.error('Ошибка:', error);
                }
            });
            $(document).ajaxStart(function () {
                $("#loader").show();
                $("#overlay").show();
            });

            // Скрываем лоадер при завершении запроса
            $(document).ajaxStop(function () {
                $("#loader").hide();
                $("#overlay").hide();
            });
        }
    })

    $('#cakes').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 610,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
})

