$(() => {
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  const form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: (val) => {
      const pwd = $('.reg-box [name=password').val()
      if (val !== pwd) return '两次密码不一致'
    },
  })
  // const baseUrl = 'http://www.liulongbin.top:3007'
  $('#form_reg').submit((e) => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username').val(),
        password: $('.reg-box [name=password').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        $('#link_login').click()
        $('#form_login [name=username]').val(
          $('#form_reg [name=username]').val()
        )
        $('#form_login [name=password]').val(
          $('#form_reg [name=password]').val()
        )
      },
    })
  })
  $('#form_login').submit(function (e) {
    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data,
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      },
    })
  })
})
