const socket = io();

const form = document.getElementById('send-container')

const msgInput = document.getElementById('message-input')
const messagecontainerr = document.querySelector('.message-containerr')

const sendButton = document.getElementById('send-button');
let username = prompt('name');

sendButton.addEventListener('click', (e)=> {
    e.preventDefault();
    if (!msgInput.value) {
       return msgInput.focus()
    }
    
    let data = {
        id: socket.id,
        username : username,
        message : msgInput.value,
        time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})
    };
    socket.emit('sendingMsgEvent', data);
    rendermsg(data, "SENT")
})





function rendermsg(data, typeOfMsg) {
    const msgdiv = document.createElement("div");
    const paragraph = document.createElement("span");
    const time = document.createElement("span");
    time.innerText = `${data.time} `;
    const iconElement = document.createElement("span");
    iconElement.setAttribute ("class", "material-symbols-outlined");
    iconElement.setAttribute("id", "icon")
    iconElement.textContent = 'expand_more';
    const buttondiv = document.createElement("div");
    const divbutton = document.createElement("button");
    divbutton.innerText = "Delete"
    divbutton.setAttribute("class", "deletebutton");


    if (typeOfMsg == 'SENT') {
        msgdiv.setAttribute('class', 'message sent') 
        buttondiv.setAttribute('class', 'none sent')
        paragraph.innerText = `${data.message} `;
        paragraph.setAttribute("class", "textmessage")
    } else {
        msgdiv.setAttribute('class', 'message reciev');
        buttondiv.setAttribute('class', 'none reciev');
        paragraph.setAttribute("class", "textmessage");
        paragraph.innerText = ` ${data.username} : ${data.message} `
    }
    buttondiv.appendChild(divbutton);
    msgdiv.appendChild(buttondiv);
    msgdiv.appendChild(paragraph);
    paragraph.appendChild(time);
    paragraph.appendChild(iconElement);
    messagecontainerr.appendChild(msgdiv);
    msgInput.value = "";
    
    const icon = iconElement;
    icon.addEventListener('click', ()=> {
        buttondiv.classList.toggle('none');
        buttondiv.classList.toggle('show');
    })

    const deletebuttons = document.querySelectorAll(".deletebutton"); 
     
    deletebuttons.forEach(deletebutton => {
        deletebutton.addEventListener('click', (e)=> {
            const messageElement = e.target.parentNode.nextElementSibling; 
            messageElement.setAttribute("class", "messageElement")
            messageElement.innerText = "Message Deleted...!"
            buttondiv.classList.remove('show');
            buttondiv.classList.add('none');
        })
    })

}

socket.on('spreadmsg', data => {
    if (socket.id !== data.id) {
        rendermsg(data, "recieved");
    }
})

