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

// Custom Error Notification System
const createElement = (name, classes, content) => {
  const element = document.createElement(name);
  if (classes) {
    element.classList.add(...classes);
  }
  if (content) {
    element.append(...content);
  }
  return element;
};

const showErrorNotification = (error, title = "Network Error") => {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll(".error-notification");
  existingNotifications.forEach((notif) => notif.remove());

  let errorMessage = "An error occurred. Please try again.";
  
  if (error) {
    if (error.response) {
      // Axios error with response
      errorMessage = error.response.data?.message || 
                     error.response.statusText || 
                     `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Axios error without response (network error)
      errorMessage = "Network error. Please check your internet connection or VPN.";
    } else if (error.message) {
      // Error object with message
      errorMessage = error.message;
    } else if (typeof error === "string") {
      // String error
      errorMessage = error;
    }
  }

  const notification = createElement("div", ["error-notification"]);
  notification.innerHTML = `
    <div class="error-notification__icon">
      <i class="bi bi-exclamation-triangle-fill"></i>
    </div>
    <div class="error-notification__content">
      <div class="error-notification__title">${title}</div>
      <p class="error-notification__message">${errorMessage}</p>
    </div>
    <button class="error-notification__close" aria-label="Close">
      <i class="bi bi-x-lg"></i>
    </button>
  `;

  const closeBtn = notification.querySelector(".error-notification__close");
  const handleClose = () => {
    notification.classList.add("error-notification--hide");
    setTimeout(() => notification.remove(), 300);
  };

  closeBtn.addEventListener("click", handleClose);

  document.body.appendChild(notification);

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      handleClose();
    }
  }, 5000);
};

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

  async newPass() {
    const getUsers = await fetch(`${BASE_URL}/users`);
    const users = await getUsers.json();

    const doesUserExits = users.find((user) => user.email === this.email);

    if (!doesUserExits) {
      return {
        statusCode: 404,
        message: "email incorrect",
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

const updateUsers = async (obj) => {
  try {
    const token = LocalStorageData.getData("user");
    const users = await axios.put(
      `https://66681ccef53957909ff69fee.mockapi.io/users/${token}`,
      obj
    );
    console.log(users);
  } catch (error) {
    showErrorNotification(error, "Failed to Update Password");
  }
};

//form event
const form = document.querySelector("form");
const alertSection = document.querySelector(".alert");
alertSection.style.display = "none";
const messagePreview = document.querySelector(".message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  messagePreview.textContent = "";

  const emailInput = e.target.email;
  const passwordInput = e.target.password;

  try {
    const user = new Authentication(
      emailInput.value.trim(),
      passwordInput.value.trim()
    );

    user.verifyData();

    const res = await user.newPass();
    if (res.statusCode === 404) {
      messagePreview.textContent = res.message;
      messagePreview.style.color = "red";
    }

    if (res.statusCode === 200) {
        LocalStorageData.setData(res.data);
        const obj = {
            password: e.target.password.value,
          };
        
          updateUsers(obj);
          alertSection.style.display = "block";
        
          e.target.email.value = "";
          e.target.password.value = "";
    //   window.location.replace("../index.html");
    }
  } catch (error) {
    if (error.message === "passwordError") {
      messagePreview.textContent = "password incorrect";
      messagePreview.style.color = "red";
    }
  }
});

// const form = document.querySelector("form");

// alertSection.style.display = "none";
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const obj = {
//     password: e.target.password.value,
//   };

//   updateUsers(obj);
//   alertSection.style.display = "block";

//   e.target.email.value = "";
//   e.target.password.value = "";
// });
