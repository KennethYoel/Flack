document.addEventListener('DOMContentLoaded', () => {
  // Start by loading first page.
  document.querySelector('#username_form').onsubmit = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/username');
    request.onload = () => {
      const response = request.responseText;
      console.log(response);
      document.querySelector('#submit_name').dataset.user = response;
    };
    request.send();
  };
});
