document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#form').onsubmit = () => {
        // Connect to websocket.
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
        // When connected, configure buttons
        socket.on('connect', () => {
            // When user click submit, it should emit a "submit message" event.
            const userInput = document.querySelector('#user-input').value;
            socket.emit('submit message', { 'userInput': userInput });
        });
        // When a new message is submitted, the message is showned in the paragraph element.
        // socket.on('chats', (data) => {
        //   document.querySelector('#yes').innerHTML = data.yes;
        //   document.querySelector('#no').innerHTML = data.no;
        //   document.querySelector('#maybe').innerHTML = data.maybe;
        // });
        // When a new message is posted add to the paragraph element.
        socket.on('chats', (data) => {
            document.querySelector('#postedMessage').innerHTML = data.userInput;
        });
        return false;
    };
});
//# sourceMappingURL=index.js.map