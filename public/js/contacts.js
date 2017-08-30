// /*if (addContact) {

// const sendMsg = document.getElementById('sendMsg');
const addContact = document.getElementById('addContact');

const database = firebase.database();

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
		database.ref('user/').push({
			name: nameToDb,
			phoneNum: phoneNumToDb
		});

		/* nodeNum.once('value').then(function (snapshot) {
			num = snapshot.numChildren();
			// console.log(JSON.stringify(snapshot.val()))
			let newNum = num + 1;
			// database.ref('user/user_' + newNum).push({
			database.ref('user/').push({
				name: nameToDb,
				phoneNum: phoneNumToDb
			});
			// nodeNum.on('value', function (snapshot) {
			// 	// console.log(snapshot.childSnapshot.val())
			// 	snapshot.forEach(function (childSnapshot) {
			// 		// childData will be the actual contents of the child
			// 		var childData = childSnapshot.val();
			// 		// console.log(childData)
			// 		keys.push(childData);
			// 	});
			// 	console.log(JSON.stringify(keys))
			// 	// let contactArray = keys

			// 	$.ajax({
			// 		type: "GET",
			// 		url: "/contacts",
			// 		// contentType: 'application/json',
			// 		data: {
			// 			contactsFromDb: keys
			// 		},
			// 		success: function () {
			// 			console.log('success');
			// 			// document.getElementById('dan').innerHTML
			// 		}
			// 	})

			// })

		}) */

		console.log("data of " + nameToDb + " pushed to Firebase")
		document.getElementById('userName').value = "";
		document.getElementById('userTel').value = "";


	} else {
		alert('please fill all fields')
	}
});
