/**
 * Created by davidkezi on 14/07/2017.
 */
const btnLogOut = document.getElementById('btnLogOut');

btnLogOut.addEventListener('click', e => {
	firebase.auth().signOut();
	// btnLogout.classList.add('hide');
	console.log(' logout clicked');
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log(firebaseUser.uid);
		// btnLogout.classList.remove('hide');
		//      window.location.replace('/home');
	} else {
		console.log("not logged in");
		// btnLogout.classList.add('hide');
		window.location.replace('/');
	}
});


