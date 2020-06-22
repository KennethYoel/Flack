// Template for secondary side-nav.
// Grab the source's.
const channelListSource = document.querySelector('#channel-list').innerHTML;
// const createChannelSource = document.querySelector('#channel-cards').innerHTML;
const userListSource = document.querySelector('#users-list').innerHTML;
const respondSource = document.querySelector('#message-sent').innerHTML;
const receivedSource = document.querySelector('#message-received').innerHTML;
// Compile them using Handlebars.
const channelListTemplate = Handlebars.compile(channelListSource);
// const createChannelTemplate = Handlebars.compile(createChannelSource);
const userListTemplate = Handlebars.compile(userListSource);
const respondTemplate = Handlebars.compile(respondSource);
const receivedTemplate = Handlebars.compile(receivedSource);
document.addEventListener('DOMContentLoaded', () => {
    // Add last loaded source to DOM.
    const channelContent = channelListTemplate();
    document.querySelector('#create-lists').innerHTML = channelContent;
    // const messagesContent = chatListTemplate();
    // document.querySelector('#main-view').innerHTML = messagesContent;
    // Sidenav Channel Contents Links
    document.querySelector('#channel-link').onclick = () => {
        // Add channel list source to DOM.
        const listContent = channelListTemplate();
        document.querySelector('#create-lists').innerHTML = listContent;
    };
    // Create Channel Contents on Main View
    // document.querySelector('#create-channel').onclick = () => {
    //     // Add source to DOM.
    //     const createChannelContent = createChannelTemplate();
    //     document.querySelector('#main-view').innerHTML = createChannelContent;
    // };
    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    // When connected, configure buttons
    socket.on('connect', () => {
        document.querySelector('#messenger-form').onsubmit = () => {
            // By default, submit button is disabled
            document.querySelector('#submit-msg').disabled = true;
            // Enable button only if there is text in the input field
            document.querySelector('#userinput').onkeyup = () => {
                if (document.querySelector('#userinput').value.length > 0) {
                    document.querySelector('#submit-msg').disabled = false;
                }
                else {
                    document.querySelector('#submit-msg').disabled = true;
                }
            };
            // Each submission should emit a "submit chat" event, username, time stamp, and messages.
            const usersname = document.querySelector('#submit-msg').dataset.user;
            const t = new Date();
            const currentTime = t.toLocaleTimeString();
            const chats = document.getElementById('userinput').value;
            console.log(usersname);
            console.log(chats);
            socket.emit('submit chat', { 'usersname': usersname, 'timestamp': currentTime, 'chats': chats });
            // Clear input field
            document.querySelector('#userinput').value = '';
            // Submit button is disabled again
            document.querySelector('#submit-msg').disabled = true;
            return false;
        };
    });
    // When a new message is announced, add to the unordered list
    socket.on('message all', (data) => {
        console.log(data);
        const username = document.querySelector('#submit-msg').dataset.user;
        if (typeof data.usersname != 'undefined') {
            if (data.usersname == username) {
                // Add senders respond chat source to DOM. Use plus equal to generate new template with each click.
                const respondChat = data.chats;
                const respondTimestamp = data.timestamp;
                const respondedName = data.usersname;
                const chatContent = respondTemplate({ respondedNameContent: respondedName, respondedChatContent: respondChat, respondedTimestamp: respondTimestamp });
                document.querySelector('#main-view').innerHTML += chatContent;
            }
        }
        if (data.usersname != username) {
            // Add receivers respond chat source to DOM. Use plus equal to generate new template with each click.
            const receivedChat = data.chats;
            const receivedTimestamp = data.timestamp;
            const receivedName = data.usersname;
            const chatContent = receivedTemplate({ receivedNameContent: receivedName, receivedChatContent: receivedChat, receivedTimestamp: receivedTimestamp });
            document.querySelector('#main-view').innerHTML += chatContent;
        }
    });
});
//# sourceMappingURL=index.js.map