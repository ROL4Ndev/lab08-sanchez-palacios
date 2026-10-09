const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb://127.0.0.1:27017/SanchezPalaciosLab08Clinica';
mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexion:', err));

const pacienteSchema = new mongoose.Schema({
  nombre: String,
  especialidad: String,
  costo: Number,
  edad: Number
});

const Paciente = mongoose.model('Paciente', pacienteSchema, 'pacientes');

app.get('/', async (req, res) => {
  try {
    const { busqueda, editId } = req.query;
    let filtro = {};

    if (busqueda) {
      filtro.nombre = { $regex: busqueda, $options: 'i' };
    }

    let pacientes = await Paciente.find(filtro);

    if (pacientes.length === 0 && !busqueda) {
      await Paciente.insertMany([
        { nombre: "Carlos Gomez", especialidad: "Cardiologia", costo: 150, edad: 45 },
        { nombre: "Ana Torres", especialidad: "Pediatria", costo: 0, edad: 8 },
        { nombre: "Luis Mendoza", especialidad: "Dermatologia", costo: 120, edad: 30 },
        { nombre: "Maria Silva", especialidad: "General", costo: 0, edad: 62 }
      ]);
      pacientes = await Paciente.find();
    }

    const recaudacionTotal = pacientes.reduce((acc, pac) => acc + pac.costo, 0);

    let pacienteEditar = null;
    if (editId) {
      pacienteEditar = await Paciente.findById(editId);
    }

    res.render('index', { 
      pacientes, 
      pacienteEditar, 
      busqueda: busqueda || '', 
      recaudacionTotal 
    });
  } catch (error) {
    res.status(500).send('Error al consultar datos: ' + error.message);
  }
});

app.post('/crear', async (req, res) => {
  try {
    const { nombre, especialidad, costo, edad } = req.body;
    await Paciente.create({ nombre, especialidad, costo, edad });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error al guardar datos: ' + error.message);
  }
});

app.post('/editar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especialidad, costo, edad } = req.body;
    await Paciente.findByIdAndUpdate(id, { nombre, especialidad, costo, edad });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error al actualizar datos: ' + error.message);
  }
});

app.post('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Paciente.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error al eliminar datos: ' + error.message);
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});