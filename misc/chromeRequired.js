var isChrome = navigator.userAgent.indexOf('Chrome/') > -1;
if (!isChrome || navigator.userAgent.match(/Chrome\/(\d+)/)[1] < 15) {
  if (!confirm("This game is designed to run on Chrome 15 and above. It MAY work on other browsers (with missing features) but ideally.. load this in Chrome.")) {
    window.location.href = "http://ludumdare.com/compo/";
  }
}