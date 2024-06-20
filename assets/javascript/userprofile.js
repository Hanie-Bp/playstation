const BASE_URL = "https://66681ccef53957909ff69fee.mockapi.io";

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
    alert(error);
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
    alert(error);
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
    alert("can not submit empty inputs");
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
