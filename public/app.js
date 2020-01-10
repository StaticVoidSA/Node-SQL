getComments();

function getComments() {
    $.get('/comments', (data) => {
        if (!data) {
            console.log("No data recieved");
        }
        else {
            console.log("Recieved data:");

            for (var i = 0; i < data.length; i++) {
                console.log(data[i].name + "\t" + data[i].comment);
            }
        }
        showComments(data);
    });
}

function showComments(comments) {
    var commentsSection = document.getElementById("suggestions");
    // Create and populate elements
    for (var i = 0; i < comments.length; i++) {
        var section = document.createElement("section");
        section.className += 'suggestion';
        var heading = document.createElement("h3");
        heading.className += 'user';
        heading.innerHTML = comments[i].name;
        var comment = document.createElement("p");
        comment.className += 'comment';
        comment.innerHTML = comments[i].comment;
        section.appendChild(heading);
        section.appendChild(comment);
        commentsSection.appendChild(section);
    }
} 
