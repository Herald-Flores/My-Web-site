<?php
# Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';
use Mailgun\Mailgun;

# First, instantiate the SDK with your API credentials
$mg = Mailgun::create('06870d3e94ee89f900f88aa7d34eed33-fd0269a6-c4d9949a');

$nombre = $_POST['name'];
$email = $_POST['email']; 
$company = $_POST['company'];
$phone = $_POST['phone'];
$country = $_POST['country'];
$subject = $_POST['subject'];
$mensaje = $_POST['message'];

echo "Mail init";

if ( isset($_POST['email']) ) {
    // Checking For Blank Fields..
    if ( $nombre == "" || $email == "" || $subject == "" || $mensaje == "" ) {
        echo "Fill All Fields...";
    } else {
        // Sanitize E-mail Address
        $email =filter_var($email, FILTER_SANITIZE_EMAIL);
        // Validate E-mail Address
        $email= filter_var($email, FILTER_VALIDATE_EMAIL);
        if (!$email){
            echo "Invalid Sender's Email";
        } else {
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
            // Send Mail By PHP Mail Function
            //mail();
            // echo $nombre; 
            // echo $email;
            // echo $company;
            // echo $phone;
            // echo $country;
            // echo $subject;
            // echo $mensaje;

            # Now, compose and send your message.
            # $mg->messages()->send($domain, $params);
            $mg->messages()->send('sandboxc06a71bb30d74a1289315ae6411e875b.mailgun.org', [
                'from'    => 'Novus Contact Form <contact@theboombitfactory.com>',
                'to'      => array('Enrique <enrique.flores@boombit.agency>, '), //Jefferson <jefferson@boombit.agency>, Jennier <jennier.cruz@boombit.agency>
                'subject' => $subject,
                //'text'    => 'Testing some Mailgun awesomness!',
                'template'    => 'novus-template',
                'h:X-Mailgun-Variables'    => '{
                    "nombre-cliente": '.json_encode($nombre).',
                    "nombre-email": '.json_encode($email).',
                    "nombre-company": '.json_encode($company).',
                    "nombre-phone": '.json_encode($phone).',
                    "nombre-country": '.json_encode($country).',
                    "nombre-subject": '.json_encode($subject).',
                    "mensaje": '.json_encode($mensaje).'
                }'

            ]);

        }
    }
}
