$(document).ready(function () {
  $('#myModal').modal('show');
  $('#myModal').on('hide.bs.modal', function () {
      // Get username from modal form.
      const usersname = document.querySelector('#display-name').value;
      // Add data attribute with username to senders submit button.
      document.querySelector('#submit-msg').dataset.user = usersname;
      // Add username to top nav.
      document.querySelector('#current-user').innerHTML = usersname;
      // Open request to post username to Flask server
      const request = new XMLHttpRequest();
      request.open('POST', '/');
      // Send username to request data.
      const data = new FormData();
      data.append('nameOfUser', usersname);
      // Send request.
      request.send(data);
      // alert('The modal is completely hidden now!');
  });
});