// Template for secondary side-nav.

// Grab the source's.
const channelListSource = document.querySelector('#channel-list').innerHTML;
const createChannelSource = document.querySelector('#channel-cards').innerHTML;
const userListSource = document.querySelector('#users-list').innerHTML;
const respondSource = document.querySelector('#message-sent').innerHTML;
const receivedSource = document.querySelector('#message-received').innerHTML;

// Compile them using Handlebars.
const channelListTemplate = Handlebars.compile(channelListSource);
const createChannelTemplate = Handlebars.compile(createChannelSource);
const userListTemplate = Handlebars.compile(userListSource);
const respondTemplate = Handlebars.compile(respondSource);
const receivedTemplate = Handlebars.compile(receivedSource);

document.addEventListener('DOMContentLoaded', () => {
    // Send user back to login page if they didn't sign in
    // const username = localStorage.getItem('username');
    // if (username == null){
    //     window.location = "/";
    // }

    // Default loaded source to DOM.
    const channelContent = channelListTemplate();
    document.querySelector('#create-lists').innerHTML = channelContent;

    const createChannelPage = createChannelTemplate();
    document.querySelector('#main-view').innerHTML = createChannelPage;

    // Add display none to messenger input form.
    document.querySelector('#messenger-form').style.display = 'none';

    // Sidenav Channel Contents Links
    document.querySelector('#channel-link').onclick = () => {
        // Add channel list source to DOM.
        const listContent = channelListTemplate();
        document.querySelector('#create-lists').innerHTML = listContent;
    };

    // Sidenav Channel Users Links
    document.querySelector('#chat-link').onclick = () => {
        // Add channel list source to DOM.
        const listContent = userListTemplate();
        document.querySelector('#create-lists').innerHTML = listContent;
    };

    // Show messenger input form and hide create channel from main view.
    document.querySelector('#channel1').onclick = () => {
        // Remove the display none css styling.
        document.querySelector('#messenger-form').removeAttribute("style");
        // Add the display none css styling.
        document.querySelector('#join-create-channel').style.display = 'none';
    }

    // Create Channel Contents in Main View
    document.querySelector('#create-channel').onclick = () => {
        // Remove the display none css styling.
        document.querySelector('#join-create-channel').removeAttribute("style");
        // Add display none to messenger input form.
        document.querySelector('#messenger-form').style.display = 'none';
    };

    // Loading websockets rooms/channels.
    // When DOM is loaded, render up to the first 100 posts.
    load();

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {
        document.querySelector('#messenger-form').onsubmit = () => {
        // By default, submit button is disabled
        document.querySelector('#submit-msg').disabled = true;

        // Enable button only if there is text in the input field
        document.querySelector('#userInput').onkeyup = () => {
            if (document.querySelector('#userInput').value.length > 0) {
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
        const chats = document.getElementById('userInput').value;
        console.log(usersname);
        console.log(chats);
        socket.emit('submit chat', {'usersname': usersname, 'timestamp': currentTime, 'chats': chats });

        // Clear input field
        document.querySelector('#userInput').value = '';

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
                const respondedChat = data.chats;
                const respondedTimestamp = data.timestamp;
                const respondedName = data.usersname;
                const chatContent = respondTemplate({respondedNameContent: respondedName, respondedChatContent: respondedChat, respondedTimestamp: respondedTimestamp});
                document.querySelector('#main-view').innerHTML += chatContent;
            }
        }

        if (data.usersname != username) {
            // Add receivers respond chat source to DOM. Use plus equal to generate new template with each click.
            const receivedChat = data.chats;
            const receivedTimestamp = data.timestamp;
            const receivedName = data.usersname;
            const chatContent = receivedTemplate({receivedNameContent: receivedName, receivedChatContent: receivedChat, receivedTimestamp: receivedTimestamp});
            document.querySelector('#main-view').innerHTML += chatContent;
        }
    });

    // If scrolled to bottom, load the next 100 messages.
    // window.onscroll = () => {
    //     console.log('----');
    //     console.log('innerHeight', window.innerHeight);
    //     console.log('scrollY', window.scrollY);
    //     console.log('offsetHeight', document.body.offsetHeight);
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //         load(); 
    //     }
    // };

    // Load next set of messages.
    function load() {
        // Open new request to get new posts.
        const request = new XMLHttpRequest();
        request.open('POST', '/posts');
        request.onload = () => {
            const data = JSON.parse(request.responseText);
            add_post(data);
            const {usersMessages0: {name, messages, timestamp}} = data;
            console.log(data);
            console.log(name, messages, timestamp);
        };
        // Send username to request data.
        const data = new FormData();
        const username = document.querySelector('#submit-msg').dataset.user;
        data.append('name', username);
        // Send request.
        request.send(data);
    }
    // Add a new post with given contents to DOM.
    function add_post(contents) {
        // Retreive username.
        const username = document.querySelector('#submit-msg').dataset.user;
        // Create new post.
        let key;
        for (key in contents) {
            const values = contents[key]
            if (typeof values.name != 'undefined') {
                if (values.name == username) {
                    // Add senders respond chat source to DOM. Use plus equal to generate new template with each click.
                    const respondedName = values.name;
                    const respondedChat = values.messages;
                    const respondedTimestamp = values.timestamp;
                    const chatContent = respondTemplate({respondedNameContent: respondedName, respondedChatContent: respondedChat, respondedTimestamp: respondedTimestamp});
                    document.querySelector('#main-view').innerHTML += chatContent;
                }
            }
            if (values.name != username) {
                // Add receivers respond chat source to DOM. Use plus equal to generate new template with each click.
                const receivedName = values.name;
                const receivedChat = values.messages;
                const receivedTimestamp = values.timestamp;
                const chatContent = receivedTemplate({receivedNameContent: receivedName, receivedChatContent: receivedChat, receivedTimestamp: receivedTimestamp});
                document.querySelector('#main-view').innerHTML += chatContent;
            }      
        }
    }
});