// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {
  $('#new_user').on('submit', function(e) {
    var name = $('#user_name').val();
    e.preventDefault();
    if (name) {
      $.ajax({
        url: '/users',
        type: 'post',
        dataType: 'json',
        data: {user: {name: name}},
      })

      .done(function(data) {
        $('tbody').append(data.user_data);
        $('.users-size').text((parseInt($('.users-size').text()) + 1));
      })

      .fail(function(){
        alert("Can create new user! We got some errors");
      })

    } else {
      alert("Name can be blank")
    }
    return false;
  })

  $('tbody').on('click', '.destroy', function(e) {
    var id = $(this).data('id')
    var childTr = $(this).closest('tr')
    $.ajax({
      url: '/users/' + id,
      type: 'delete'
    })
    .done(function() {
      childTr.hide();
      $('.users-size').text((parseInt($('.users-size').text()) - 1));
    })
    return false;
  })

  $('.search-box').on('keyup', function() {
    var key_name = $(this).val();
    $.ajax({
      url: '/searches',
      type: 'get',
      dataType: 'json',
      data: {name: key_name},
    })

    .done(function(data) {
      $('.user-table').html(data.search_result);
      // console.log(data.search_result)
    })
    return false;
  })
})
