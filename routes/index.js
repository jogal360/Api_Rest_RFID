module.exports = function (app,router,ctrl,passport){
	var ctrlEmpleados = ctrl.empleados;
	var ctrlLogin = ctrl.login;

	// Login //
	router.get("/dashboard", function (req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/');
	} , function(req, res){
		ctrlLogin.dashboard(req,res);
	});

	router.route("/")
			.get(ctrlLogin.dashboard);
	//Raiz
	router.route("/addUser")
		.get(ctrlEmpleados.findAllEmpleados1);


	//Post login
	router.route("/login")
		.post(passport.authenticate('local', {
    	successRedirect: '/dashboard',
   		failureRedirect: '/'
  	}));
}