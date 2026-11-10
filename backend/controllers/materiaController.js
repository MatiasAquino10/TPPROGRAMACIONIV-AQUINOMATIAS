const Materia = require("../models/Materia") 

async function obtenerMaterias(req, res) { 
    const materias = await Materia.find()
    res.json(materias) 
}

async function obtenerMateria(req, res) {
    const materia = await Materia.findOne({ 
        codigo: req.params.codigo
    }) 
    if (!materia) { 
        return res.status(404).json({
            mensaje: "Materia no encontrada"
        })
    }
    res.json(materia) 
}

async function crearMateria(req, res) {
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body 
    if (!codigo || !nombre || cargaHoraria === undefined || !estado) {
        return res.status(400).json({
            mensaje: "El código, el nombre, la carga horaria y el estado son obligatorios"
        })
    }
    if (typeof codigo !== "string" || typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El código y el nombre deben ser un texto"
        })
    }
    if (codigo.trim() === "" || nombre.trim() === "") {
        return res.status(400).json({
            mensaje: "El código y el nombre no pueden contener solo espacios"
        })
    }
    if (descripcion && (typeof descripcion !== "string" || descripcion.trim() === "")) {
        return res.status(400).json({
            mensaje: "La descripción no puede contener solo espacios"
        })
    }
    if (typeof cargaHoraria !== "number") {
        return res.status(400).json({
            mensaje: "La carga horaria debe ser un número"
        })
    }
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return res.status(400).json({
            mensaje: "La carga horaria debe ser un número entero mayor que cero"
        })
    }
    if (estado !== "activa" && estado !== "inactiva") {
        return res.status(400).json({
            mensaje: "El estado debe ser activa o inactiva"
        })
    }
    const existe = await Materia.findOne({ 
        codigo: codigo.trim()
    })
    if (existe) { 
        return res.status(400).json({
            mensaje: "El código ya existe"
        })
    }
    const nuevaMateria = await Materia.create({ 
        codigo,
        nombre,
        descripcion,
        cargaHoraria,
        estado
    })
    res.status(201).json(nuevaMateria) 
}

async function actualizarMateria(req, res) {
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
    if (!codigo || !nombre || cargaHoraria === undefined || !estado) {
        return res.status(400).json({
            mensaje: "El código, el nombre, la carga horaria y el estado son obligatorios"
        })
    }
    if (typeof codigo !== "string" || typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El código y el nombre deben ser un texto"
        })
    }
    if (codigo.trim() === "" || nombre.trim() === "") {
        return res.status(400).json({
            mensaje: "El código y el nombre no pueden contener solo espacios"
        })
    }
    if (descripcion && (typeof descripcion !== "string" || descripcion.trim() === "")) {
        return res.status(400).json({
            mensaje: "La descripción no puede contener solo espacios"
        })
    }
    if (typeof cargaHoraria !== "number") {
        return res.status(400).json({
            mensaje: "La carga horaria debe ser un número"
        })
    }
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return res.status(400).json({
            mensaje: "La carga horaria debe ser un número entero mayor que cero"
        })
    }
    if (estado !== "activa" && estado !== "inactiva") {
        return res.status(400).json({
            mensaje: "El estado debe ser activa o inactiva"
        })
    }
    const existe = await Materia.findOne({ 
        codigo: req.params.codigo
    })
    if (!existe) {
        return res.status(404).json({
            mensaje: "Materia no encontrada"
        })
    }
    if (codigo.trim() !== req.params.codigo) {
        const duplicada = await Materia.findOne({ 
            codigo: codigo.trim()
        })
        if (duplicada) {
            return res.status(400).json({
                mensaje: "El código ya existe"
            })
        }
    }
    const materia = await Materia.findOneAndUpdate( 
        { codigo: req.params.codigo }, 
        { codigo, nombre, descripcion, cargaHoraria, estado }, 
        { returnDocument: "after" } 
    )
    res.json(materia)
}

async function eliminarMateria(req, res) {
    const materia = await Materia.findOneAndDelete( 
        { codigo: req.params.codigo } 
    )
    if (!materia) {
        return res.status(404).json({
            mensaje: "Materia no encontrada"
        })
    }

    res.json({ mensaje: "Materia eliminada correctamente" })
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} 
