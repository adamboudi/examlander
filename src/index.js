import React from "react";
import ReactDOM from "react-dom";
import Log from "./login";
import Reg from "./register";
import fire from "./fire";
import Cards from "./card2";
import Header from "./header";
import Search from "./search";
import Mess from "./alert";

var body = document.getElementById("body");
var hey = document.createElement("div");
        hey.setAttribute("id", "message");
        document.getElementById("body").appendChild(hey);
        ReactDOM.render(<Mess  message="It is just an example. Click on the search icon!" />, document.querySelector('#message'));
var i,k;
    fire
      .database()
      .ref("DX-SKK323223")
      .on("value", function(snapshot) {
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
              method={file.method}
              id={key}
              database="DX-SKK323223"
            />,
            document.getElementsByClassName("root")[i]
          );
        }
      });
window.onresize = function(event) {
            pad();
        }
        function pad() {
            var size = window.innerWidth || document.body.clientWidth;
            if (600<size) {
            document.getElementById("grid").style.paddingTop = 250;
            } else if (500<size && size<600) {
            document.getElementById("grid").style.paddingTop = 130;
            } else if (400<size && size<500) {
            document.getElementById("grid").style.paddingTop = 130;
            }
        } pad();
document.getElementById("button").onclick = function() {var hey = document.createElement("div");
        hey.setAttribute("id", "search");
        document.getElementById("body").appendChild(hey);
              ReactDOM.render(<Search  />, document.querySelector('#search'));
                                                       }

   function update(b) {
    var body = document.getElementById("body");
       
var i,k;
    fire
      .database()
      .ref(b)
      .on("value", function(snapshot) {
        if (snapshot.exists()){
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
              method={file.method}
              id={key}
              database={b}
            />,
            document.getElementsByClassName("root")[i]
          );
        }
    } else {
        var hey = document.createElement("div");
        hey.setAttribute("id", "message");
        document.getElementById("body").appendChild(hey);
        ReactDOM.render(<Mess  message="Invalid ID !" />, document.querySelector('#message'));}
      });
}
export {update};