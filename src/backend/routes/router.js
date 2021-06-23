const express = require('express');
const login = require('../controllers/LogicController');
const middle = require('../controllers/middle');
const site = require('../controllers/controller');
const todo = require('../controllers/TodoController');

const router = express.Router();

router.route('/').get(todo.fetchall);
router.route('/signin').get(middle.redirectprofile, site.signin);
router.route('/signup').get(middle.redirectprofile, site.signup);

router.route('/add').post(todo.add);
router.route('/edit').post(todo.editTodo);
router.route('/done').post(todo.donetodo);
router.route('/delete').post(todo.deletetodo);
router.route('/signin').post(login.signin);
router.route('/signup').post(login.signup);

router.route('/signout').get(login.signout);


module.exports = router;