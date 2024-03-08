const socket = io();

const form = document.getElementById('send-container')

const msgInput = document.getElementById('message-input')
const messagecontainerr = document.querySelector('.message-containerr')

const sendButton = document.getElementById('send-button');
let username = prompt('name');

sendButton.addEventListener('click', (e)=> {
    e.preventDefault();
    let data = {
        id: socket.id,
        username : username,
        message : msgInput.value,
    };
    socket.emit('sendingMsgEvent', data);
    rendermsg(data, "SENT")
  
})

function rendermsg(data, typeOfMsg) {
    const msgdiv = document.createElement("div");
    msgdiv.innerText = `${data.username} : ${data.message}`
    if (typeOfMsg == 'SENT') {
        msgdiv.setAttribute('class', 'message sent') 
    } else {
        msgdiv.setAttribute('class', 'message reciev') 
    }
    messagecontainerr.appendChild(msgdiv);
    msgInput.value = "";
}

socket.on('spreadmsg', data => {
    if (socket.id !== data.id) {
        rendermsg(data, "recieved");
    }
})

