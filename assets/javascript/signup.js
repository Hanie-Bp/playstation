class LocalStorageData {
  static setData(data) {
    localStorage.setItem("user", JSON.stringify(data.id));
  }

  static getData(term) {
    const data = localStorage.getItem(term);
    return JSON.parse(data);
  }

  static removeData() {
    localStorage.removeItem("user");
  }
}
//class auth
const BASE_URL = "https://66681ccef53957909ff69fee.mockapi.io";

class Authentication {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  verifyData() {
    if (!this.email.endsWith("@gmail.com")) {
      throw new Error("emailError");
    }

    if (this.password.length < 5) {
      throw new Error("passwordError");
    }
  }

  async signup() {
    try {
      const getUsers = await fetch(`${BASE_URL}/users`);
      const users = await getUsers.json();

      const doesUserExists = users.find((user) => user.email === this.email);

      if (doesUserExists) {
        return {
          statusCode: 409,
          message: "the email is already exists",
          data: "",
        };
      }

      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const createdUser = await response.json();

      return {
        statusCode: 201,
        message: "signed up successfully",
        data: createdUser,
      };
    } catch (error) {
      console.log("in catch block");
      console.log(error);
    }
  }

  async signin() {
    const getUsers = await fetch(`${BASE_URL}/users`);
    const users = await getUsers.json();

    const doesUserExits = users.find((user) => user.email === this.email);

    if (!doesUserExits) {
      return {
        statusCode: 404,
        message: "email or password incorrect",
        data: "",
      };
    }

    if (this.password !== doesUserExits.password) {
      return {
        statusCode: 404,
        message: "email or password incorrect",
        data: "",
      };
    }

    return {
      statusCode: 200,
      message: "logged in successfully",
      data: doesUserExits,
    };
  }
}
//sign up event
const signUpForm = document.querySelector("form");
const messagePreview = document.querySelector(".message");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e);

  messagePreview.textContent = "";

  const emailInput = e.target.email;
  const passwordInput = e.target.password;

  try {
    const user = new Authentication(
      emailInput.value.trim(),
      passwordInput.value.trim()
    );
    user.verifyData();
    const res = await user.signup();
    console.log(res);
    if (res.statusCode === 409) {
      messagePreview.textContent = res.message;
      messagePreview.style.color = "red";
    }

    if (res.statusCode === 201) {
      console.log(res);

      LocalStorageData.setData(res.data);
      window.location.replace("../index.html");
    }
  } catch (error) {
    if (error.message === "passwordError") {
      messagePreview.textContent =
        "your password should be more than 5 characters";
      messagePreview.style.color = "red";
    }
  }
});
