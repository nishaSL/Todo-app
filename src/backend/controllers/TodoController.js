const dbConn = require('../databases/sqlite');
const ToDo = dbConn.Lists;

function add(req,res){
    ToDo.create({
        user_id: req.session.user_Id,
        item: req.body.item,
        edit: false,
        done: "no",
    })
    .then((todo)=>{
        if(todo){
            res.redirect('/');
        }
    })
    .catch((err)=>{
        console.log("task not added", err);
        res.redirect('/');
    });
}

function fetchall(req,res){
    if(req.session.user_Id){
        ToDo.findAll({
            where: {
                user_Id: req.session.user_Id
            },
            raw: true,
        })
        .then((todolist)=>{
            res.render('profile', {
                username: req.session.name,
                items: todolist
            });
        })
        .catch((err)=>{
            console.log(err)
            res.redirect('/signin');
        });
     }
     else{
        res.redirect('/signin');
     }
}

function editTodo(req,res){
    ToDo.findOne({
        where: {
            id: req.body.taskId,
        },
    })
    .then((items)=>{
        console.log(items);
        items.item = req.body.editedTask;
        items.edit = true;
        items.save();
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err)
        res.redirect('/');
    });
}

function deletetodo(req,res){
  ToDo.destroy({
      where: {
          id: req.body.taskId
      },
  })
  .then(()=>{
   console.log("deleted");
   res.redirect('/');
  })
  .catch((err)=>{
      console.log(err);
      res.redirect('/');
  });
}

function donetodo(req,res){
    ToDo.findOne({
        where: {
            id: req.body.taskId,
        },
    })
    .then((item)=>{
        console.log(item);
        item.done = item.done === "yes" ? "no" : "yes";
        item.save();
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/');
    });
}


module.exports = {
    add: add,
    fetchall: fetchall,
    editTodo: editTodo,
    deletetodo: deletetodo,
    donetodo: donetodo,
}