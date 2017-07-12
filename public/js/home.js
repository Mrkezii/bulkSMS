/**
 * Created by davidkezi on 06/07/2017.
 */
const btnLogOut = document.getElementById('btnLogOut');
const sendMsg = document.getElementById('sendMsg');
let message;
let recipients;
let username = "davidkezi6@gmail.com";
let apiKey = '76d087b2cf3ac21af694c5f1e017c02a16d8d552';
let flash = 0;
let senderName ;

sendMsg.addEventListener('click', (e) => {
  message = document.getElementById('messageToSend').value;
  recipients = document.getElementById('recipients').value;
  senderName = document.getElementById('senderName').value;
  console.log("message is: " + message);
  sendSMS(username, apiKey, flash, senderName, message, recipients);
});

function sendSMS( username, apiKey, flash, senderName, message, recipients) {
  let gsm = {};
  gsm['gsm'] = [];
  let prefix = '234';
  let numberArr = recipients.split('\n');
  $.each(numberArr, function (index, value) {
    let number = value.trim();
    // let id = "sms_" + Math.random().toString(36).slice(2);
    if (number.charAt(0) === '0') {
      number = prefix + number.substr(1);
    }
    if (number.charAt(0) === '+') {
      number = number.substr(1);
    }
    console.log('number' +number);
    gsm['gsm'].push({
      'msidn': number
      // 'msgid': id
    });
  });
  // console.log("gsm"+ JSON.stringify(gsm));
  let sms = {
    'sender': senderName,
    'messagetext': message,
    'flash': flash
  };
  let request = {
    'SMS': {
      'auth': {
        'username': username,
        'apikey': apiKey,
      },
      'message': sms,
      'recipients': gsm
    }
  };
  console.log(JSON.stringify(request));
  $.ajax({
    type: "post",
    url: "http://sms.easysmsnigeria.com/api/sendsms.json",
    data: JSON.stringify(request),
    contentType: "application/json",
    success: function (response) {
      console.log($.parseJSON(response));
      let data = $.parseJSON(response.status);
      if (data === 'success') {
        alert('parza!!!')
      }
      else {
        alert('bummer... it didn\'t work :(')
      }
    }
  });
}


btnLogOut.addEventListener('click', e => {
  firebase.auth().signOut();
  // btnLogout.classList.add('hide');
  console.log(' logout clicked');
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    // btnLogout.classList.remove('hide');
//      window.location.replace('/home');
  } else {
    console.log("not logged in");
    // btnLogout.classList.add('hide');
    window.location.replace('/');
  }
});




