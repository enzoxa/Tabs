const personForm = document.getElementById("myForm");
const nameInput = personForm.querySelector("input[name='name']");
const ageInput = personForm.querySelector("input[name='age']");
const emailInput = personForm.querySelector("input[name='email']");
const phoneInput = personForm.querySelector("input[name='phone']");
const addressInput = personForm.querySelector("input[name='address']");
const cityInput = personForm.querySelector("input[name='city']");
const countryInput = personForm.querySelector("input[name='country']");
const zipInput = personForm.querySelector("input[name='zip']");

personForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameText = nameInput.value;
  
    const personData = {
        name: nameInput.value,
        age: ageInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
        city: cityInput.value,
        country: countryInput.value,
        zip: zipInput.value
      };

      let json = JSON.stringify(personData);
      console.log(json);
      console.log(JSON.parse(json));
  });