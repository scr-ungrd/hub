# HUB SCR - UNGRD

[![Estado de desarrollo](https://img.shields.io/badge/Estado-En_Desarrollo-orange.svg)](https://github.com/scr-ungrd/hub)
[![Licencia](https://img.shields.io/badge/Licencia-Gobierno_Abierto-blue.svg)](LICENSE)
[![Organización](https://img.shields.io/badge/Entidad-UNGRD--SCR-223764.svg)](https://portal.gestiondelriesgo.gov.co)

Catálogo web institucional y portal centralizado de herramientas digitales, aplicaciones geográficas, investigaciones y publicaciones desarrolladas por la **Subdirección para el Conocimiento del Riesgo (SCR)** de la **Unidad Nacional para la Gestión del Riesgo de Desastres (UNGRD)** de Colombia.

---

## 📌 Tabla de Contenido

- [Visión General](#-visión-general)
- [Características Principales](#-características-principales)
- [Categorías de Recursos](#-categorías-de-recursos)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Despliegue y Uso Local](#-despliegue-y-uso-local)
- [Accesibilidad y Adaptabilidad](#-accesibilidad-y-adaptabilidad)
- [Créditos e Institucionalidad](#-créditos-e-institucionalidad)

---

## 🌐 Visión General

El **HUB SCR** sirve como punto de acceso único para la ciudadanía, investigadores, entidades gubernamentales y actores del Sistema Nacional de Gestión del Riesgo de Desastres (SNGRD). Su propósito fundamental es facilitar la consulta y apropiación social del conocimiento del riesgo mediante una interfaz moderna, accesible e intuitiva.

---

## ✨ Características Principales

- 🔍 **Buscador en Tiempo Real**: Motor de búsqueda interactivo por palabras clave que filtra instantáneamente títulos, descripciones y etiquetas técnicas.
- 🗂️ **Filtros por Categoría**: Organización modular distribuida en 5 categorías institucionales.
- 🌓 **Modo Oscuro / Claro**: Alternador de tema visual adaptativo con almacenamiento de preferencia local (`localStorage`).
- 👁️ **Herramientas de Accesibilidad**:
  - Ajuste de tamaño de fuente (Aumento, Reducción y Restablecimiento).
  - Modo de alto contraste para personas con visibilidad reducida.
- 📱 **Diseño Responsive & Fluid**: Adaptación perfecta a dispositivos móviles, tabletas y computadores de escritorio.
- ♿ **Estándares ARIA & HTML5 Semántico**: Optimizado para lectores de pantalla y navegación por teclado.

---

## 📚 Categorías de Recursos

El catálogo agrupa los módulos digitales en 5 categorías fundamentales:

1. **Accesos directos a recursos institucionales**
   - *Página web principal de la UNGRD* (Portal Oficial)
   - *SNI - Sistema Nacional de Información* (SNIGRD)
   - *Página del conocimiento del riesgo* (Portal Google Sites SCR)
   - *Biblioteca digital* (Repositorio institucional)

2. **Herramientas y aplicaciones**
   - *Riesgo Implícito Volcán Galeras* (Visor interactivo 3D)
   - *Incendios Colombia* (Monitoreo satelital en tiempo real)

3. **Publicaciones digitales**
   - *Libros de investigación* (Colección científica de estudios de riesgo)
   - *Fichas departamentales* (Escenarios de riesgo por departamento)
   - *Estrategia Nacional de Ciencia para la GRD* (Hoja de ruta y CTI)
   - *Aplicación SIG en GRD* (Guía técnica y metodológica)
   - *Conociendo el Riesgo - Aguas de escorrentía* (Guía ciudadana ilustrada)

4. **Catálogo editorial**
   - *Catálogo editorial* (Compendio de publicaciones e impresos editoriales)

5. **Memorias institucionales**
   - *Memorias PN26* (Proceso Nacional de Conocimiento)
   - *Memorias IDRiM 2024* (Encuentro Internacional de Gestión Integrada del Riesgo)

---

## 📁 Estructura del Proyecto

```text
hub/
├── assets/
│   ├── illustrations/     # Ilustraciones y gráficos principales (p. ej. sig.png)
│   ├── logos/             # Logotipos institucionales oficial UNGRD y SCR
│   └── svg/               # Vectoriales de iconos para módulos e interfaz
├── css/
│   ├── variables.css      # Sistema de diseño, paleta de colores y variables CSS
│   ├── style.css          # Estilos generales del HUB, tarjetas y maquetación
│   └── animations.css     # Animaciones y transiciones de interfaz
├── js/
│   └── main.js            # Lógica del motor de búsqueda, filtros y accesibilidad
├── index.html             # Estructura principal y maquetación del portal
└── README.md              # Documentación técnica del proyecto
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Maquetación semántica y estructura accesible.
- **CSS3**: Estilos personalizados con variables nativas, Flexbox y CSS Grid.
- **JavaScript (ES6+)**: Manipulación del DOM, filtros dinámicos y manejo de accesibilidad.
- **Bootstrap 5**: Sistema de grilla y utilidades de maquetación responsive.

---

## 🚀 Despliegue y Uso Local

Para ejecutar y probar la aplicación localmente no se requieren compiladores ni dependencias externas:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/scr-ungrd/hub.git
   cd hub
   ```

2. **Ejecutar un servidor local**:
   Puedes abrir directamente el archivo `index.html` en cualquier navegador web moderno, o iniciar un servidor de desarrollo HTTP ligero:

   *Con Python 3*:
   ```bash
   python3 -m http.server 8000
   ```
   Luego abre en tu navegador `http://localhost:8000`.

---

## ♿ Accesibilidad y Adaptabilidad

El HUB cumple con las pautas de accesibilidad para el contenido web (WCAG):
- Contraste de color optimizado tanto en temas claros como oscuros.
- Identificadores únicos (`id`) e hipervínculos descriptivos para lectores de pantalla.
- Navegación lógica mediante la tecla `TAB`.

---

## 🏢 Créditos e Institucionalidad

**Unidad Nacional para la Gestión del Riesgo de Desastres (UNGRD)**  
*Subdirección para el Conocimiento del Riesgo (SCR)*  
República de Colombia  

🌐 [portal.gestiondelriesgo.gov.co](https://portal.gestiondelriesgo.gov.co)
