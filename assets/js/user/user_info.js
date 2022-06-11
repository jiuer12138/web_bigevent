$(() => {
  const form = layui.form
  //自定义检测
  form.verify({
    nickname: (value) => {
      if (value.length > 6) return '昵称长度不能超过6位'
    },
  })

  const initUserInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        //给表单赋值
        form.val('formUserInfo', res.data)
      },
    })
  }
  $('#btnReset').click((e) => {
    e.preventDefault()
    initUserInfo()
  })

  //通知父页面 更新用户信息
  $('.layui-form').on('submit', (e) => {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $('.layui-form').serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新用户信息失败！')
        layer.msg('更新用户信息成功！')
        // 调用父页面渲染函数
        window.parent.getUserInfo()
      },
    })
  })

  initUserInfo()
})
