$(document).ready(function () {
	$('#sendMsg').click(function (e) {
		e.preventDefault();
		let recipients = $('#recipients').val();
		let csv = $('#csvFileInput').val();
		// console.log(recepients)
		if (recipients === "" && csv === "") {
			alert('either the csv or recepients are necessary');
		}
		else {
			let form = {
				recipients: recipients,
				csv: csv
			}
			let forms = new FormData($('#smsForm')[0])
			console.log(form)
			$.ajax({
				type: 'post',
				url: '/sms',
				processData: false,
				contentType: false,
				// data: new FormData($('#smsForm')[0]),
				data: forms,
				success: function (data) {
					console.log('this ish succeeded');
					console.log(data);
				}
			})
		}
	});
});
