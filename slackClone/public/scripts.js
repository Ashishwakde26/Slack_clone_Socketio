//const UserName = prompt("What is your username");
//const passWord = prompt("What is your password");

const UserName = "Rob";
const password = "x";



const socket = io('http://localhost:9000')
// const socket1 = io('http://localhost:9000/wiki')
// const socket2 = io('http://localhost:9000/mozilla')
// const socket3 = io('http://localhost:9000/linux')


let nameSpaceSockets = [];
let listeners = {
    nsChange: [],
}


const addListeners = (nsId) => {
    if(!listeners.nsChange[nsId]) {
        nameSpaceSockets[nsId].on('nsChange',(data) => {
            console.log("Namespace Changed!")
            console.log(data)
        })

        listeners.nsChange[nsId] = true;
    }
}

socket.on('connect', () => {
    console.log("Connected");
    socket.emit('clientConnect');
})

socket.on('Welcome', (data) => {
    console.log(data);
})

socket.on('nsList', (nsData) => {
    console.log(nsData);
    const nameSpacesDiv = document.querySelector('.namespaces');
    nameSpacesDiv.innerHTML = "";
    nsData.forEach((ns) => {
        nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>` 
    
    let thisNs = nameSpaceSockets[ns.id]

    if(!nameSpaceSockets[ns.id]) {
     thisNs = io(`http://localhost:9000${ns.endpoint}`)
    }
    
    nameSpaceSockets[ns.id] = thisNs;

    addListeners(ns.id);

    // thisNs.on('nsChange', (data) => {
    //     console.log("Namespace Changed!")
    //     console.log(data)
    // })

})

    Array.from(document.getElementsByClassName('namespace')).forEach(element => {
        console.log(element)
        element.addEventListener('click', e=> {
            joinNs(element,nsData)
        })

        joinNs(document.getElementsByClassName('namespace')[0],nsData)

    })
})
