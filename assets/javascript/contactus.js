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

const checkUser = async () => {
  try {
    const token = LocalStorageData.getData("user");
    if (token) {
      const res = await axios.get(
        `https://66681ccef53957909ff69fee.mockapi.io//users/${token}`
      );

      if (res.status !== 200) {
        window.location.replace("./signin.html");
      }
    } else {
      window.location.replace("./signin.html");
    }
  } catch (error) {
    console.log(error);
  }
};

checkUser();

//update user
const updateUsers = async (obj) => {
  try {
    const token = LocalStorageData.getData("user");
    const users = await axios.put(
      `https://66681ccef53957909ff69fee.mockapi.io/users/${token}`,
      obj
    );
    console.log(users);
  } catch (error) {
    showErrorNotification(error, "Failed to Send Message");
  }
};

//form event
const form = document.querySelector("form");
const alertSection = document.querySelector(".alert_section");
alertSection.style.display = "none";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    name: e.target.name.value,
    message: e.target.textarea.value,
  };

  updateUsers(obj);
  alertSection.style.display = "block";

  e.target.name.value = "";
  e.target.email.value = "";
  e.target.textarea.value = "";
});
