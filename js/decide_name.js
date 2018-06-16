$(function(){
  var milkcocoa = new MilkCocoa("yieldjiag7jt5.mlkcca.com");//インスタンスの作成
  var name_ds = milkcocoa.dataStore("namelist");//名前管理用のデータベース作成
  function regist(){//ユーザー名とIDを保持
    user_name = escapeHTML($('#user_name').val());
    user_id = escapeHTML($('#user_id').val());
    if(user_id==""){
      alert("IDが空欄です")
    }
    else{
      name_ds.get(user_id,function(err, datum){
        if(datum){//データベースからIDを検索
          alert("このIDは既に使われています")
        }
        else {
          name_ds.set(user_id,{'name':user_name});
          window.sessionStorage.setItem("user_id",user_id);
          window.sessionStorage.setItem("user_name",user_name);
          alert("登録されました")
          window.location.href = "serch.html";
          //ページ遷移
        }
      });
    }
  }
  function login_user(){
    user_name = escapeHTML($('#login_name').val());//ユーザー名とIDを保持
    user_id = escapeHTML($('#login_id').val());
    name_ds.get(user_id,function(err, datum){//データベースからIDを検索
      if(datum){
        if(datum.value.name==user_name){//ユーザー名が一致することの確認
          window.sessionStorage.setItem("user_id",user_id);
          window.sessionStorage.setItem("user_name",user_name);
          alert("ログインできました");
          window.location.href = "serch.html";
        }
        else{
          alert("ユーザー名かIDが間違っています");
        }
      }
      else {
        alert("ユーザー名かIDが間違っています");
      }
    });
  }
  function serch_user(){
    friend_id = escapeHTML($('#friend_id').val());//入力されたIDを保持
    user_name=window.sessionStorage.getItem('user_name')
    user_id=window.sessionStorage.getItem('user_id')
    name_ds.get(friend_id,function(err,datum){//IDをデータベースから検索
      if(datum){//IDが登録ずみである場合の処理
        if(friend_id != user_id){//自信のIDではないかの確認
          alert("ユーザーが見つかりました");
          window.sessionStorage.setItem("friend_id",friend_id);
          window.sessionStorage.setItem("friend_name",datum.value.name);
          window.location.href = "index.html";
        }
        else{
          alert("IDが違います");
        }
      }
      else {
        alert("お友達が見つかりません")
      }
    })
  }

  $('#regist_button').click(function(){//登録ボタンが押された時の関数
    regist();
  });
  $('#login_button').click(function(){//ログインボタンが押された時の関数
    login_user();
  });
  $('#serch_button').click(function(){//検索ボタンが押された時の関数
    serch_user();
  });
});

//インジェクション対策
function escapeHTML(val){
  return $('<div>').text(val).html();
};
