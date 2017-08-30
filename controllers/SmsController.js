exports.sendSMS = function (req, res) {
	console.log(req.body.senderName + ' ' + req.body.messageToSend)
	console.log(req.body.fileInput)
}
	// =========================================================================================

	// =========================================================================================





	// fs.readFile(req.files.file.path, function (err, data) {
	// 	// Do something with the data (which holds the file information)
	// 	console.log('david')
	// });


	// 	function handleFiles(files) {
	// 		if (window.FileReader) {
	// 			getAsText(files[0]);
	// 		} else {
	// 			alert('cannot read files from this browser')
	// 		}
	// 	}

	// 	function getAsText(fileToRead) {
	// 		let reader = new FileReader();
	// 		// Read file into memory as UTF-8
	// 		reader.readAsText(fileToRead);
	// 		// Handle errors load
	// 		reader.onload = loadHandler;
	// 		reader.onerror = errorHandler;
	// 	}

	// 	function loadHandler(event) {
	// 		let csv = event.target.result;
	// 		processData(csv);
	// 	}

	// 	function errorHandler(evt) {
	// 		if (evt.target.error.name == "NotReadableError") {
	// 			alert("Canno't read file !");
	// 		}
	// 	}

	// 	function processData(csv) {
	// 		// let allTextLines = csv.split('\n');
	// 		// let lines = [];
	// 		// for (let i = 0; i < allTextLines.length; i++) {
	// 		// 	lines.push(allTextLines.shift().split(','));
	// 		// }
	// 		// console.log(csv);
	// 		// drawOutput(lines);

	// 		let allTextLines = csv.split(/\r\n|\n/);
	// 		let lines = [];
	// 		for (let i = 0; i < allTextLines.length; i++) {
	// 			let data = allTextLines[i].split('\r');
	// 			// let tarr = [];
	// 			// for (let j = 0; j < data.length; j++) {
	// 			// 	tarr.push(data[j]);
	// 			// }
	// 			lines.push(data);
	// 		}
	// 		stringifyData(lines)
	// 	}

	// 	function stringifyData(names) {
	// 		// the line below removes all square brackets, commas and quotation marks and converts them to a new line so they can be passed to the sendSMS function
	// 		let nameString = JSON.stringify(names).replace(/[\[\]\,"]+/g, '\n');
	// 		// console.log(nameString.replace(/[\[\]\,"]+/g, '\n'))
	// 		// let dada = names.replace
	// 		// isCSV = true;
	// 		// let dan = []

	// 		// recipients = nameString;
	// 		// console.log("namestring is a " + nameString)
	// 		getRecepients(nameString)

	// 		// replace(/\n/g, ",").split(",");
	// 	}

	// 	function getRecepients(recipients) {
	// 		let gsmNumber = {};
	// 		gsmNumber['gsm'] = [];
	// 		let prefix = '234';
	// 		let numberArr = recipients.split('\n');
	// 		$.each(numberArr, (index, value) => {
	// 			let number = value.trim();
	// 			// let id = "sms_" + Math.random().toString(36).slice(2);
	// 			if (number.charAt(0) === '0') {

	// 				number = prefix + number.substr(1);
	// 			}
	// 			if (number.charAt(0) === '+') {
	// 				number = number.substr(1);
	// 			}
	// 			gsmNumber['gsm'].push({
	// 				'msidn': number
	// 				// 'msgid': id
	// 			});
	// 		});

	// 		// console.log("this is the gsm number " + JSON.stringify(gsmNumber));

	// 		// david(JSON.stringify(gsmNumber));

	// 		// return JSON.stringify(gsmNumber)


	// 		// sendSMS(username, apiKey, flash, senderName, message)

// }

/*function stringifyData(names) {
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


// function sendSMS(username, apiKey, flash, senderName, message) {
//   david();
//   // function david(anu) {
//   // 	console.log(JSON.stringify(anu));
//   // }
//   // david();
//   // console.log(gsmNumber);
//   // // console.log("gsm"+ JSON.stringify(gsm));
//   // let sms = {
//   // 	'sender': senderName,
//   // 	'messagetext': message,
//   // 	'flash': flash
//   // };
//   // let request = {
//   // 	'SMS': {
//   // 		'auth': {
//   // 			'username': username,
//   // 			'apikey': apiKey,
//   // 		},
//   // 		'message': sms,
//   // 		'recipients': getRecepients()  //changed gsmNumber to get..
//   // 	}
//   // };
//   // console.log(JSON.stringify(request));
//   // $.ajax({
//   // 	type: "post",
//   // 	url: "http://sms.easysmsnigeria.com/api/sendsms.json",
//   // 	data: JSON.stringify(request),
//   // 	contentType: "application/json",
//   // 	success: (response) => {
  // 		console.log($.parseJSON(response));
  // 		let data = $.parseJSON(response.status);
  // 		if (data === 'success') {
  // 			alert('parza!!!')
  // 		} else {
  // 			alert('bummer... it didn\'t work :(')
  // 		}
  // 	}
  // });
}*/
