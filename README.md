# Laboratorio 08 - Sistema de Gestión de Inventario (CRUD) con Node.js, Express y MongoDB

Este proyecto corresponde al desarrollo práctico del **Laboratorio N° 08** para el curso de **Bases de Datos Avanzadas**. Consiste en un sistema de gestión de inventario para una tienda web construida bajo la arquitectura **Node.js**, **Express**, **Mongoose** y el motor de plantillas **EJS**, que permite realizar un CRUD completo (Crear, Consultar/Filtrar, Editar y Eliminar productos) directamente desde la interfaz web sin manipular comandos.

---

## Integrantes
- **Rolando Sánchez**
- **Guyin Palacios**

**Sección:** C24A  
**Carrera:** Diseño y Desarrollo de Software  

---

## Tecnologías Utilizadas
- **Node.js** - Entorno de ejecución JavaScript para el backend.
- **Express.js** - Framework de servidor web para manejo de rutas HTTP.
- **MongoDB** - Base de datos NoSQL para el almacenamiento de productos.
- **Mongoose** - ODM para el modelado estructurado de colecciones en MongoDB.
- **EJS (Embedded JavaScript)** - Motor de plantillas para renderizado dinámico en HTML.

---

## Funcionalidades Principales (CRUD Operativo)
- **Consulta e Indicadores KPI:** Muestra la lista general de artículos y calcula dinámicamente el valor monetario total retenido en el almacén (Precio $\times$ Stock).
- **Búsqueda y Filtro:** Permite filtrar productos por nombre de manera ágil usando expresiones regulares.
- **Creación de Productos:** Registro de nuevos artículos mediante cajas de texto interactiva (Nombre, Categoría, Precio Unitario y Stock).
- **Edición Automática:** Al presionar "Editar", se cargan dinámicamente los datos del producto seleccionado en el formulario para su actualización inmediata.
- **Eliminación Segura:** Borrado directo de ítems desde la tabla con ventana emergente de confirmación.
- **Alertas Operativas Visuales:** Identificación visual e inmediata (mediante estilos CSS condicionales y etiquetas) para resaltar productos cuyo stock sea igual a cero.

---

## Requisitos e Instalación

### Pre-requisitos
- **Node.js** (v14 o superior)
- **MongoDB** corriendo localmente en el puerto `27017`

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/ROL4Ndev/lab07-sanchez-palacios.git](https://github.com/ROL4Ndev/lab07-sanchez-palacios.git) lab08-sanchez-palacios
   cd lab08-sanchez-palacios
