const bodyStarter = `<div class="startMessage" id="startMessage">
    <p class="startMessage__Header">Start a Conversation</p>
    <p class="startMessage__body">The team typically replies within minutes</p>
    <button id="startConversationButton">
      <p>New Conversation</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18pt"
        height="18pt"
        viewBox="0 0 64 64"
        style="isolation: isolate"
        id="send"
      >
        <defs>
          <clipPath id="a">
            <rect width="64" height="64" />
          </clipPath>
        </defs>
        <g clip-path="url(#a)">
          <path
            fill="#ecf1fb"
            d=" M 8.216 36.338 L 26.885 32.604 C 28.552 32.271 28.552 31.729 26.885 31.396 L 8.216 27.662 C 7.104 27.44 6.021 26.356 5.799 25.245 L 2.065 6.576 C 1.731 4.908 2.714 4.133 4.259 4.846 L 61.228 31.139 C 62.257 31.614 62.257 32.386 61.228 32.861 L 4.259 59.154 C 2.714 59.867 1.731 59.092 2.065 57.424 L 5.799 38.755 C 6.021 37.644 7.104 36.56 8.216 36.338 Z "
          />
        </g>
      </svg>
    </button>
  </div>`;

const startMessageBox = document.getElementById("startMessage");
const startConversationButton = document.getElementById(
  "startConversationButton"
);
const chatInputDiv = document.getElementById("chatInputDiv");
const sendBtn = document.getElementById("chat__send-btn");
const apiUrl = "https://api.adviceslip.com/advice";
var chatBox;
const chatBody = document.getElementById("chat__body");
const headerPara = document.getElementById("headerPara");

startConversationButton.addEventListener("click", function () {
  console.log("clicked");
  startMessageBox.style.display = "none";
  chatInputDiv.style.display = "block";
  chatBody.style.minHeight = "30vh";
  headerPara.innerHTML = "The team typically replies within minutes";
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("chat__symbol").click();
  document
    .getElementById("chat__symbol")
    .addEventListener("click", function () {
      chatBox = document.getElementById("chat__popup").style.display;
      if (chatBox === "block") {
        document.getElementById("chat__popup").style.display = "none";
        document.getElementById("chat__symbol").innerHTML =
          '<img src="./assests/img/Sparrow Bird.png" alt="" />';

        chatBody.style.minHeight = "0vh";

        headerPara.innerHTML = "Hello Ask Us Anything, Share Your Feedback.";
      } else {
        startMessageBox.style.display = "block";
        
        document.getElementById("chat__popup").style.display = "block";
        document.getElementById("chat__symbol").innerHTML = "<p> X </p> ";
      }
    });

  sendBtn.addEventListener("click", function () {
    var userInput = document.getElementById("chat__input").value;
    displayUserMessage(userInput);
    communicateWithAPI();
  });
  var inputElement = document.getElementById("chat__input");
  inputElement.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      displayUserMessage(inputElement.value);
      communicateWithAPI();
    }
  });

  async function communicateWithAPI(userInput) {
    await fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Data not found");
          } else if (response.status === 500) {
            throw new Error("Server error");
          } else {
            throw new Error("Network response was not ok");
          }
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        var data = data["slip"]["advice"];
        console.log(data);
        displayBotMessage(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function displayUserMessage(message) {
    chatBody.innerHTML +=
      '<div class="displayUserMessage">' + message + "</div>";
    document.getElementById("chat__input").value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function displayBotMessage(message) {
    chatBody.innerHTML +=
      '<div class="botMessageDiv"><div class="displayBotIcon"></div><div class="displayBotMessage">' +
      message +
      "</div></div>";
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});
