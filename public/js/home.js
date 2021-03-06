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
let isCSV;

const database = firebase.database();


// add contact to db when addContact is clicked, in contact.ejs
if (addContact) {

	addContact.addEventListener('click', (e) => {
		e.preventDefault(); // prevents form from refreshing page
		// let nodeNum = firebase.database().ref('Contacts/user/' + nodeNum);
		let nodeNum = firebase.database().ref('user').orderByKey();
		let keys = []
		let num;

		let userName = document.getElementById('userName').value;
		let userTel = document.getElementById('userTel').value;

		if (userName && userTel) {
			let nameToDb = userName;
			let phoneNumToDb = userTel


			nodeNum.once('value').then(function (snapshot) {
				num = snapshot.numChildren();
				// console.log(JSON.stringify(snapshot.val()))
				let newNum = num + 1;
				database.ref('user/user_' + newNum).set({
					name: nameToDb,
					phoneNum: phoneNumToDb
				});
				nodeNum.on('value', function (snapshot) {
					// console.log(snapshot.childSnapshot.val())
					snapshot.forEach(function (childSnapshot) {
						// childData will be the actual contents of the child
						var childData = childSnapshot.val();
						// console.log(childData)
						keys.push(childData);
					});
					console.log(JSON.stringify(keys))
					// let contactArray = keys

					$.ajax({
						type: "GET",
						url: "/contacts",
						// contentType: 'application/json',
						data: {
							contactsFromDb: keys
						},
						success: function () {
							console.log('success');
							// document.getElementById('dan').innerHTML
						}
					})

				})

			})



			console.log("data of " + nameToDb + " pushed to Firebase")
			document.getElementById('userName').value = "";
			document.getElementById('userTel').value = "";


		} else {
			alert('please fill all fields')
		}
	});
}


// send Bulk Message on click listener, in home.ejs
if (sendMsg) {
	// TODO 
	// 1. refactor the code in this block and bring the variables to get the element id outside and leave the .values inside the functions
	sendMsg.addEventListener('click', (e) => {
		message = document.getElementById('messageToSend').value;
		recipients = document.getElementById('recipients').value;
		senderName = document.getElementById('senderName').value;
		console.log("message is: " + message);
		getRecepients(recipients);
		// sendSMS(username, apiKey, flash, senderName, message);
	});

}

function handleFiles(files) {
	if (window.FileReader) {
		getAsText(files[0]);
	} else {
		alert('cannot read files from this browser')
	}
}

function getAsText(fileToRead) {
	let reader = new FileReader();
	// Read file into memory as UTF-8      		
	reader.readAsText(fileToRead);
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
}
function loadHandler(event) {
	let csv = event.target.result;
	processData(csv);
}
function errorHandler(evt) {
	if (evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}
function processData(csv) {
	// let allTextLines = csv.split('\n');
	// let lines = [];
	// for (let i = 0; i < allTextLines.length; i++) {
	// 	lines.push(allTextLines.shift().split(','));
	// }
	// console.log(csv);
	// drawOutput(lines);

	let allTextLines = csv.split(/\r\n|\n/);
	let lines = [];
	for (let i = 0; i < allTextLines.length; i++) {
		let data = allTextLines[i].split('\r');
		// let tarr = [];
		// for (let j = 0; j < data.length; j++) {
		// 	tarr.push(data[j]);
		// }
		lines.push(data);
	}
	stringifyData(lines)
}

function stringifyData(names) {
	// the line below removes all square brackets, commas and quotation marks and converts them to a new line so they can be passed to the sendSMS function
	let nameString = JSON.stringify(names).replace(/[\[\]\,"]+/g, '\n');
	// console.log(nameString.replace(/[\[\]\,"]+/g, '\n'))
	// let dada = names.replace
	// isCSV = true;
	// let dan = []

	// recipients = nameString;
	// console.log("namestring is a " + nameString)
	getRecepients(nameString)

	// replace(/\n/g, ",").split(",");
}

function getRecepients(recipients) {
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
	// console.log("this is the gsm number " + JSON.stringify(gsmNumber));
	david(JSON.stringify(gsmNumber));

	// return JSON.stringify(gsmNumber)


	sendSMS(username, apiKey, flash, senderName, message)

}
function david(anu) {
	return anu
}


function sendSMS(username, apiKey, flash, senderName, message) {
	david();
	// function david(anu) {
	// 	console.log(JSON.stringify(anu));
	// }
	// david();
	// console.log(gsmNumber);
	// // console.log("gsm"+ JSON.stringify(gsm));
	// let sms = {
	// 	'sender': senderName,
	// 	'messagetext': message,
	// 	'flash': flash
	// };
	// let request = {
	// 	'SMS': {
	// 		'auth': {
	// 			'username': username,
	// 			'apikey': apiKey,
	// 		},
	// 		'message': sms,
	// 		'recipients': getRecepients()  //changed gsmNumber to get..
	// 	}
	// };
	// console.log(JSON.stringify(request));
	// $.ajax({
	// 	type: "post",
	// 	url: "http://sms.easysmsnigeria.com/api/sendsms.json",
	// 	data: JSON.stringify(request),
	// 	contentType: "application/json",
	// 	success: (response) => {
	// 		console.log($.parseJSON(response));
	// 		let data = $.parseJSON(response.status);
	// 		if (data === 'success') {
	// 			alert('parza!!!')
	// 		} else {
	// 			alert('bummer... it didn\'t work :(')
	// 		}
	// 	}
	// });
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


