const User = require('./database/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
const authent = require('./authent');

const authouRIzeByIsAdmin = async (user, fxn) => {
  const result = await authent.loginWithEmailPassword(user.email, user.password);

  if(result?.status === 401) return { status: 401 }
  // since authent.loginWithEmailPassword returns either { 401 } || the an object containing the user and token

  // const { user } = result;

  if(!user.is_admin) return fxn({ status: 'access denied' });

  return fxn(result)
}

const authouRIzeByhasToken = async (token, fxn) => {
  const result = await authent.loginWithToken(token);

  if(result.status === 401 ) return { status: 401 };
  // since authent.loginWithToken() returns either a { status: 401 } || the user that has the token

  return fxn(result);
  // call a function with that user that has a token
}

const authouRIzeByhasApikey = async (api, fxn) => {
  const result = await authent.loginWithApi(api);
  if(result === 401 ) return { status: 401 };
  // since authent.loginWithApi() returns either a { status: 401 } of the user with the apikey

  fxn(result);
}

// const authouRIzeByhasToken = async (token, fxn) => {
//   const barer = jwt.verify(token, JWT_PRIVATE_KEY);
//   console.log('this barer', barer);

//   let user = await User.findByPk(barer.barer_id); 

//   if(!user) return { status: 401 }

//   return fxn()
// }

module.exports = {
  authouRIzeByIsAdmin,
  authouRIzeByhasToken,
  authouRIzeByhasApikey
};

/* 
  authenticate
  isloggedin ?
   
  false {
    { 401 }
  }
  true {

  }
 */
