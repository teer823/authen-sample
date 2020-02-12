const tokenUtil = require('../../utils/token')
const axios = require('axios')

function login (req, res, next) {
  let { email, password } = req.body;

  const accountUrl = `${process.env.ACCOUNT_ENDPOINT}/login`
  axios.post(accountUrl, req.body).then((response) => {
    const user = response.data
    // let name = email.match(/^([^@]*)@/)[1];

    //TODO: GET DATA FROM ACCOUNT SERVER OR EXTERNAL SERVICES

    const refreshExpiresIn = 60*60*24*1 // 1 day
    const access_token = tokenUtil.generateAccessToken(user, 60 * 1); // 15 min
    
    //NOTE : DONT DO THIS!!.. FIND OTHER WAY TO GENERATE DATA FOR REFRESH TOKEN TO VALIDATE LATER, STORE PASSWORD IS BRAINLESS WAY BUT EASY FOR SAMPLE
    const refresh_token = tokenUtil.generateRefreshToken({id: user._id, email, password}, refreshExpiresIn); //1 day
    
    return res.status(200).json({
      type: 'login',
      access_token,
      refresh_token,
      expiresIn : refreshExpiresIn
    })
  }).catch((error) => {
    console.log(error)
    return res.sendStatus(401)
  })
}

function refresh (req, res, next) {
  let token = tokenUtil.extractHeaderToken(req);

  // Step 1 . verify refresh token
  const payload = tokenUtil.verifyRefreshToken(token);
  if(payload) {
    // Step 2 : use Data in payload to get real data & permission
    const accountUrl = `${process.env.ACCOUNT_ENDPOINT}/login`
    axios.post(accountUrl, payload).then((response) => {
      const user = response.data

      //Step3 : Generate new Access Token
      const access_token = tokenUtil.generateAccessToken(user, 60 * 1); // 15 min

      //TODO : Step4 Generate new Refresh Token (Rotating Refresh Token)

      return res.status(200).json({
        type : 'refresh',
        access_token
      })

    }).catch((error) => {
      console.log(error)
      return res.sendStatus(403)
    })
  } else {
    return res.sendStatus(401)
  }
}


function logout(req, res, next) {
  return res.status(200).json({
    type : 'logout'
  })
}

module.exports = {
  login,
  logout,
  refresh
}