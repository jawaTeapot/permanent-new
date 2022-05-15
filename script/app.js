// Функция валидации
function validation() {
    $('.error').each(function(key, value) {
        $(value).css({
            display: 'none'
        })
    });


    const fio = $('#fio').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    let isValid = true;

    if (!fio) {
        $('#error-fio').css({
            display: 'block'
        });
        isValid = false;
    }
    if (!email) {
        $('#error-email').css({
            display: 'block'
        });
        isValid = false;
    }
    if (!phone) {
        $('#error-phone').css({
            display: 'block'
        });
        isValid = false;
    }

    return isValid;
}

// Отправка данных на сервер
function sendData(payload) {
  console.log('send data', payload);
  $.ajax({
    url: "/email.php",
    type: "post",
    data: payload ,
    success: function (response) {
      Swal.fire(
        'Письмо отправлено!',
        'Скоро наш менеджер свяжется с вами',
        'success'
      )
    },
    error: function(jqXHR, textStatus, errorThrown) {
      Swal.fire(
        'Ошибка отправки письма!',
        'Попробуйте еще раз',
        'error'
      )
    }
  });
}

// Нажали смотреть все товары
$('#showmore').on('click', function (e) {
  $('.product-hide').each(function (key, value) {
    $(value).css({
      display: 'flex'
    })
  })
  $('#showmore').hide();
});

// Нажали на бургер
$('#burger').on('click', function (e) {
  $('.burger').show();
});

// Нажали на закрытие бургера
$('#burger-close').on('click', function (e) {
  $('.burger').hide();
});

// Когда форма отправилась
$('#submit').on('click', function(e) {
    e.preventDefault();
    const agree = $('#agree').prop('checked');
    if (!agree) {
        $('#error-checkbox').css({
            display: 'block'
        })
        return;
    }

    const isValid = validation();
    if (!isValid) return;

    const fio = $('#fio').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const msg = $('#msg').val();
    const payload = {
      fio,
      email,
      phone,
      msg,
      agree
    }
    sendData(payload);
})

// Когда чекбокс изменился
$('#agree').on('change', function(e) {
    if ($(e.target).prop('checked')) {
        $('#error-checkbox').css({
            display: 'none'
        })
    }
})