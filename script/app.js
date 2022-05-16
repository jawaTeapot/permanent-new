// Функция валидации
function validation() {
  $('#fio').removeClass('error-input');
  $('#email').removeClass('error-input');
  $('#phone').removeClass('error-input');


  const fio = $('#fio').val();
  const email = $('#email').val();
  const phone = $('#phone').val();
  let isValid = true;

  if (!fio) {
    $('#fio').addClass('error-input');
    isValid = false;
  }
  if (!email) {
    $('#email').addClass('error-input');
    isValid = false;
  }
  if (!phone) {
    $('#phone').addClass('error-input');
    isValid = false;
  }

  return isValid;
}

// Отправка данных на сервер
function sendData(payload) {
  $.ajax({
    url: "/email.php",
    type: "post",
    data: payload ,
    success: function (response) {
      Swal.fire(
        'Письмо отправлено!',
        'Скоро я вам перезвоню',
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


$(document).ready(function(){
  // Карусель с фотками
  $('#slider').slick({
    dots: true,
  });
  // Карусель с фотками - мобайл
  $('#slider-phone').slick({
    dots: false,
    centerPadding: '60px',
    centerMode: true,
    prevArrow: $('#prev'),
    nextArrow: $('#next'),
  });
});

// Нажали на бургер
$('#burger').on('click', function (e) {
  $('.burger').show();
});

// Нажали на закрытие бургера
$('#burger-close').on('click', function (e) {
  $('.burger').hide();
});
