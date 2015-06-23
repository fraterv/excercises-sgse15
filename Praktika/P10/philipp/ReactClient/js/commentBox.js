var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
          <h1>Comments</h1>
          <CommentList></CommentList>
          <CommentForm></CommentForm>
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
);
