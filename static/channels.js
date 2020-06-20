// Template for secondary side-nav.
// Grab the source's.
const channelListSource = document.querySelector('#channel-list').innerHTML;
const channelSource = document.querySelector('#chat-list').innerHTML;
// Compile them using Handlebars.
const channelListTemplate = Handlebars.compile(channelListSource);
const channelTemplate = Handlebars.compile(channelSource);
document.addEventListener('DOMContentLoaded', () => {
    // Add source to DOM.
    const listContent = channelListTemplate();
    document.querySelector('#create-lists').innerHTML = listContent;
    const cardsContent = channelTemplate();
    document.querySelector('#main-view').innerHTML = cardsContent;
    document.querySelector('#channel-link').onclick = () => {
        // Add source to DOM.
        const listContent = channelListTemplate();
        document.querySelector('#create-lists').innerHTML = listContent;
        const cardsContent = channelTemplate();
        document.querySelector('#main-view').innerHTML = cardsContent;
    };
});
//# sourceMappingURL=channels.js.map