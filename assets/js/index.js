function getUserinfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: { authorization: localStorage.getItem('token') },
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message)
      layer.msg(res.message)
      renderAvatar(res.data)
    },
  })
}
function renderAvatar(user) {
  const name = user.nickname || user.username
  $('#welcome').html(`欢迎 ${name}`)
  if (user.user_pic) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
getUserinfo()
// 退出登录
$('#btnLogout').click(() => {
    console.log(1);
  layer.confirm('确定退出登录？', { icon: 3, title: '' }, function (index) {
    // 清空本地存储里面的 token
    localStorage.removeItem('token')
    // 重新跳转到登录页面
    location.href = '/login.html'
  })
})
