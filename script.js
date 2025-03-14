const socket = io('http://192.168.0.101:3100');

const List = document.getElementById("messages");
const niknameInput = document.getElementById("niknameInput");
const messagesInput = document.getElementById("messagesInput");
const sendButton = document.getElementById("sendButton");

// sendButton.addEventListener('click', () => {
//    const message = `<b>${niknameInput.value}</b>: ${messagesInput.value}`;
//    socket.emit("chat message", message);
//    messagesInput.value = '';
// });

// socket.on("chat message", (msg) => {
//    const li = document.createElement("li");
//    li.innerHTML = msg; // HTML teglari to‘g‘ri ko‘rinishi uchun innerHTML ishlatamiz
//    document.getElementById("messages").appendChild(li);
// });

// document.addEventListener("keydown", function(evt) {
//    if (evt.key === "Enter") {
//        sendButton.click();
//    }
// });


function sendMessage() {
   const message = `<b>${niknameInput.value}</b>: ${messagesInput.value}`;
   if (messagesInput.value.trim() !== "") {
       socket.emit("chat message", message);
       messagesInput.value = '';
   }
}

sendButton.addEventListener('click', sendMessage);

// Enter tugmachasini bosganda xabar yuborish
messagesInput.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') {
       event.preventDefault(); // Enter tugmachasi yangi qatorga o‘tmasligi uchun
       sendMessage();
   }
});

// Serverdan xabar kelganda ro'yxatga qo'shamiz
socket.on("chat message", (msg) => {
   const li = document.createElement("li");
   li.innerHTML = msg;
   
   // Xabarni kim yuborganini tekshirish
   if (msg.startsWith(`<b>${niknameInput.value}</b>`)) {
       li.classList.add("my-message");  // O'zimiz yuborgan xabar (o'ngda)
   } else {
       li.classList.add("other-message");  // Boshqa odam yuborgan xabar (chapda)
   }

   document.getElementById("messages").appendChild(li);
});
