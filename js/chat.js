$(function(){
  var milkcocoa = new MilkCocoa("yieldjiag7jt5.mlkcca.com");//インスタンスの作成
  var ds = milkcocoa.dataStore("message");//messageデータストアの作成
  var to = window.sessionStorage.getItem('friend_id');
  var from = window.sessionStorage.getItem('user_id');

  $(function(){
    $('#time_line').before(//友達と自分の名前を表示
      '<p id="to">'+'お友達：'+window.sessionStorage.getItem('friend_name')+'</p>'
    )
    $('#time_line').before(
      '<p id="from">'+'あなた：'+window.sessionStorage.getItem('user_name')+'</p>'
    )
  })



  //messageデータストアからメッセージを受け取る
  ds.stream().sort("desc").next(function(error,datas){
    datas.forEach(function(data){
      renderMessage(data);
    });
  });

  //messageデータストアへのプッシュを監視
  ds.on("push",function(e){
    renderMessage(e);//データストアへのプッシュが確認されると受信
  });


  function renderMessage(message) {
    var message_html = escapeHTML(message.value.content);
    var data_html = '';
    //console.log(message.value.to);
    //console.log($('.to').text());
    //送信元と送信先の確認
    if((message.value.to == to)&&(message.value.from == from)){
      $('.clear').before(
        '<div class="message message_right"><div class="message_box"><div class="message_content"><div class="message_text">'
        + message_html +
        '</div></div></div></div>'
      )
    }
    else if (message.value.to==from && message.value.from==to) {
      $('.clear').before(
        '<div class="message message_left"><div class="message_box"><div class="message_content"><div class="message_text">'
        + message_html +
        '</div></div></div></div>'
      )
    }
  }

  function post(){//messageデータストアにメッセージをプッシュ
    var content = escapeHTML($('#text_box').val());
    if(content && content !=""){//テキストが入力されている
      ds.push({
        to: to,
        from: from,
        content: content,
        data: new Date().getTime()
      }, function(e){});
    }
    $('#text_box').val("");
  }

  $('#send_button').click(function(){
    //alert("moving");
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
