var mongoose = require('mongoose');

//Models
var Entradas     = mongoose.model('entradas'),
    Eventos      = mongoose.model('eventos'),
    Incidencias  = mongoose.model('incidencias'),
    Logins       = mongoose.model('logins'),
    Salidas      = mongoose.model('salidas'),
    Tarjetas     = mongoose.model('tarjetas'),
    TEmpleados   = mongoose.model('tipos_empleados'),
    TIncidencias = mongoose.model('tipos_incidencias'),
    Empleados    = mongoose.model('empleados');



//GET - Obtiene todos los empleados
exports.dashboard = function(req, res) {  
  if(!req.user){
    console.log('GET /home');
    res.status(200).render('index');
  }
  else{
    console.log('GET /dashboard', req.user);
  res.status(200).render('administrador');
  }
  
};

//GET - Obtiene un empleado en base a un id
exports.findById = function(req, res) {  
    Empleados.findById(req.params.id, function(err, empleado) {
      if(err)
        return res.send(500).send(err.message);
      console.log('GET /empleados/' + req.params.id);
      console.log(empleado);
      res.status(200).render('addUser');
    });
};

//POST - Guarda un empleado
exports.addEmpleado = function(req, res) {  
  console.log('POST');
  console.log(req.body);

  var empleado = new empleados({
		nombre    : req.body.nombre,
		apPaterno : req.body.apPaterno,
		apMaterno : req.body.apMaterno,
		direccion : req.body.direccion,
		telefono  : req.body.telefono,
		email     : req.body.email,
		fechaNac  : req.body.fechaNac
  });

  empleado.save(function(err, empleado) {
    if(err) 
    	return res.status(500).send(err);
    res.status(200).jsonp(empleado);
  });
};

//PUT - Actualiza un empleado existente
exports.updateEmpleado = function(req, res) {  
  Empleados.findById(req.params.id, function(err, empleado) {
    empleado.nombre     = req.body.nombre,
    empleado.apPaterno  = req.body.apPaterno,
    empleado.apMaterno  = req.body.apMaterno,
    empleado.direccion  = req.body.direccion,
    empleado.telefono   = req.body.telefono,
    empleado.email      = req.body.email,
    empleado.fechaNac   = req.body.fechaNac

    empleado.save(function(err) {
      if(err)
        return res.status(500).send(err.message);
      res.status(200).jsonp(empleado);
    });
  });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteEmpleado = function(req, res) {  
  Empleados.findById(req.params.id, function(err, empleado) {
    empleado.remove(function(err) {
      if(err)
        return res.status(500).send(err.message);
      res.status(200).send();
    })
  });
};