window.contactForm = () => { 
    log("Contact form code is active..")
    var form = $('#contact__form'),
    message_success = $('#contact__msg__success'),
    message_danger = $('#contact__msg__danger'),
    message_response = $('#contact__msg__response'),
    submit = $('#submit__row'),
    form_data;

    // Success function
    function done_func(data) {
        log("Success!"); 
        log(data); 
        message_success.removeClass('d-none');
        submit.fadeOut();
        message_response.text(data);
        setTimeout(function () {
            //message_success.fadeOut();
        }, 2000);
    }

    // fail function
    function fail_func(data) { 
    message_danger.removeClass('d-none');
    submit.fadeOut();
    // setTimeout(function () {
    //     message.fadeOut();
    // }, 2000);
    } 
    
    form.submit(function (e) {
    e.preventDefault();
    form_data = $(this).serialize();
    //log("form submit"); 
    $.ajax({
        method: 'POST',
        url: '/assets/php/mailgun.php', 
        data: form_data,
        dataType:'text',
        success: function(data) {
            //log(data);
            done_func(data);
        }
    })
    .fail(fail_func);
    });
}
