# HUB SCR - UNGRD

[![Estado](https://img.shields.io/badge/Estado-Fase_piloto-orange.svg)](https://scr-ungrd.github.io/hub/acerca-de.html)
[![Sitio](https://img.shields.io/badge/Sitio-scr--ungrd.github.io%2Fhub-213362.svg)](https://scr-ungrd.github.io/hub/)
[![Organización](https://img.shields.io/badge/Entidad-UNGRD--SCR-213362.svg)](https://portal.gestiondelriesgo.gov.co)

Catálogo de accesos directos, herramientas, aplicaciones y publicaciones de la **Subdirección para el Conocimiento del Riesgo (SCR)** de la **Unidad Nacional para la Gestión del Riesgo de Desastres (UNGRD)** de Colombia.

**Sitio:** <https://scr-ungrd.github.io/hub/> · **Acerca de:** <https://scr-ungrd.github.io/hub/acerca-de.html>

> Este hub es un espacio de trabajo institucional de acceso público y en fase de piloto. No reemplaza la información del dominio institucional [gestiondelriesgo.gov.co](https://portal.gestiondelriesgo.gov.co).

---

## 📌 Tabla de contenido

- [Visión general](#-visión-general)
- [Características principales](#-características-principales)
- [Categorías de recursos](#-categorías-de-recursos)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Despliegue y uso local](#-despliegue-y-uso-local)
- [Accesibilidad](#-accesibilidad)
- [Cómo solicitar un cambio](#-cómo-solicitar-un-cambio)
- [Equipo](#-equipo)
- [Créditos e institucionalidad](#-créditos-e-institucionalidad)

---

## 🌐 Visión general

El **HUB SCR** es un punto de acceso único a los repositorios de código, visores, herramientas digitales, investigaciones y publicaciones de la SCR. Se dirige a la ciudadanía, a investigadores, a entidades gubernamentales y a los actores del Sistema Nacional de Gestión del Riesgo de Desastres (SNGRD), y busca facilitar la consulta y la apropiación social del conocimiento del riesgo.

---

## ✨ Características principales

- 🔍 **Buscador en tiempo real**: filtra al instante por título, descripción y etiquetas de cada recurso. Atajo de teclado: `Ctrl K` (o `⌘ K` en macOS).
- 🗂️ **Filtros por categoría**: cinco botones, uno por categoría.
- 🌓 **Modo claro y oscuro**: la preferencia se guarda en el navegador (`localStorage`).
- 🕸️ **Portada con red animada de nodos** (`js/hero-network.js`).
- ℹ️ **Página «Acerca de»** (`acerca-de.html`): qué es el HUB, quién lo publica, estado, accesibilidad, tecnología, equipo y cómo solicitar un cambio.
- 🧭 **Pie de página** con el mismo diseño que los demás sitios de la SCR (Catálogo Editorial, Investigaciones en GRD, Fichas Departamentales y Cuadernos Reproducibles), en el azul `#213362` y el amarillo `#ffcd00` del Manual de Identidad Visual UNGRD 2024.
- 📱 **Diseño adaptable** a celulares, tabletas y computadores.

---

## 📚 Categorías de recursos

El catálogo agrupa 21 recursos en cinco categorías:

1. **Accesos directos a recursos institucionales** (4)
   - Página web principal de la UNGRD
   - SNI: Sistema Nacional de Información para la Gestión del Riesgo de Desastres
   - Página del conocimiento del riesgo
   - Biblioteca digital

2. **Herramientas y aplicaciones** (4)
   - Riesgo Implícito Volcán Galeras
   - Incendios Colombia
   - Escenarios de incendios forestales
   - Escenarios Incendios Forestales ante la ocurrencia del Fenómeno El Niño 2026 - 2027 (app abierta)

3. **Catálogo editorial y publicaciones digitales** (7)
   - Catálogo editorial SCR
   - Libros de investigación
   - Aplicación SIG en GRD
   - Conociendo el Riesgo - Aguas de escorrentía
   - Cuadernos reproducibles
   - Fichas departamentales
   - Estado de la ciencia de los desastres en Colombia

4. **Museo Magma y proyectos en conocimiento del riesgo** (2)
   - Magma: Museo Interactivo del Riesgo
   - Mapas comunitarios

5. **Memorias de eventos** (4)
   - Memorias PN26
   - Memorias IDRiM 2024
   - Natech 2022
   - Taller Radares Meteorológicos

---

## 📁 Estructura del proyecto

```text
hub/
├── assets/
│   ├── illustrations/     # Ilustraciones de las tarjetas
│   ├── logos/             # Logotipo UNGRD, favicon y logos de proyectos
│   └── svg/               # Íconos vectoriales de las tarjetas
├── css/
│   ├── variables.css      # Paleta de colores, tipografía y variables CSS
│   ├── style.css          # Estilos del HUB, tarjetas, pie de página y página «Acerca de»
│   └── animations.css     # Animaciones y transiciones
├── js/
│   ├── main.js            # Buscador, filtros, atajo Ctrl K y modo claro/oscuro
│   └── hero-network.js    # Red animada de nodos de la portada
├── index.html             # Portada y catálogo de recursos
├── acerca-de.html         # Página «Acerca de»
└── README.md              # Este documento
```

---

## 🛠️ Tecnologías utilizadas

- **HTML5**: estructura semántica y accesible.
- **CSS3**: variables nativas, Flexbox y CSS Grid.
- **JavaScript (ES6+)**: buscador, filtros, modo claro/oscuro y animación de la portada.
- **Bootstrap 5.3**: grilla y utilidades de maquetación.
- Tipografías **Outfit** e **Inter** (Google Fonts).

No hay compiladores ni dependencias de construcción.

---

## 🚀 Despliegue y uso local

**Despliegue:** el sitio se publica con GitHub Pages desde la rama `main`. Cada cambio que se integra en `main` queda publicado en <https://scr-ungrd.github.io/hub/> en pocos minutos.

**Uso local:**

1. Clona el repositorio:
   ```bash
   git clone https://github.com/scr-ungrd/hub.git
   cd hub
   ```

2. Abre `index.html` en el navegador, o inicia un servidor local:
   ```bash
   python3 -m http.server 8000
   ```
   y visita `http://localhost:8000`.

---

## ♿ Accesibilidad

- Modo claro y oscuro.
- Navegación con teclado, enlace para saltar al contenido y etiquetas ARIA para lectores de pantalla.
- Contraste de color revisado según las pautas WCAG.

---

## ✉️ Cómo solicitar un cambio

Para pedir un ajuste (corregir un enlace, actualizar la descripción de un recurso, agregar o retirar una tarjeta, o reportar un error), abre una solicitud (*issue*) en este repositorio. Necesitas una cuenta de GitHub.

1. Entra a <https://github.com/scr-ungrd/hub/issues/new>.
2. En el título, resume el cambio. Por ejemplo: «Actualizar el enlace de Memorias PN26».
3. En la descripción, indica qué recurso o sección quieres cambiar, qué cambio propones, por qué, y el enlace correcto si lo hay.
4. Haz clic en **Submit new issue**. El equipo revisará la solicitud y responderá en la misma página.

Si sabes trabajar con Git, también puedes proponer el cambio directamente: haz un *fork*, edita los archivos y abre un [*pull request*](https://github.com/scr-ungrd/hub/pulls) hacia `main`.

---

## 👥 Equipo

**Líder del proyecto**

- Mauricio Romero Torres · GitHub: [mromerot](https://github.com/mromerot) · Contrato de prestación de servicios n.º 9677-PPAL001-1552-2025
- Jorge Alpala · GitHub: [jorgealpala](https://github.com/jorgealpala) · Contrato de prestación de servicios n.º 9677-PPAL001-1240-2025

**Equipo técnico**

- Estefanía Pachón · GitHub: [Ing-Estefania-Pachon](https://github.com/Ing-Estefania-Pachon) · Contrato de prestación de servicios n.º 9677-PPAL001-201-2026

---

## 🏢 Créditos e institucionalidad

**Unidad Nacional para la Gestión del Riesgo de Desastres (UNGRD)**  
*Subdirección para el Conocimiento del Riesgo (SCR)*  
República de Colombia

🌐 [portal.gestiondelriesgo.gov.co](https://portal.gestiondelriesgo.gov.co)

El repositorio aún no declara una licencia de uso.

© 2026 Subdirección para el Conocimiento del Riesgo - UNGRD. Todos los derechos reservados.
