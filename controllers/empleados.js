var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
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
exports.calendar = function(req, res) {  
  findById(req, function(err, empleado){
    if (err)
      res.send(500, err.message);
    res.status(200).render('calendario',{user: empleado}); //, { message: req.flash('message') }
  });
};

exports.horario = function(req, res) {  
  findById(req, function(err, empleado){
    if (err)
      res.send(500, err.message);
    res.status(200).render('horario',{user: empleado}); //, { message: req.flash('message') }
  });
};

exports.users = function(req, res) {  
   findById(req, function(err, empleado){
    if (err)
      res.send(500, err.message);
    Empleados.find({}, function(err,empleados){
      if(err)
        res.send(500, err.message);
      //console.log(empleados);
      res.status(200).render('list_users',{user: empleado, users:empleados}); //, { message: req.flash('message') }
    });
  });
  
};

exports.incidencias = function(req, res) {  
  findById(req, function(err, empleado){
    if (err)
      res.send(500, err.message);
    res.status(200).render('incidencias',{user: empleado}); //, { message: req.flash('message') }
  });
};

//GET - Obtiene todos los empleados
exports.findAllEmpleados = function(req, res) {  
  Empleados.findOne().where("iLogin.$id", "ObjectId('575352784eec4974bba6b713')").exec(function(err, empleados) {
    if(err)
    	res.send(500, err.message);

   	console.log('GET /empleados', empleados);
    res.status(200).jsonp(empleados);
    //jsonp(empleados);
  });
};

//GET - Obtiene un empleado en base a un id
function findById (req, cb) {  
  var id = req.user._id;
  Empleados.findOne().where("iLogin.$id", ObjectId(id)).exec(function(err, empleados) {
    if(err)
      cb(true);
    req.session.errorlogin = false;
    cb(false, empleados);
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