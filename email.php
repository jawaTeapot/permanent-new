<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host       = 'ssl://smtp.mail.ru';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'kato.rostov@bk.ru'; // Логин на почте
    $mail->Password   = '8zjGcgPdDJ0eN20Ppn4G'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->CharSet = "utf-8";
    $mail->SMTPDebug = false;

    //Recipients
    $mail->setFrom('kato.rostov@bk.ru', 'Сайт'); // Адрес самой почты и имя отправителя 
    $mail->addAddress('kato.rostov@bk.ru'); // Получатель письма 
    
    //Content
    $fio = $_POST['fio'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $msg = $_POST['msg'];
    $arr = array (
        'fio' => $fio,
        'email' => $email,
        'phone' => $phone,
        'msg' => $msg,
    );

    $body = "
    <h2>Новое письмо</h2>
    <b>Имя:</b> $fio<br>
    <b>Телефон:</b> $phone<br>
    <b>Почта:</b> $email<br><br>
    <b>Сообщение:</b><br>$msg";

    $mail->isHTML(true);
    $mail->Subject = 'Потенциальный клиент';
    $mail->Body    = $body;

    $mail->send();
    // echo 'Message has been sent';
} catch (Exception $e) {
    http_response_code(500);
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>