var personForm = document.getElementById("myForm");
var nameInput = personForm.querySelector("input[name='name']");
var ageInput = personForm.querySelector("input[name='age']");
var emailInput = personForm.querySelector("input[name='email']");
var phoneInput = personForm.querySelector("input[name='phone']");
var addressInput = personForm.querySelector("input[name='address']");
var cityInput = personForm.querySelector("input[name='city']");
var countryInput = personForm.querySelector("input[name='country']");
var zipInput = personForm.querySelector("input[name='zip']");

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