$(document).ready(function () {
  console.log("ready!");
  const id = $('#post-id');
  const title = $('#post-title');
  const author = $('#post-author');
  const content = $('#post-content');
  const api = {
    add: '/api/post',
    edit: '/api/post',
    delete: '/api/post'
  }
  $('#post-add').on('click', function () {
    const body = {
      title: title.val(),
      author: author.val(),
      content: content.val()
    }
    $.ajax({
      url: api.add,
      dataType: 'json',
      method: "POST",
      data: body,
      success: function (result) {
        console.log(result)
      }
    });
  });
  $('#post-update').on('click', function () {
    const body = {
      id: id.val(),
      title: title.val(),
      author: author.val(),
      content: content.val()
    }
    $.ajax({
      url: api.edit + '/' + id.val(),
      dataType: 'json',
      method: "PUT",
      data: body,
      success: function (result) {
        console.log(result)
      }
    });
  });
  $('#postList').on('click', '.post-edit', function (event) {
    console.log($(event.target).attr('id'))
    location.href = '/post/'+$(event.target).attr('id') + '/edit'
  });
  $('#postList').on('click', '.post-delete', function (event) {
    console.log($(event.target).attr('id'))
    $.ajax({
      url: api.delete + '/' + $(event.target).attr('id'),
      dataType: 'json',
      method: "DELETE",
      success: function (result) {
        console.log(result)
      }
    });
  })
});