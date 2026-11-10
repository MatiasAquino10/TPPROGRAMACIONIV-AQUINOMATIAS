const mongoose = require("mongoose") 

const materiaSchema = new mongoose.Schema({ 
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    cargaHoraria: {
        type: Number,
        required: true,
        min: 1
    },
    estado: {
        type: String,
        required: true,
        enum: ["activa", "inactiva"]
    }
},
{ 
    versionKey: false 
}
)

const Materia = mongoose.model("Materia", materiaSchema) 

module.exports = Materia 
