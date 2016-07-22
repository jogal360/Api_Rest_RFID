module.exports = function (app,router,ctrl,passport){
	var ctrlEmpleados = ctrl.empleados;
	//console.log(ctrl);

	//Raiz
	router.route("/")
		.get(ctrlEmpleados.findAllEmpleados);
		//.post(ctrl.addEmpleado);

	//Raiz
	router.route("/addUser")
		.get(ctrlEmpleados.findAllEmpleados1);


	//Post login
	router.route("/login")
		.post(passport.authenticate('local', {
    	successRedirect: '/',
   		failureRedirect: '/addUser'
  	}));
	
}