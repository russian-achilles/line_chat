$(function(){
  user_id = window.sessionStorage.getItem('user_id');
  friend_id = window.sessionStorage.getItem('friend_id');
  milkcocoa = new MilkCocoa("yieldjiag7jt5.mlkcca.com");
  name_ds = milkcocoa.dataStore("namelist");
  if(user_id == void 0){
    location.href="login.html";
  }
  else if (friend_id == void 0) {
    location.href="login.html";
  }
  name_ds.get(user_id,function(err, datum){
    if(err){
      location.href="login.html";
    }
  })
  name_ds.get(friend_id,function(err,datum){
    if(err){
      location.href="serch.html";
    }
  })
})
