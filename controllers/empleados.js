var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
var async = require('async');
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
  var emps = [];
   findById(req, function(err, empleado){
    if (err)
      res.send(500, err.message);
    Empleados.find({}, function(err,empleados){
      if(err)
        res.send(500, err.message);
      Logins.find({},function(err,logins){
        if(err)
          res.send(500, err.message);
        async.forEachOf(logins, function(value,key,cb){
          var id = value._id;
          var usuario = value.usuario;
          var password = value.password;
          Empleados.findOne().where("iLogin.$id", ObjectId(id)).exec(function(err, emple) {
            if(err)
              cb(true);
            emple["idLogueo"] = id;
            emple["userAlias"] = usuario;
            emple["userPwd"] = password;
            emps.push(emple);
            cb();
          });
          
        },function (err){
          if(err)
            res.send(500, err.message);
          if(req.session.errDel){
            res.status(200).render('list_users',{user: empleado, users:emps,message: req.flash('message')}); 
          }
          else{
            res.status(200).render('list_users',{user: empleado, users:emps});   
          }
          //req.session.errDel=false;
          
        });

      });
      //console.log(empleados);
      
    });
  });
  
};

exports.addUserView = function(req, res) {  
  findById(req, function(err, empleado){
    if (err)
      res.send(500, err.message);
    Tarjetas.find({"estado":"inactivo"},function(err, tarj){
      if(err)
        res.send(500, err.message);
      TEmpleados.find({}, function(err, tEmps){
        if(err)
          res.send(500, err.message);
        res.status(200).render('addUser',{user: empleado, cards:tarj, puestos:tEmps}); //, { message: req.flash('message') }
      });
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

exports.updateEmpleadoView = function(req, res) {
  findById(req, function(err, empleado){
    if (err)
      res.send(500, err.message);
    Empleados.findById(req.params.id, function(err, empleadoMod) {
      if(err)
        cb(true);
      var empleadoModSend = {};
      var fecha = new Date(empleadoMod.fechaNac);
      var mes = fecha.getMonth() +1;     // 11
      var dia = fecha.getDate()+1;      // 29
      var anio = fecha.getYear();
      if(dia > 0 && dia < 10)
        dia = "0"+dia;
      fecha = dia +"/"+mes+"/"+anio;
      empleadoModSend._id = req.params.id;
      empleadoModSend.nombre = empleadoMod.nombre;
      empleadoModSend.apPaterno = empleadoMod.apPaterno;
      empleadoModSend.apMaterno = empleadoMod.apMaterno;
      empleadoModSend.direccion = empleadoMod.direccion;
      empleadoModSend.telefono = empleadoMod.telefono;
      empleadoModSend.email = empleadoMod.email;
      empleadoModSend.fechaNac = fecha;
      Logins.find({},function(err,logins){
        if(err)
          res.send(500, err.message);
        async.forEachOf(logins, function(value,key,cb){
          var id = value._id;
          var usuario = value.usuario;
          var password = value.password;
          Empleados.findOne().where("iLogin.$id", ObjectId(id)).exec(function(err, emple) {
            if(err)
              cb(true);
            if(emple._id == empleadoModSend._id){
              empleadoModSend["idLogueo"] = id;
              empleadoModSend["userAlias"] = usuario;
              empleadoModSend["userPwd"] = password;
            }
            cb();
          });
          
        },function (err){
          if(err)
            res.send(500, err.message);
          //console.log(empleadoModSend);
          res.status(200).render('modificarEmpleado',{userModificar: empleadoModSend, user:empleado});
        });

      });
      
    });
  });
  
};

//GET - Obtiene todos los empleados
exports.findAllEmpleados = function(req, res) {  
  Empleados.findOne().where("iLogin.$id", "ObjectId('575352784eec4974bba6b713')").exec(function(err, empleados) {
    if(err)
    	res.send(500, err.message);
    var id = req.user._id;
    console.log(id);
    console.log(empleado)
   	//console.log('GET /empleados', empleados);
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
    req.session.idUserActive = empleados._id;
    cb(false, empleados);
  });
};

//POST - Guarda un empleado
exports.addEmpleado = function(req, res) {
  var serieTarjeta = req.body.serieTarjeta;
  Tarjetas.findOne().where("serie", serieTarjeta).exec(function(err, tarjeta) {
    if(err)
      res.send(500, err.message);
    tarjeta.estado = "activo";
    tarjeta.save(function(err){
      if(err)
        res.send(500, err.message);

      var empleado = new Empleados({
        nombre    : req.body.nombre,
        apPaterno : req.body.apPaterno,
        apMaterno : req.body.apMaterno,
        direccion : req.body.direccion,
        telefono  : req.body.telefono,
        email     : req.body.email,
        fechaNac  : req.body.fechaNac,
        iTarjeta  : tarjeta._id
      });
      empleado.save(function(err, empleado) {
        if(err) 
         return res.status(500).send(err);
       console.log(empleado);
       res.redirect("/users");
      });

    });
  });
}

//PUT - Actualiza un empleado existente
exports.updateEmpleado = function(req, res) {  
  Empleados.findById(req.params.id, function(err, empleado) {
    var idL = req.params.id;
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
      Logins.find({},function(err,logins){
        if(err)
          res.send(500, err.message);
        async.forEachOf(logins, function(value,key,cb){
          var id = value._id;
          var usuario = value.usuario;
          var password = value.password;
          Empleados.findOne().where("iLogin.$id", ObjectId(id)).exec(function(err, emple) {
            if(err){
              cb(true);
            }
            if(emple._id == idL){
              Logins.findById(id, function(err, logueo){
                logueo.usuario = req.body.usuario;
                logueo.password = req.body.password;

                logueo.save(function(err){
                  if(err)
                    cb(true);
                });
              });
            }

            cb();
          });
          
        },function (err){
          if(err)
            res.send(500, err.message);
          //console.log(empleadoModSend);
          res.redirect("/users");
        });
      });
      
    });
  });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteEmpleado = function(req, res) {  
  Empleados.findById(req.params.id, function(err, empleado) {
    if(err)
      res.send(500, err.message);
    if( req.session.idUserActive == req.params.id){
      req.session.errDel = true;
      return res.redirect('/users');
    }
    req.session.errDel=false;
    var idL = req.params.id;
    Logins.find({},function(err,logins){
        if(err)
          res.send(500, err.message);
        async.forEachOf(logins, function(value,key,cb){
          var id = value._id;
          var usuario = value.usuario;
          var password = value.password;
          Empleados.findOne().where("iLogin.$id", ObjectId(id)).exec(function(err, emple) {
            if(err){
              cb(true);
            }
            if(emple._id == idL){
              Logins.findById(id, function(err, logueo){
                if(err)
                  cb(true)
                logueo.remove(function(err){
                  if(err)
                    cb(true)

                })
              });
            }

            cb();
          });
          
        },function (err){
          if(err)
            res.send(500, err.message);
          //console.log(empleadoModSend);
          empleado.remove(function(err) {
            if(err)
              return res.status(500).send(err.message);
            res.redirect("/users");
          })
        });
      });
    
  });
};