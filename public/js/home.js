$(document).ready(function () {
  $('#sendMsg').click(function (e) {
    e.preventDefault();
    let recepients = $('#recipients').val(), csv = $('#csvFileInput').val();
    if (recepients === "" && csv === ""){
      alert('either the csv or recepients are necessary');
    }
    else {
      $.ajax({
        type: 'post',
        url: '/sms',
        processData: false,
        contentType: false,
        data: new FormData($('#smsForm')[0]),
        success: function (data) {
          console.log('this ish succeeded');
          console.log(data);
        }
      })
    }
  });
});
