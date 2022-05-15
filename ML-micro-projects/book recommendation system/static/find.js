const input = document.querySelector(".finder__input");
const finder = document.querySelector(".finder");
const form = document.querySelector("form");

input.addEventListener("focus", () => {
  finder.classList.add("active");
});

input.addEventListener("blur", () => {
  if (input.value.length === 0) {
    finder.classList.remove("active");
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  finder.classList.add("processing");
  finder.classList.remove("active");
  input.disabled = true;
  setTimeout(() => {
    finder.classList.remove("processing");
    input.disabled = false;
    if (input.value.length > 0) {
      finder.classList.add("active");
    }
  }, 1000);
});

// autocomplete using jquery

$(function() {
  $("#search").autocomplete({
      source : function(request, response) {
          $.ajax({
              type: "POST",
              url : "http://localhost:5000/search",
              dataType : "json",
              cache: false,
              data : {
                  q : request.term
              },
              success : function(data) {
                  console.log(data);
                  const results = document.getElementById("search-results");
                  results.innerHTML = "";
                  loadsuggestions(data);
                  Managelikes();
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log(textStatus + " " + errorThrown);
              }
          });
      },
      minLength : 2
  });
});
//hover hide card



// Render the suggestions
const loadsuggestions = (data) => {
  const results = document.getElementById("search-results");
  const suggestions = []

  data.forEach((item) => {
    const obj = makecard();
    const card = beautifycard(obj, item);
    results.appendChild(card);
  });

  suggestions.forEach((item) => {
    // results.appendChild(item);
    
  });

};

const makecard = () => {
  const card = document.createElement("div");
  const a = document.createElement("a");
  const imgBx = document.createElement("div");
  const img = document.createElement("img");
  const content = document.createElement("div");
  const contentBx = document.createElement("div");
  const title = document.createElement("h3");
  const br = document.createElement("br");
  const span = document.createElement("span");
  const id = document.createElement("h6");
  const like = document.createElement("div");
  return {card, a, imgBx, img, content, contentBx, title, br, span, id, like};
};

const beautifycard = (obj, item) => {
  const {card, a, imgBx, img, content, contentBx, title, br, span, id, like} = obj;
  
  card.className="card";
  a.href = item.url;
  a.setAttribute("target", "_blank");
  imgBx.className="imgBx";
  img.src = item.cover;
  img.alt = item.title;
  img.className="book-cover";
  content.className="content";
  contentBx.className="contentBx";
  title.textContent = item.title;
  span.textContent = item.author;
  id.className="id";
  id.setAttribute("hidden", true);
  id.textContent = item.book_id;
  like.classList.add("like","unliked");
  imgBx.appendChild(img);
  title.appendChild(br);
  title.appendChild(span);
  contentBx.appendChild(title);
  contentBx.appendChild(id);
  content.appendChild(contentBx);
  content.appendChild(like);
  a.appendChild(imgBx);
  a.appendChild(content);
  card.appendChild(a);
  return card;
}

// Like the book

const Managelikes = () => {
  const likes = document.querySelectorAll(".like");
  likes.forEach((item) => {

    item.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.target.classList.toggle("unliked");
      ev.target.classList.toggle("liked");
      if (ev.target.classList.contains("liked")) {
        console.log("liked");
        favlogfunc(ev.target);
      } else {
        console.log("unliked");
        unfavlogfunc(ev.target);
      }
    });
  });
}

const favlogfunc = (item) => {
  const parent = item.parentElement;
  // const title = parent.querySelector("h3").textContent.split("-")[1].trim();
  const id = parent.querySelector(".id").textContent;
  $.ajax({
    type: "POST",
    url : "http://localhost:5000/like",
    dataType : "json",
    cache: false,
    data : {
      id: id,
    },
    success : function(data) {
      console.log("added to favs");
    }
  });
}

const unfavlogfunc = (item) => {
  const parent = item.parentElement;
  // const title = parent.querySelector("h3").textContent.split("-")[1].trim();
  const id = parent.querySelector(".id").textContent;
  $.ajax({
    type: "POST",
    url : "http://localhost:5000/unlike",
    dataType : "json",
    cache: false,
    data : {
      id: id,
    },
    success : function(data) {
      console.log("removed from favs");
    }
  });
}
