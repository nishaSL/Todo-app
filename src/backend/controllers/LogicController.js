const dbConn = require('../databases/sqlite');
const User = dbConn.Users;

function signup(req,res){
    const {name, email, password} = req.body;
    if(!(name && email && password)){
        return res.render("signup", {
            msg: "Enter all the credentials",
        });
        }
        else{
            User.create({
                name,
                email,
                password,
            })
            .then((result)=>{
                if(result){
                    console.log(result)
                    req.session.email = result.email;
                    req.session.user_Id = result.id;
                    req.session.name = result.name

                    return res.redirect('/')
                }
            })
            .catch((error)=>{
                return res.render('profile', {
                    user: "",
                    msg: "Error occurred"
                });
            });
        }
}

function signin(req,res){
    const { email, password} = req.body;
    if(!(email && password)){
        return res.render('signin',{
            msg: "Invalid Credentials",
        });
    }
    else{
        User.findOne({
            where: {
                email: email,
                password: password,
            },            
        })
        .then((user)=>{
            console.log("user found");
            req.session.name = user.name;
            req.session.user_Id = user.id;
            req.session.email = user.email;
            if(user){
                return res.redirect('/');
            }
        })
        .catch((err)=>{
            console.log('err');
            return res.redirect("/signin")
        });
    }
}

function signout(req,res){
    req.session.destroy();
    res.redirect("/signin");
}


module.exports = {
    signup: signup,
    signin: signin,
    signout: signout,
};