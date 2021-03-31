document.getElementById("codeInput").addEventListener("keydown", function(e) {
  if(e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;
    this.value = this.value.substr(0, start) + "    " + this.value.substr(end);
    this.selectionStart = this.selectionEnd + start + 1;
  }
});

function execute() {
  var code = $("#codeInput").val();
  $(".stdout-row").css("display", "none");
  $(".stderr-row").css("display", "none");
  jQuery.post('http://localhost:6001/run', {script: code}, function(data) {
    console.log(data);
    if(data.out) {
      $(".stdout-row").css("display", "flex");
      $("#pStdout").text(data.out);
    }
    if(data.err) {
      $(".stderr-row").css("display", "flex");
      $("#pStderr").text(data.err);
    }
  }).fail(function(xhr, status, error) {
    $(".stderr-row").css("display", "flex");
    $("#pStderr").text("Server error: " + status + " " + error);
  });
}