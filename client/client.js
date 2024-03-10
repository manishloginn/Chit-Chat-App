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
        time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})
    };
    socket.emit('sendingMsgEvent', data);
    rendermsg(data, "SENT")
})


function removeElement() {
    const myMsg = document.querySelector(".sent");
    myMsg.addEventListener('dblclick', (e) => {
         e.target.remove()
    });
}


function rendermsg(data, typeOfMsg) {
    const msgdiv = document.createElement("div");
    const span = document.createElement("span");
    const paragraph = document.createElement("p");
    paragraph.innerText = `${data.username} : ${data.message} `
    span.innerText = data.time;
    if (typeOfMsg == 'SENT') {
        msgdiv.setAttribute('class', 'message sent') 
    } else {
        msgdiv.setAttribute('class', 'message reciev') 
    }
    msgdiv.appendChild(paragraph);
    msgdiv.appendChild(span);
    messagecontainerr.appendChild(msgdiv);
    msgInput.value = "";
    removeElement()
}

socket.on('spreadmsg', data => {
    if (socket.id !== data.id) {
        rendermsg(data, "recieved");
    }
})

