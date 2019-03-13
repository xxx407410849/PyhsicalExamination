const jwt = require('jsonwebtoken');


//密钥
const defaltCodeKey = 'lanceot.li';

const JwtToken = (payLoad,codeKey = defaltCodeKey,expiresIn,otherKeyKen = "") => {
    return jwt.sign(payLoad,codeKey + otherKeyKen,{expiresIn: expiresIn});
}
const JwtVerify = (token,codeKey = defaltCodeKey,expiresIn,otherKeyKen = "") => {
    return jwt.verify(token,codeKey + otherKeyKen,(error,decoded)=>{
        if(error){
            console.log(err.message);
        }else console.log(decoded);
    })
}

module.exports = {
    JwtToken,
    JwtVerify
}