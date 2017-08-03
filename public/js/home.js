/**
 * Created by davidkezi on 06/07/2017.
 */
const userId = firebase.auth().currentUser;

const sendMsg = document.getElementById('sendMsg');
const addContact = document.getElementById('addContact');


let message;
let recipients;
let username = "davidkezi6@gmail.com";
let apiKey = '76d087b2cf3ac21af694c5f1e017c02a16d8d552';
let flash = 0;
let senderName;




// send Bulk Message on click listener, in home.ejs
if (sendMsg) {
	// TODO 
	// 1. refactor the code in this block and bring the variables to get the element id outside and leave the .values inside the functions
	sendMsg.addEventListener('click', (e) => {
		message = document.getElementById('messageToSend').value;
		recipients = document.getElementById('recipients').value;
		senderName = document.getElementById('senderName').value;
		console.log("message is: " + message);
		sendSMS(username, apiKey, flash, senderName, message, recipients);
	})
};

const database = firebase.database();


// add contact to db when addContact is clicked, in contact.ejs
if (addContact) {

	addContact.addEventListener('click', (e) => {
		e.preventDefault(); // prevents form from refreshing page
		// let nodeNum = firebase.database().ref('Contacts/user/' + nodeNum);
		let nodeNum = firebase.database().ref('user');
		let keys = []
		let num;

		let userName = document.getElementById('userName').value;
		let userTel = document.getElementById('userTel').value;

		if (userName && userTel) {
			let nameToDb = userName;
			let phoneNumToDb = userTel
			nodeNum.once('value').then(function (snapshot) {
				num = snapshot.numChildren();
				console.log(JSON.stringify(snapshot.val()))
				let newNum = num + 1;
				database.ref('user/user ' + newNum).set({
					name: nameToDb,
					phoneNum: phoneNumToDb
				});
			});

			console.log("data of " + nameToDb + " pushed to Firebase")
			document.getElementById('userName').value = "";
			document.getElementById('userTel').value = "";


		} else {
			alert('please fill all fields')
		}
	});
}

function sendSMS(username, apiKey, flash, senderName, message, recipients) {
	let gsmNumber = {};
	gsmNumber['gsm'] = [];
	let prefix = '234';
	let numberArr = recipients.split('\n');
	$.each(numberArr, (index, value) => {
		let number = value.trim();
		// let id = "sms_" + Math.random().toString(36).slice(2);
		if (number.charAt(0) === '0') {

			number = prefix + number.substr(1);
		}
		if (number.charAt(0) === '+') {
			number = number.substr(1);
		}
		gsmNumber['gsm'].push({
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
			'recipients': gsmNumber
		}
	};
	console.log(JSON.stringify(request));
	$.ajax({
		type: "post",
		url: "http://sms.easysmsnigeria.com/api/sendsms.json",
		data: JSON.stringify(request),
		contentType: "application/json",
		success: (response) => {
			console.log($.parseJSON(response));
			let data = $.parseJSON(response.status);
			if (data === 'success') {
				alert('parza!!!')
			} else {
				alert('bummer... it didn\'t work :(')
			}
		}
	});
}

	// // CONTACT PAGE
	// // Get a reference to the database service
	// let name = 'davids';
	// let email = 'david@david.com';
	// // let userId = firebase.auth().currentUser;
	// // const auth = firebase.UserInfo;
	// let userId = firebase.getAuth().uid;

	// console.log(userId);

	// function writeUserData(userId, name, email) {
	//   firebase.database().ref('users/' + userId).set({
	//     username: name,
	//     email: email
	//   });
	// }

	// Get a reference to the database service
	// var

	// function writeUserData(userId, name, email, imageUrl) {
	// 	firebase.database().ref('users/' + userId).set({
	// 		username: name,
	// 		email: email,
	// 		profile_picture: imageUrl
	// 	});
	// }


