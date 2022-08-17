//login function handler ALSO AYNC
async function loginFormHandler(event) {
  event.preventDefault();
  //grabbing the front end data to send to our backend
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

//async -> THis function is doing something asynchronous!
async function signupFormHandler(event) {
  event.preventDefault();

  //grabbing the front end data to send to our backend
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  //if we have recieved all of our parts
  if (username && email && password) {
    // use a fetch to send to our backend
    //making use of await before our promise
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    //check our response status
    if (response.ok) {
      console.log("success!");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
