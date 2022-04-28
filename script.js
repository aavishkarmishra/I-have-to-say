var Comments = JSON.parse(localStorage.getItem('Comments'));
if (!Comments) {
  Comments = [];
}
function init() {
  var comments = document.createElement('div');
  var textarea = document.createElement('div');
  var input = document.createElement('textarea');
  var header = document.createElement('h3');
  var btn = document.createElement('button');
  comments.className = 'comments container';
  textarea.className = 'textarea';
  input.className = 'form-control';
  btn.className = 'btn btn-primary';
  comments.id = 'comments';
  input.id = 'text';
  btn.onclick = () => AddComment();
  btn.textContent = 'AddComment';

  header.textContent = 'Comments.....';
  input.placeholder = 'Enter text';
  comments.appendChild(header);
  for (var i = 0; i < Comments.length; i++) {
    comments.appendChild(newComment(Comments[i]));
  }
  textarea.appendChild(input);
  textarea.appendChild(btn);
  document.getElementById('data').appendChild(comments);
  document.getElementById('data').appendChild(textarea);
}

function newComment(data) {
  const { text, likes, replies, idx } = data;
  var comment = document.createElement('div');
  var options = document.createElement('div');
  var reply = document.createElement('div');
  var commentTxt = document.createElement('p');
  var replyBtn = document.createElement('button');
  var likeBtn = document.createElement('button');
  var deleteBtn = document.createElement('button');
  comment.className = 'comment';
  options.className = 'options';
  reply.className = 'reply';
  replyBtn.className = 'btn btn-primary addReply';
  likeBtn.className = 'btn btn-info position-relative like';
  deleteBtn.className = 'btn btn-primary delete';

  comment.id = 'comment' + idx;
  reply.id = 'reply' + idx;

  commentTxt.innerHTML = '<p><span class="span">--></span>' + text + '</p>';

  replyBtn.onclick = () => addTextarea(idx);
  likeBtn.onclick = () => upVote(idx);
  deleteBtn.onclick = () => Delete(idx);

  replyBtn.innerHTML = 'Reply';
  likeBtn.innerHTML = 'Upvote<span id="likeCount' + idx + '" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> ' + likes + ' </span>';
  deleteBtn.innerHTML = 'Delete';
  options.appendChild(likeBtn);
  options.appendChild(replyBtn);
  options.appendChild(deleteBtn);

  replies.forEach((ele) => {
    var replyTxt = document.createElement('p');
    replyTxt.innerHTML = '<p><span class="span">-->></span>' + ele + '</p>';
    reply.appendChild(replyTxt);
  });

  comment.appendChild(commentTxt);
  comment.appendChild(options);
  comment.appendChild(reply);

  return comment;
}

function AddComment() {
  var text = document.getElementById('text').value;
  document.getElementById('text').value = '';
  if (text != '') {
    var idx = Comments.length ? Comments[Comments.length - 1].idx + 1 : 0;
    const data = { idx: idx, text: text, likes: 0, replies: [] };
    Comments.push(data);
    document.getElementById('comments').appendChild(newComment(data));
  }
  localStorage.setItem('Comments', JSON.stringify(Comments));
}
function upVote(idx) {
  var val = parseInt(document.getElementById('likeCount' + idx).innerHTML);
  document.getElementById('likeCount' + idx).innerHTML = val + 1;
  for (var i = 0; i < Comments.length; i++) {
    if (Comments[i].idx === idx) {
      Comments[i].likes++;
      break;
    }
  }
  localStorage.setItem('Comments', JSON.stringify(Comments));
}
function newReply(idx) {
  var text = document.getElementById('replytext').value;
  if (text != '') {
    var reply = document.getElementById('reply' + idx);
    var p = document.createElement('p');
    p.innerHTML = '<p><span class="span">-->></span>' + text + '</p>';
    reply.appendChild(p);
    for (var i = 0; i < Comments.length; i++) {
      if (Comments[i].idx === idx) {
        Comments[i].replies.push(text);
        break;
      }
    }
    removeTextArea();
  }
  localStorage.setItem('Comments', JSON.stringify(Comments));
}
function Delete(idx) {
  document.getElementById('comment' + idx).remove();
  Comments = Comments.filter((ele) => {
    return ele.idx != idx;
  });
  localStorage.setItem('Comments', JSON.stringify(Comments));
}
function addTextarea(idx) {
  var reply = document.getElementById('reply' + idx);
  var textArea = document.createElement('div');
  textArea.id = 'textarea';
  textArea.className = 'textarea';
  textArea.innerHTML = '<textarea class="form-control" id="replytext" rows="3" placeholder="Enter text"></textarea><button type="button" class="btn btn-primary" onclick="newReply(' + idx + ')" >Post</button><button type="button" class="btn btn-primary" onclick="removeTextArea()">Cancel</button>';
  reply.appendChild(textArea);
}
function removeTextArea() {
  document.getElementById('textarea').remove();
}
init();
