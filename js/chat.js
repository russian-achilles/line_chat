$(function(){
  var milkcocoa = new MilkCocoa("yieldjiag7jt5.mlkcca.com");//インスタンスの作成
  var ds = milkcocoa.dataStore("message");//messageデータストアの作成

  /*$(document).ready(function () {
	  hsize = $(window).height();
	  $("body").css("height", hsize + "px");
	});
	$(window).resize(function () {
	  hsize = $(window).height();
	  $("body").css("height", hsize + "px");
	});*/

  //messageデータストアからメッセージを受け取る
  ds.stream().sort("desc").next(function(error,datas){
    datas.forEach(function(data){
      renderMessage(data);
    });
  });

  //messageデータストアへのプッシュを監視
  ds.on("push",function(e){
    renderMessage(e);
  });

  var last_message = "dummy";

  function renderMessage(message) {
    var message_html = '<p class="post-tex">' + escapeHTML(message.value.content) + '</p>';
    var data_html = '';
    if(message.value.data){
      data_html = '<p class="post-date">'+escapeHTML( new Date(message.value.date).toLocaleString())+'</p>';
    }
    /*$("#"+last_message).before('<div id="'+message.id+'" class="post">' + message_html + data_html + '</div>');*/
    $('.clear').before(
      '<div class="message message_left"><div class="message_box"><div class="message_content"><div class="message_text">'
      + message_html +
      '</div></div></div></div>'
    )
    last_message= message.id;
  }

  function post(){//messageデータストアにメッセージをプッシュ
    var content = escapeHTML($('#text_box').val());
    if(content && content !=""){
      ds.push({
        name: "名前",
        content: content,
        data: new Date().getTime()
      }, function(e){});
    }
    $('#text_box').val("");
  }

  $('#send_button').click(function(){
    alert("moving");
    post();//送信ボタンが押された時の処理
  })
  $('#text_box').keydown(function(e){
    if(e.which == 13){
      post();
      return false;
    }
  });
});

//インジェクション対策
function escapeHTML(val){
  return $('<div>').text(val).html();
};
