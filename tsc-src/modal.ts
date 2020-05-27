$(document).ready(function () {
  $('#myModal').modal('show');

  $('#myModal').on('hide.bs.modal', function () {
    const usersname = document.querySelector('#display-name').value;
    // Add data attribute to senders submit button
    document.querySelector('#submit-msg').dataset.user = usersname;
    // Add senders name to chat box
    document.querySelector('#senders-name').innerHTML = usersname;
    // alert('The modal is completely hidden now!');
  })
});
