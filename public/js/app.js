const userEmail = document.getElementById("inputEmail");
const userPass = document.getElementById("inputPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const toggleLoginSignUp = document.getElementById("loginSignUp_toggle");

let formType = 0;
btnSignUp.style.display = "none";

toggleLoginSignUp.addEventListener("click", () => {
  formType++;
  formType = formType % 2;

  if (formType == 1) {
    btnSignUp.style.display = "block";
    btnLogin.style.display = "none";
  } else {
    btnLogin.style.display = "block";
    btnSignUp.style.display = "none";
  }
  console.log(formType);
});

btnSignUp.addEventListener("click", e => {
  let email = userEmail.value;
  let password = userPass.value;
  const auth = firebase.auth();
  console.log("login clicked");
  //     Sign Up
  const promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e => alert(e.message));
});

btnLogin.addEventListener("click", e => {
  let email = userEmail.value;
  let password = userPass.value;
  const auth = firebase.auth();
  console.log("login clicked");
  //     Sign In
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => alert(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    // btnLogout.classList.remove('hide');
    window.location.replace("/home");
  } else {
    console.log("not logged in");
    // btnLogout.classList.add('hide');
    // window.location.replace('/');
  }
});
