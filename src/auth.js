import React from "react";
import ReactDOM from "react-dom";
import Log from "./login";
import Reg from "./register";
import fire from "./fire";
import Cards from "./card";
import Header from "./header";
alert("yes");
var body = document.getElementById("body");
fire.auth().onAuthStateChanged(user => {
    if (document.getElementById("texty")) {
            document.getElementById("texty").remove();
            }
  init();
});


function init() {
  if (fire.auth().currentUser) {
      var username, id;
      fire.database().ref(fire.auth().currentUser.uid).once('value').then(function(snapshot) {
        username = snapshot.val().username;
        id = snapshot.val().database;
         var i, k;
         if (document.getElementById("header") == null) {
      var header = document.createElement("div");
      header.setAttribute("id", "header");
      body.appendChild(header);
    }
    if (document.getElementById("grid") == null) {
      var grid = document.createElement("div");
      grid.setAttribute("id", "grid");
      body.appendChild(grid);
    }
    if (document.getElementById("auth") != null) {
      document.getElementById("auth").remove();
    }
    fire
      .database()
      .ref(id)
      .on("value", function(snapshot) {
        if (snapshot.numChildren()==0&&!document.getElementById("texty") ) {
            var element = document.createElement("h1");
            element.setAttribute("id","texty");
            element.innerHTML = "Click on the '+' button to get started !";
            body.appendChild(element);
                    
        } 
        else { 
            if (document.getElementById("texty")) {
            document.getElementById("texty").remove();
            }
        }
        var base = document.getElementById("grid");
        base.innerHTML = "";
        for (k = 0; k < snapshot.numChildren(); k++) {
          var element = document.createElement("div");
          element.setAttribute("class", "root");
          base.appendChild(element);
        }
        for (i = 0; i < snapshot.numChildren(); i++) {
          var key = Object.keys(snapshot.val())[i];
          var file;
          eval("file = snapshot.val()." + key + ";");
          ReactDOM.render(
            <Cards
              subject={file.subject}
              date={file.date}
              title={file.title}
              description={file.description}
              image={file.image}
              method={file.method}
              id={key}
              database={id}
            />,
            document.getElementsByClassName("root")[i]
          );
        }
      });
        ReactDOM.render(<Header username={username} database={id} />, document.querySelector("#header"));
      });

  } else {
    if (document.getElementById("auth") == null) {
      var auth = document.createElement("div");
      auth.setAttribute("id", "auth");
      body.appendChild(auth);
    }
    if (document.getElementById("grid") != null) {
      document.getElementById("grid").remove();
    }
    if (document.getElementById("header") != null) {
      document.getElementById("header").remove();
    }
    ReactDOM.render(<Log />, document.querySelector("#auth"));
  }
}
init();
