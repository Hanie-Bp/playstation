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

const checkUser = async () => {
  try {
    const token = LocalStorageData.getData("user");
    if (token) {
      const res = await axios.get(
        `https://66681ccef53957909ff69fee.mockapi.io//users/${token}`
      );

      if (res.status !== 200) {
        window.location.replace("/pages/signin.html");
      }
    } else {
      window.location.replace("/pages/signin.html");
    }
  } catch (error) {
    console.log(error);
  }
};

checkUser();

const updateUsers = async (obj) => {
  try {
    const token = LocalStorageData.getData("user");
    const users = await axios.put(
      `https://66681ccef53957909ff69fee.mockapi.io/users/${token}`,
      obj
    );
    console.log(users);
  } catch (error) {
    alert(error);
  }
};

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  const obj = {
    name: e.target.name.value,
    message: e.target.textarea.value,
  };

  updateUsers(obj);

  alert("thanks for your time");
});
