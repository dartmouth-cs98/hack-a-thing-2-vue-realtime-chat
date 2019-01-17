const { post } = require("axios")

exports.score = async obj => {
  const resp = await post(process.env.RECAPTCHA_ENDPOINT, {
    secret: process.env.RECAPTCHA_V3_PRIVATE,
    response: obj.token,
    remoteip: obj.ip
  })

  if (!resp.data.success) throw new Error("Invalid recaptcha token")
  obj.token_score = resp.data.score
  delete obj.token
  delete obj.ip
}
