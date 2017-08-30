$(document).ready(function () {
	let senderName = document.getElementById('senderName');
	let messageToSend = document.getElementById("messageToSend");
	let recepients = document.getElementById("recipients");
	let fileInput = document.getElementById("csvFileInput");
	let creditBalance = document.getElementById("creditBalance");
	let username = 'davidkezi6@gmail.com';
	let apiKey = '76d087b2cf3ac21af694c5f1e017c02a16d8d552';
	let flash = 0;
	// getCreditBalance();

	// TODO: move all important things to the server and send everything via ajax
	$('#sendMsg').click(function (e) {
		e.preventDefault();

		let x = fileInput.files[0]
		console.log(x);

		senderName = senderName.value
		messageToSend = messageToSend.value
		recepients = recepients.value
		let fileInputValue = fileInput.value;

		// // let formValues = {
		// // 	name: senderName.value
		// // }
		// console.log('clicked')
		// $.ajax({
		// 	type: 'post',
		// 	url: '/sms',
		// 	data: formValues,
		// 	// processData: false,
		// 	success: function (data) {
		// 		console.log('this ish succeeded');
		// 		console.log(data);
		// 	}
		// })

		// check if the csv has been uploaded or not
		if (fileInputValue === "") {
			getRecepients(recepients); // send recepients in textbox to the getRecepients function
		} else {
			readFile();
		}
	});
	function readFile() {
		let reader = new FileReader();

		// 👇🏿 start reading the file. When it is done, calls the onload event defined below.	
		reader.readAsText(fileInput.files[0]);

		// split the text and replace square braces and quotation marks with new line
		reader.onload = function () {
			let xx = reader.result.split("\r"); // text gotten then split
			let ss = JSON.stringify(xx).replace(/[\[\]\,"]+/g, '\n');
			getRecepients(ss); // send result of csv to the getRecepients function.
		};
	};

	function getRecepients(recipients) {
		// create a gsmNumber object and put gsm as a name with its value being an array 
		let gsmNumber = {};
		gsmNumber['gsm'] = [];
		let prefix = '234';
		let numberArr = recipients.split('\n');

		// for each value in the numberArr array take the index and value
		$.each(numberArr, (index, value) => {
			let number = value.trim(); // remove whitespace from the value
			if (number.charAt(0) === '0') {
				number = prefix + number.substr(1);
			}
			if (number.charAt(0) === '+') {
				number = number.substr(1);
			}
			// if (number.charAt(0) === 8 || 9 || 7) {
			// 	number = prefix + number;
			// }

			// push every number with msidn as its name
			gsmNumber['gsm'].push({
				'msidn': number
				// 'msgid': id
			});
		});

		//run the sendSMS function to make the actual bulk sms
		sendSMS(username, apiKey, flash, senderName, messageToSend, gsmNumber)
	}

	// main function that sends the bulk message
	function sendSMS(username, apiKey, flash, senderName, message, recipients) {
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
				'recipients': recipients  //changed gsmNumber to get..
			}
		};
		console.log(JSON.stringify(request));
		$.ajax({
			type: "post",
			url: "http://sms.easysmsnigeria.com/api/sendsms.json",
			data: JSON.stringify(request),
			contentType: "application/json",
			success: (response) => {
				console.log((response));
				let data = (response.status);
				if (data === 'success') {
					alert('parza!!!')
				} else {
					alert('bummer... it didn\'t work :(')
				}
			}
		});

	}
	function getCreditBalance() {
		$.ajax({
			type: "get",
			url: "http://sms.easysmsnigeria.com/api/balance/" + username + "/" + apiKey,
			success: (response) => {
				console.log(('new balance is ' + response));
				creditBalance.innerHTML = "current balance is " + response;
				getCreditBalance();
				// let data = (response.status);
				// if (data === 'success') {
				// 	alert('parza!!!')
				// } else {
				// 	alert('bummer... it didn\'t work :(')
				// }
			}
		});
	}
});
// });
