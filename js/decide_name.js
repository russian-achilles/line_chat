$(function(){
  var milkcocoa = new MilkCocoa("yieldjiag7jt5.mlkcca.com");//インスタンスの作成
  var name_ds = milkcocoa.dataStore("namelist");//名前管理用のデータベース作成
  //user_name;
  //user_id;
  //alert("checked");
  function regist(){
    user_name = escapeHTML($('#user_name').val());
    user_id = escapeHTML($('#user_id').val());
    name_ds.get(user_id,function(err, datum){
      //alert("checked")
      if(datum){
        alert("このIDは既に使われています")
        //console.log(datum);
      }
      else {
        name_ds.set(user_id,{'name':name});
        alert("登録されました")
        console.log(err);
        console.log(datum);
        alert("ok");
        window.location.href = "serch.html";
        //ページ遷移
      }
    });
  }
  function login_user(){
    user_name = escapeHTML($('#login_name').val());
    user_id = escapeHTML($('#login_id').val());
    name_ds.get(user_id,function(err, datum){
      //alert("checked")
      if(datum){
        //alert("このIDは既に使われています")
        console.log(datum);
        if(datum.value.name==user_name){
          console.log(datum);
          alert("ログインできました");
          window.location.href = "serch.html";
        }
        else{
          alert("ユーザ名かIDが間違っています");
        }
      }
      else {
        //name_ds.set(user_id,{'name':name});
        //alert("登録されました")
        alert("ユーザ名かIDが間違っています");
        console.log(err);
        //ページ遷移
      }
    });
  }
    /*name_ds.push({
      user_name: user_name,
      user_id: user_id
    }, function(e){})*/
  $('#regist_button').click(function(){
    //alert("click");
    regist();
    //alert("click");
  });
  $('#login_button').click(function(){
    login_user();
  });
});

//インジェクション対策
function escapeHTML(val){
  return $('<div>').text(val).html();
};
