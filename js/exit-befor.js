$(function(){
  user_id = window.sessionStorage.getItem('user_id');
  friend_id = window.sessionStorage.getItem('friend_id');
  milkcocoa = new MilkCocoa("yieldjiag7jt5.mlkcca.com");
  name_ds = milkcocoa.dataStore("namelist");
  if(user_id == void 0){
    location.href="login.html";
  }
})
