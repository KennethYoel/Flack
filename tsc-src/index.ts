document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('form').onsubmit = () => {
    // Initialize new request
    const request = new XMLHttpRequest();
    const isbn = document.querySelector('#isbn').value;
    request.open('POST', '/book_review');
    console.log(request);

    // Callback function for when request completes
    request.onload = () => {
      // Extract JSON data from request
      const data = JSON.parse(request.responseText);

      // Update the result paragraph
      if (data.success) {
        const contents = `The average review is ${data.rate_average} for ${isbn}.`;
        document.querySelector('#result').innerHTML = contents;
      } else {
        document.querySelector('#result').innerHTML = 'There was an error.';
      }
    };

    // Add data to send with request
    const data = new FormData();
    data.append('isbn', isbn);

    // Send request
    request.send(data);
    // Stops the page from reloading.
    return false;
  };
});
