// Template for secondary side-nav.
// Grab the source's.
const userSource = document.querySelector('#users-list').innerHTML;
const chatSource = document.querySelector('#chat-list').innerHTML;
// Compile them using Handlebars.
const userListTemplate = Handlebars.compile(userSource);
const chatListTemplate = Handlebars.compile(chatSource);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#chat-link').onclick = () => {
        // Get username.
        //const usersname = document.querySelector('#submit-msg').dataset.user;
        const usersname = "betty";
        // Add source to DOM.
        const userContent = userListTemplate({ contents: usersname });
        document.querySelector('#create-lists').innerHTML = userContent;
        const chatContent = chatListTemplate();
        document.querySelector('#main-view').innerHTML = chatContent;
    };
});
//# sourceMappingURL=users.js.map