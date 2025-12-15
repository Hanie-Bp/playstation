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

const form = document.querySelector("form");
//putting old information
const putUsers = async () => {
  try {
    const idUser = LocalStorageData.getData("user");
    const { data } = await axios.get(
      `https://66681ccef53957909ff69fee.mockapi.io/users/${idUser}`
    );
    console.log(data);
    console.log(form.email);
    form.email.value = data.email;
    if (data.name) {
      form.name.value = data.name;
    }
  } catch (error) {
    showErrorNotification(error, "Failed to Load User Data");
  }
};

putUsers();

//update new information
const updateUsers = async (obj) => {
  try {
    const idUser = LocalStorageData.getData("user");
    const users = await axios.put(
      `https://66681ccef53957909ff69fee.mockapi.io/users/${idUser}`,
      obj
    );
    console.log(users);
  } catch (error) {
    showErrorNotification(error, "Failed to Update Profile");
  }
};

const alertSection = document.querySelector(".alert_section");
alertSection.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const namePerson = e.target.name.value;
  const emailPerson = e.target.email.value;
  const dateOfBirthPerson = e.target.date.value;
  const agePerson = e.target.age.value;
  const bioPerson = e.target.bio.value;

  if (
    namePerson === "" ||
    emailPerson === "" ||
    dateOfBirthPerson === "" ||
    agePerson === "" ||
    bioPerson === ""
  ) {
    showErrorNotification("Please fill in all fields", "Validation Error");
    return;
  }

  const obj = {
    name: namePerson,
    email: emailPerson,
    birth: dateOfBirthPerson,
    age: agePerson,
    bio: bioPerson,
  };

  updateUsers(obj);
  alertSection.style.display = "block";

  e.target.name.value = "";
  e.target.email.value = "";
  e.target.textarea.value = "";
  e.target.date.value = "";
  e.target.age.value = "";
});
