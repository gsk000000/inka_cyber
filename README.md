<h1 align="center">PROYECTO INKA</h1>
<p align="center">Plataforma de Panel Administrativo</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow" />
  <img src="https://img.shields.io/badge/Diseño-Liquid%20Glass%20macOS-blueviolet" />
</p>

## Como funciona el codigo?

# 1. App.jsx
Define las rutas de la aplicacion usando **REACT ROUTER DOM**
```
<Route path="/" element={<DashboardPage />} />
<Route path="/vuln/:id" element={<DetailPage />} />
```
``/`` carga el dashboard
```/vuln/:id``` muestra el detalle de una vulnerabilidad

# 2. VunlContext.jsx
Este archivo usa **Context API** para mantener el listado de vulnerabilidades accesible desde cualquier parte del código. Incluye funciones para:

```addVuln()``` - añadir una nueva vulnerabilidad.

```updateVuln()``` - editar vulnerabilidad.

```deleteVuln()``` - eliminarla.

Estado inicial cargado con una muestra: ```SQL Injection```

# 3. DashboardPage.jsx
Pagina principal, por lo que contiene
- Boton para mostrar u ocultar el formulario (```VulnerabilityForm```)
- Filtros que actualizan en tiempo real la lista.
- Muestra la tabla con las vulnerabilidades actuales (```VulnerabilityList```)

# 4. VulnerabilityForm.jsx
Formulario con campos como:
- Nombre
- Tipo
- Nivel de riesgo (bajo, medio, alto, crítico)
- Fecha
- Descripción
- Soluciones (como lista separada por comas)
- Recomendaciones

Se usa para crear o editar dependiendo de si se pasa ``initialData``.

# 5. VulnerabilityList.jsx
Usa una ```<table>``` que muestra:

``| Nombre | Nivel de riesgo | Fecha	| Detalle |``

- Aplica colores por nivel de riesgo (verde, naranja, rojo).

- Cada fila tiene un botón para ver el detalle.

# 6. DetailPage.jsx
Cuando haces clic en ``"Ver Detalle"``, accedes al detalle vía ``/vuln/:id``. Muestra:

``` | Tipo | descripción | gravedad | categoría```

- Lista de soluciones

- Recomendaciones

- Formulario para editar

- Botón para eliminar

- Componente EvidenceManager para cargar archivos

# 7. EvidenceManager.jsx 
Permite:

- Subir archivos PDF, PNG o JPG

- Mostrarlos en lista

- Eliminar evidencia

- Marcar uno como “principal” si lo amplías


---

## Instalación y uso

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/inka-cyber.git
cd inka-cyber

# 2. Instala las dependencias
npm install

# 3. Ejecuta en modo desarrollo
npm run dev

# 4. Abre en tu navegador
http://localhost:5173
```
## Despliege en AWS

``npm run build``

# Crea y sincroniza bucket
```
aws s3 mb s3://inka-cyber-panel
aws s3 sync dist/ s3://inka-cyber-panel --acl public-read
```

# En la consola de AWS S3:
# > Activar Static Website Hosting
# > Establecer index.html como entrada principal

# Licencia

Este proyecto es parte de una evaluación académica en **INACAP - Programacion en Front End** Por Marcos Changala & Gabriel Elzo
