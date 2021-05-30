const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const Location = search.value;

  console.log(Location);
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + Location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
      });
    }
  );
});
