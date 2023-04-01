import jwt_decode from "jwt-decode";

const GetUserInfo = (token) => {
    var user = jwt_decode(token);
    user = { name: user.name, id: user.nameid, email: user.email };
    return user;
};

export default {
    GetUserInfo
};