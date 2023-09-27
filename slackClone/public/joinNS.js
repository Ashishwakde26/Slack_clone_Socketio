
const joinNs = (element, nsData) => {

    const nsEndpoint = element.getAttribute('ns');
            console.log(nsEndpoint)

            const clickedNs = nsData.find(row => row.endpoint === nsEndpoint);
            const rooms = clickedNs.rooms

            selectedNsId = clickedNs.id;

            let roomList = document.querySelector('.room-list');
            roomList.innerHTML = ""

            let firstroom;

            rooms.forEach((room, i) => {

                if(i === 0) {
                    firstroom = room.roomTitle;
                }
                roomList.innerHTML += `<li class="room" namespaceid=${room.namespaceId}>
                <span class="glyphicon glyphicon-lock"></span>
                ${room.roomTitle}</li>`
    })

    joinRoom(firstroom, clickedNs.id)

    const roomNodes = document.querySelectorAll('.room')
    Array.from(roomNodes).forEach(elem => {
        elem.addEventListener('click', e=> {
            console.log("Someone clicked on: "+ e.target.innerText)
            const namespaceId = elem.getAttribute('namespaceid')  
            joinRoom(e.target.innerText, namespaceId)
        })
    })

}