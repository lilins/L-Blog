import $ from 'jquery';

console.log($)

$(document).ready(function () {
  console.log("ready!");
  const id = $('#post-id');
  const title = $('#post-title');
  const author = $('#post-author');
  const content = $('#post-content');
  const api = {
    add: '/api/post/0',
    edit: '/api/post',
    delete: '/api/post',
    comment: {
      add: '/api/comment'
    }
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
    console.log($(event.target), $(event.target).attr('postid'))
    location.href = '/post/' + $(event.target).attr('postid') + '/edit'
  });
  $('#postList').on('click', '.post-delete', function (event) {
    $.ajax({
      url: api.delete + '/' + $(event.target).attr('postid'),
      dataType: 'json',
      method: "DELETE",
      success: function (result) {
        console.log(result)
      }
    });
  });
  $('#comment-add').on('click', function (event) {
    const commentTitle = $('#comment-title').val();
    const commentContent = $('#comment-content').val();
    const postId = $('#comment-add').attr('postId');
    const body = {
      user: '',
      email: '',
      title: commentTitle,
      content: commentContent,
      toUser: author.val(),
      date: '',
      postId: postId
    }
    $.ajax({
      url: api.comment.add,
      dataType: 'json',
      method: "POST",
      data: body,
      success: function (result) {
        console.log(result)
      }
    });
  })
});