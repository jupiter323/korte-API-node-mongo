$(document).ready(function () {

  $('form').on('submit', function () {

    var name = $('form input[name=name]');//target the input field
    var password = $('form input[name=password]');//target the input field
    var email = $('form input[name=email]');//target the input field
    var userinfo = { email: email.val(), name: name.val(), with:"email", password:password.val()};//store the value of the input in a variable as an object like in todoController

    $.ajax({
      type: 'POST',
      url: '/users',
      data: userinfo,
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      }//get the data and reload page
    });//AJAX: pass data from the variable todo as POST to the route
    return false;
  });//set eventListener on submit

  $('li').on('click', function () {
    var name = $(this).text().replace(/ /g, "-");//store the text of the list item
    $.ajax({
      type: 'DELETE',
      url: '/users/' + name,//send delete to this url
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      }//get the data and reload page
    });//AJAX
  });

});
