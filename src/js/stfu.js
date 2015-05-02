var stfu = function() {};

window.onload = function() {

  // Branding
  SVGInjector(document.getElementById('brand'));

  // Themes
  //var themes = ["slate", "peach", "teal", "shore"];
  //document.body.className += " " + themes[Math.floor(Math.random()*themes.length)];

  // Classes
  var transitions = document.querySelectorAll('.transition');
  for(var i = 0; i<transitions.length; i++) {
    transitions[i].className += " t" + (i+1);
  }

  // Show
  document.body.className += " view";
};
