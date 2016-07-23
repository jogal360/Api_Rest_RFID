module.exports = function (app,router,ctrl,passport){
	var ctrlEmpleados = ctrl.empleados;
	var ctrlLogin = ctrl.login;

	// Login //
	 	//Login fallido
		router.route("/failure-login")
			.get(ctrlLogin.failure);
		//Login ok
		router.route("/dashboard")
			.get(ctrlLogin.dashboard);
			//.post(ctrl.addEmpleado);

	router.route("/")
			.get(ctrlEmpleados.findAllEmpleados);
	//Raiz
	router.route("/addUser")
		.get(ctrlEmpleados.findAllEmpleados1);


	//Post login
	router.route("/login")
		.post(passport.authenticate('local', {
    	successRedirect: '/dashboard',
   		failureRedirect: '/addUser'
  	}));
	
}