# Laboratorio 08 - Sistema de Gestión de Pacientes (CRUD) con Node.js, Express y MongoDB

Este proyecto corresponde al desarrollo práctico del **Laboratorio N° 08** para el curso de **Bases de Datos Avanzadas**. Consiste en un sistema web para el control y gestión de citas de pacientes en una clínica médica, construido bajo la arquitectura **Node.js**, **Express**, **Mongoose** y el motor de plantillas **EJS**. La aplicación permite realizar un CRUD completo (Crear, Consultar/Filtrar, Editar y Eliminar registros de pacientes) directamente desde la interfaz web.

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
- **MongoDB** - Base de datos NoSQL para el almacenamiento de pacientes.
- **Mongoose** - ODM para el modelado estructurado de colecciones en MongoDB.
- **EJS (Embedded JavaScript)** - Motor de plantillas para renderizado dinámico en HTML.

---

## Funcionalidades Principales (CRUD Operativo)
- **Consulta e Indicadores KPI:** Muestra el listado general de pacientes atendidos y calcula dinámicamente la recaudación total de las consultas médicas en la cabecera.
- **Búsqueda y Filtro:** Permite filtrar pacientes por nombre mediante expresiones regulares sin distinguir mayúsculas ni minúsculas.
- **Registro de Pacientes:** Formulario interactivo para registrar datos esenciales (Nombre, Especialidad Médica, Costo de Consulta y Edad).
- **Edición Automática:** Carga automática de los datos del paciente seleccionado en las cajas de texto al presionar "Editar" para realizar modificaciones inmediatas.
- **Eliminación Segura:** Borrado directo de expedientes desde la lista con ventana emergente de confirmación.
- **Alertas Operativas Visuales:** Estilos CSS condicionales y etiquetas destacadas para identificar pacientes con consultas gratuitas o de costo cero.

---

## Requisitos e Instalación

### Pre-requisitos
- **Node.js** (v14 o superior)
- **MongoDB** corriendo localmente en el puerto `27017`

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/ROL4Ndev/lab08-sanchez-palacios.git](https://github.com/ROL4Ndev/lab08-sanchez-palacios.git)
   cd lab08-sanchez-palacios
