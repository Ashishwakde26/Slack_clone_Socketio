const joinRoom = async (roomTitle, namespaceId) => {
    console.log(roomTitle, namespaceId);
    const ackResp = await nameSpaceSockets[namespaceId].emitWithAck('joinRoom',roomTitle)
        //curr-room-num-users
        //Users <span class="fa-solid fa-user">
        document.querySelector('.curr-room-num-users').innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user">`
        //curr-room-text
        document.querySelector('.curr-room-text').innerHTML = roomTitle

}