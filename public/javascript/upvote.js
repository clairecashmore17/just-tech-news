// function to upvote on a post
async function upvoteClickHandler(event) {
  event.preventDefault();

  // we are going to need the post_id in order know where the upvote goes to ->
  // We can use the url and split it into an array separated by / and take the last element
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(id);
  const response = await fetch("/api/posts/upvote", {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".upvote-btn")
  .addEventListener("click", upvoteClickHandler);
