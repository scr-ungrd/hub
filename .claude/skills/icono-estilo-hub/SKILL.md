---
name: icono-estilo-hub
description: Transforma una imagen o logotipo fuente en un ícono con el estilo visual del HUB SCR — silueta o duotono en un solo tono teal (#087283) sobre fondo transparente, recortado y con el padding de los demás íconos de assets/logos/*-teal.png. Úsalo cuando el usuario pida "convierte este logo al estilo del hub", "transforma esta imagen en ícono", "hazle el mismo estilo que a los otros íconos", o al agregar una nueva tarjeta a index.html que necesite su propio ícono. NO cubre el diseño de la tarjeta HTML en sí (eso es edición directa de index.html) ni la elección del color de marca si el hub cambia de paleta — solo la transformación de imagen a ícono teal.
---

# Ícono con el estilo del HUB SCR

Todos los íconos de tarjeta en `assets/logos/*-teal.png` comparten un mismo
tratamiento: recolorear cada píxel opaco de la imagen fuente a un **único
tono teal** (`#087283`, el mismo color de `.category-divider-line` en
`css/style.css` — vuelve a verificarlo con `grep -n "087283" css/style.css`
si el hub cambia de paleta en el futuro) sobre fondo transparente, recortado
al contenido con un margen pequeño. Se usa igual en modo claro y oscuro: las
imágenes no cambian con el tema, solo llevan un `drop-shadow` vía CSS
(`.card-svg-icon`).

Este skill trae `scripts/transform_icon.py`, que implementa ese tratamiento
a partir del logo original (a color) que te dé el usuario.

## Proceso

1. **Ubica o guarda la imagen fuente** en `assets/logos/<nombre>.png` (si el
   usuario la adjunta desde otro lado, cópiala ahí primero — todos los
   íconos del hub viven en esa carpeta).

2. **Corre el script en modo `solid` primero** (es el default):
   ```bash
   python3 .claude/skills/icono-estilo-hub/scripts/transform_icon.py assets/logos/<nombre>.png
   ```
   Esto genera `assets/logos/<nombre>-teal.png`. El script:
   - Si la imagen fuente ya tiene transparencia real (esquinas con alfa 0),
     usa esa transparencia tal cual.
   - Si la imagen fuente tiene fondo opaco plano (p. ej. una insignia
     circular sobre un cuadrado de color sólido), detecta el fondo con
     **flood fill desde el borde** — nunca con un simple filtro de color
     global. Esto importa: en más de un logo fuente, el dibujo interior
     (p. ej. la silueta de una chimenea) está pintado exactamente con el
     mismo color que el fondo del cuadro, solo que no está conectado al
     borde. Un filtro de color global borraría ese dibujo junto con el
     fondo real; el flood fill desde el borde no.
   - Recorta al bounding box del contenido resultante y agrega un margen
     transparente proporcional (como los `-teal.png` existentes).

3. **Mira el resultado con la herramienta Read** y decide si el modo
   `solid` se ve bien o si aplasta el ícono a una mancha ilegible:
   - **`solid`** (default) — mantiene la forma a opacidad plena. Úsalo
     cuando el logotipo es una silueta cohesiva o un wordmark: el
     reconocimiento viene del contorno, no de variaciones internas de tono.
     Ejemplos ya en el repo: `pn26-teal.png`, `idrim-teal.png`,
     `magma-logo-teal.png` — los tres quedaron en un solo tono opaco aunque
     el original tuviera varios colores.
   - **`duotone`** — mapea la luminancia de cada píxel a alfa (más oscuro
     en el original → más opaco en teal; más claro → más transparente), así
     que el contraste interno sobrevive al recoloreado. Úsalo cuando la
     imagen tiene **varias partes adyacentes cuya distinción depende del
     color original** (texto sobre un fondo, o varios elementos pictóricos
     como en una ilustración): aplanar todo a opacidad plena las fundiría
     en una sola mancha sin lectura. Ejemplos: `mapas-comunitarios-teal.png`
     (mapa + texto + banda inferior) y `natech-teal.png` (insignia circular
     con edificio, fuego, chimeneas y agua).

     ```bash
     python3 .claude/skills/icono-estilo-hub/scripts/transform_icon.py \
       assets/logos/<nombre>.png --mode duotone
     ```

   No hay una regla mecánica para elegir entre los dos — es una decisión
   de legibilidad. Genera el `solid`, míralo, y si se ve como un blob sin
   detalle, repite con `duotone` y compara.

4. **Si la imagen fuente trae contenido que no debe ir en el ícono** (por
   ejemplo, un subtítulo debajo del isotipo, como pasó al crear
   `pn26-teal.png`, donde se descartó el texto "Plataforma Nacional..." y
   solo quedó la estrella), recorta la fuente antes de correr el script, o
   recorta el PNG resultante — el script solo recolorea y ajusta el
   bounding box al contenido opaco que reciba, no decide qué contenido
   excluir.

5. **Verifica el tamaño de tarjeta correcto en `css/style.css`** antes de
   usarlo en `index.html`:
   - `card-svg-icon` (45×45 px) — default, para íconos/insignias de forma
     compacta (cuadrada o circular). Usado por `pn26-teal.png`,
     `idrim-teal.png`, `natech-teal.png`.
   - `card-svg-icon-magma` (134×134 px) — para wordmarks anchos/rectangulares
     que necesitan más espacio para seguir siendo legibles. Usado por
     `magma-logo-teal.png` y `mapas-comunitarios-teal.png`.

6. **Confirma visualmente antes de dar por terminado**: sirve el sitio
   localmente (`python3 -m http.server` desde la raíz del repo) y revisa el
   ícono ya insertado en su tarjeta con las herramientas de navegador — a
   tamaño de tarjeta (45px) un duotone muy tenue puede lucir distinto que a
   tamaño completo.

## Opciones del script

```
transform_icon.py INPUT.png [-o OUTPUT.png] [--mode solid|duotone]
                   [--color 087283] [--bg-tolerance 10] [--pad 0.02]
```

- `--color`: por si algún ícono puntual necesitara otro tono (no es lo
  usual — todos los existentes comparten el mismo `087283`).
- `--bg-tolerance`: sube este valor si el fondo de la fuente no es un color
  perfectamente plano (p. ej. viene de un JPEG o tiene un gradiente sutil)
  y el flood fill no está limpiando toda la esquina.
- `--pad`: fracción de `max(ancho, alto)` para el margen transparente final.

## Insertar el ícono en una tarjeta nueva

Esto ya no es parte de la transformación de imagen, pero es el paso
siguiente típico. Plantilla de tarjeta (ajusta categoría, enlace, alt y
texto):

```html
<div class="col resource-card-item" data-category="<categoria>"
  data-search-terms="<palabras clave en minúsculas separadas por espacio>">
  <a class="resource-card" href="<url>" target="_blank" rel="noopener"
     aria-label="<descripción de la acción> en una nueva pestaña">
    <div class="card-icon-centered">
      <img src="assets/logos/<nombre>-teal.png" alt="Logotipo <nombre>" class="card-svg-icon"
        loading="lazy">
    </div>
    <div class="card-body-content">
      <h4 class="card-resource-title text-center"><Título></h4>
      <p class="card-resource-text text-center">
        <Descripción breve>
      </p>
    </div>
  </a>
</div>
```

Colócala dentro del `category-block` correcto (`data-category-block`), no al
final del archivo.
