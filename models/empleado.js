exports = module.exports = function(mongoose) {
  var mongoose = mongoose,
      Schema   = mongoose.Schema;

  var tEmpleado = mongoose.model('tipos_empleados');
  var Logins       = mongoose.model('logins');
  var empleado = new Schema({  
    nombre:     String ,
    apPaterno:  String ,
    apMaterno:  String ,
    direccion:  String ,
    telefono:   Number ,
    email:      String ,
    fechaNac:   Date,
    iLogin     :  { type: Schema.ObjectId, ref: 'logins' } 
  });

  mongoose.model('empleados', empleado); 
}