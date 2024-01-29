const registerButton = document.querySelector("#register");

$(document).ready(function () {
  $("#register").click(function () {
    register();
  });
});

/**
 * Sends a request to the express that contains firstname, lastname, username and password
 * @param {JSON} testdata Creates a user for testing purposes
 * @returns responseText from the request
 */
function register(testdata) {
  let fname;
  let lname;
  let userName;
  let password;
  let test = "";

  if (testdata != null) {
    fname = testdata.fname;
    lname = testdata.lname;
    userName = testdata.username;
    password = testdata.password;
    test = true;
  } else {
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    userName = document.getElementById("userName").value;
    password = document.getElementById("password").value;
  }

  const data = {
    fname: fname,
    lname: lname,
    username: userName,
    password: password,
    test: test,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/api/register", false);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (test == "") {
      window.location.href = "../html/login.html";
    }
  };
  let eventString = JSON.stringify(data);
  xhr.send(eventString);
  return xhr.responseText;
}



/**
 * Sends a request to express to delete a user
 * @param {String} name User to be deleted
 */
function deleteAccFromDatabase(name) {
  const data = {
    name: name,
  };
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", "http://localhost:8080/api/register", false);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {};

  let eventString = JSON.stringify(data);
  xhr.send(eventString);
}

/**
 * Deletes the test user and creates it again
 * @param {JSON} testdata Contains the data of the test user
 * @returns responseText from register()
 */
function testRegister(testdata) {
  deleteAccFromDatabase(testdata.username);

  let testResult = register(testdata);
  return testResult;
}

module.exports = testRegister;
