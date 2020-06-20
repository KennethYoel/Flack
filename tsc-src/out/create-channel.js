// Template for secondary side-nav.
// Grab the source's.
const createChannelSource = document.querySelector('#channel-cards').innerHTML;
// Compile them using Handlebars.
const template = Handlebars.compile(createChannelSource);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#create-channel').onclick = () => {
        // Add source to DOM.
        const content = template();
        document.querySelector('#main-view').innerHTML = content;
    };
});
//# sourceMappingURL=create-channel.js.map