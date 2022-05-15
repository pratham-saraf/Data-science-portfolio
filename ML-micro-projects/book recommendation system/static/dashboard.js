const Managelikes = () => {
    const likes = document.querySelectorAll(".like");
    likes.forEach((item) => {
      item.addEventListener("click", (ev) => {
        ev.target.classList.toggle("unliked");
        ev.target.classList.toggle("liked");
        if (ev.target.classList.contains("liked")) {
          console.log("liked");
          favlogfunc(ev.target);
        } else {
          unfavlogfunc(ev.target);
        }
      });
    });
  }
  
  const favlogfunc = (item) => {
    const parent = item.parentElement;
    const id = parent.querySelector(".id").textContent;
    $.ajax({
      type: "POST",
      url : "http://localhost:5000/like",
      cache: false,
      data : {
        id: id,
      },
      success : function(data) {
        console.log("added to favs");

      },
      error : function(data) {
        console.log("error");
        $("#search-results").load(" #search-results");
      }
    });
    
  }
  
  const unfavlogfunc = (item) => {
    const parent = item.parentElement;
    const id = parent.querySelector(".id").textContent;
    $.ajax({
      type: "POST",
      url : "http://localhost:5000/unlike",
      cache: false,
      data : {
        id: id,
      },
      success : function(data) {
        console.log("removed from favs");
        $("#search-results").load(" #search-results");
      },
      error : function(data) {
        console.log("error");
        
      }
    });
  }

  Managelikes();