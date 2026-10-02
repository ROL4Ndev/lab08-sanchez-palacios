const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// 1. Conexión a la base de datos de MongoDB (local)
const uri = 'mongodb://127.0.0.1:27017/SanchezPalaciosLab07';
mongoose.connect(uri)
  .then(() => console.log(' Connectado con éxito a MongoDB'))
  .catch(err => console.error(' Error al conectar a MongoDB:', err));

// 2. Definir el Esquema y Modelo de Producto
const productoSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  precio: Number,
  stock: Number
});

const Producto = mongoose.model('Producto', productoSchema, 'productos');

// 3. Ruta principal para mostrar el inventario
app.get('/', async (req, res) => {
  try {
    let productos = await Producto.find();

    // Si la base de datos está vacía, creamos productos de prueba automáticamente
    if (productos.length === 0) {
      await Producto.insertMany([
        { nombre: "Laptop HP", categoria: "Electrónica", precio: 2500, stock: 12 },
        { nombre: "Mouse Logi", categoria: "Accesorios", precio: 80, stock: 0 },
        { nombre: "Teclado Mecánico", categoria: "Accesorios", precio: 150, stock: 5 },
        { nombre: "Monitor 24 pulgadas", categoria: "Electrónica", precio: 700, stock: 0 }
      ]);
      console.log(' Productos de prueba creados automáticamente.');
      productos = await Producto.find();
    }

    // Calcular la suma total del valor del inventario (precio * stock)
    const valorTotalInventario = productos.reduce((acc, prod) => acc + (prod.precio * prod.stock), 0);

    // Enviar los datos a la vista 'productos.ejs'
    res.render('productos', { productos, valorTotalInventario });
  } catch (error) {
    res.status(500).send('Error al consultar los datos: ' + error.message);
  }
});

// 4. Iniciar el servidor
app.listen(3000, () => {
  console.log(' Servidor corriendo en http://localhost:3000');
});