const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Configuración de plantillas EJS y middleware para datos de formularios
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// 1. Conexión a la base de datos de MongoDB (Lab08)
const uri = 'mongodb://127.0.0.1:27017/SanchezPalaciosLab08';
mongoose.connect(uri)
  .then(() => console.log(' Connectado con éxito a MongoDB'))
  .catch(err => console.error(' Error al conectar a MongoDB:', err));

// 2. Definición del Esquema y Modelo de Producto
const productoSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  precio: Number,
  stock: Number
});

const Producto = mongoose.model('Producto', productoSchema, 'productos');

// 3. RUTAS DEL CRUD Y BÚSQUEDA

// A) CONSULTAR (Listar todo o aplicar filtro por nombre)
app.get('/', async (req, res) => {
  try {
    const { busqueda, editId } = req.query;
    let filtro = {};

    if (busqueda) {
      filtro.nombre = { $regex: busqueda, $options: 'i' };
    }

    let productos = await Producto.find(filtro);

    // Si la BD está vacía y no hay búsqueda, inserta datos iniciales de prueba
    if (productos.length === 0 && !busqueda) {
      await Producto.insertMany([
        { nombre: "Laptop HP", categoria: "Electrónica", precio: 2500, stock: 12 },
        { nombre: "Mouse Logi", categoria: "Accesorios", precio: 80, stock: 0 },
        { nombre: "Teclado Mecánico", categoria: "Accesorios", precio: 150, stock: 5 },
        { nombre: "Monitor 24 pulgadas", categoria: "Electrónica", precio: 700, stock: 0 }
      ]);
      productos = await Producto.find();
    }

    // Calcular el valor monetario total retenido en inventario
    const valorTotalInventario = productos.reduce((acc, prod) => acc + (prod.precio * prod.stock), 0);

    let productoEditar = null;
    if (editId) {
      productoEditar = await Producto.findById(editId);
    }

    res.render('index', { 
      productos, 
      productoEditar, 
      busqueda: busqueda || '', 
      valorTotalInventario 
    });
  } catch (error) {
    res.status(500).send('Error al consultar datos: ' + error.message);
  }
});

// B) CREAR (Insertar un nuevo producto)
app.post('/crear', async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;
    await Producto.create({ nombre, categoria, precio, stock });
    console.log(' Producto registrado con éxito.');
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error al guardar datos: ' + error.message);
  }
});

// C) MODIFICAR (Actualizar producto existente)
app.post('/editar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, precio, stock } = req.body;
    await Producto.findByIdAndUpdate(id, { nombre, categoria, precio, stock });
    console.log(' Producto actualizado con éxito.');
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error al actualizar datos: ' + error.message);
  }
});

// D) ELIMINAR (Borrar producto por ID)
app.post('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    console.log(' Producto eliminado con éxito.');
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error al eliminar datos: ' + error.message);
  }
});

// 4. Iniciar el servidor
app.listen(3000, () => {
  console.log(' Servidor corriendo en http://localhost:3000');
});