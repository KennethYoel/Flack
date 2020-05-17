document.addEventListener('DOMContentLoaded', () => {
  // Start by loading first page.
  load_page('first');
  // Set links up to load new page.
  document.querySelectorAll('.channel-link').forEach((link) => {
    link.onclick = () => {
      load_page(link.dataset.page);
      return false;
    };
  });
});

// Renders contents of new page in main view.
function load_page(name) {
  const request = new XMLHttpRequest();
  request.open('GET', `/${name}`);
  request.onload = () => {
    const response = request.responseText;
    document.querySelector('#channel').innerHTML = response;

    // Push state to URL.
    // document.title = name;
    // history.pushState({'title': name, 'text': response}, name, name);
  };
  request.send();
}

// Update text on popping state.
// window.onpopstate = e => {
//   const data = e.state;
//   document.title = data.title;
//   document.getElementById('channel').innerHTML = data.text;
// };
