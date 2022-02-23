const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

//Show input error message
function showError(input, message) {
  //gets the parent div
  const formControl = input.parentElement;
  //applies error class and reapplies form-control class
  formControl.className = "form-control error";
  //finds the small tag within this div
  const small = formControl.querySelector("small");
  //inserts the message parameter into the small tag
  small.innerText = message;
}

//Show success outline
function showSuccess(input) {
  //gets the parent div
  const formControl = input.parentElement;
  //applies success class and reapplies form-control class
  formControl.className = "form-control success";
}

//Check to see if email is valid
function checkEmail(input) {
  const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //if (regular expression representing a valid email, then true else false)
  if (regExEmail.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Not a real email bub");
    return false;
  }
}

//check required fields
function checkRequired(inputArr) {
  //iterate through each slot in inputArr
  let check = 0;
  inputArr.forEach(function (input) {
    //if not null, show success
    if (input.value.trim() === "") {
      console.log(input.id);
      showError(input, `${getFieldName(input)} is required bub`);
      check--;
    } else {
      showSuccess(input);
      check++;
    }
  });
  if (check === inputArr.length) {
    return true;
  } else {
    return false;
  }
}

//check whether an input is between a min and max length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)}'s gotta be over ${min} characters bub`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)}'s gotta be under ${max} characters bub`
    );
    return false;
  }
  return true;
}

// Check if the passwords match
function checkPasswords(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Those dont match bub");
    return false;
  } else {
    showSuccess(input1);
    showSuccess(input2);
    return true;
  }
}
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (checkRequired([email, password]) && checkEmail(email)) {
    let data = {
      email: email.value,
      password: password.value,
    };

    fetch("/api/loginuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "ok" && res.auth === true) {
          localStorage.setItem("auth", true);
          localStorage.setItem("user", res.user);
          window.location.href = "/";
        } else {
          localStorage.setItem("auth", false);

          alert("email/password not correct");
        }
      });
  }
});
