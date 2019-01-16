# MOOMIN

## Instalación

Para utilizar este framework es necesario:
- Node 8.12.0
- Gulp

Para instalar el proyecto
```
npm install 
```
Para lanzar el proyecto en el navegador y realizar modificaciones:
```
gulp
```
Para crear una versión completa lista para subir a producción: Todo se genera en la carpeta `dist`
```
gulp build
```

## GULP
Para materializar todas las decisiones que estamos tomando he creado un pequeño flujo de GULP

## SASS Structure

La separación de componentes basada en **Atomic Design** nos permite poder reutilizar elementos a lo largo del proyecto e incluso de forma transversal entre proyectos.

De forma específica existen tres ficheros base en la raiz de `sass`

- `ie.scss` Este archivo solo se carga en versiones anteriores a IE8
- `shell.scss` Este archivo importa los estilos de nuestro **App Shell** 
- `syle.sccs` Aquí importamos el resto de archivos CSS que se utilizarán en el proyecto

### 🛠 Subatoms
 - `_animations.scss`: Colección de animaciones listas para ser utilizadas
 - `_colors.scss` : Definición variables para colores
 - `_fonts.scss` : Carga de archivos de fuentes
 - `_layout.scss`: Definición de breakpoints y otros elementos necesarios para el layout del proyecto
 - `_mixins.scss`: Archivo de funciones de SASS
 - `_normalize.scss`: Reset CSS
 - `_spacing.scss`: Variables de espaciado
 - `_typography.scss` : Definición de los tipografías y sus tamaños
 - `_variables.scss` : Archivo que importa todos los archivos de variables para utilizarlos donde haga falta
  
### ⚛️ Atoms
 - `_buttons.scss` : Estilos de botones
 - `_global.scss`: Estilos genéricos
 - `_hr.scss` : Estilos para etiqueta `<hr>`
 - `_icons.scss` : Definición de iconos en formato `svg`
 - `_images.scss` : Estilos para imágenes
 - `_inputs.scss` : Estilos para diferentes tipos de inputs y sus estados
 - `_labels.scss` : Estilos para labels
 - `_links.scss` : Estilos para enlaces
 - `_lists.scss` : Estilos para listados
 - `_selects.scss` : Estilos para etiquetas `<select>`
 - `_textareas.scss` : Estilos para etiquetas `<textarea>`
 - `_texts.scss` : Estilos para etiquetas de texto
 - `_tooltip.scss` : Estilo para el uso de tooltip en formularios
 - `_video.scss` : Estilos para elementos `<video>`

### 🛴 Molecules
 - `_forms.scss` : Estilos para formularios
 - `_glide.scss` : Estilos para slider
 - `_menu.scss` : Estilos para menu básico

### 🛵 Orgnanisms
 - `_footer.scss` : Estilos para pie del proyecto
 - `_header.scss` : Estilos para cabecera del proyecto
 - `_main.scss` : Estilos para parte principal del proyecto

### 📃 Pages
 - `_page.scss` : Estilos propios de cada página

## VIEWS
 Las vistas están basados en **PUG**, de esta forma podemos aprovechar ventajas como la inclusión de lógica y la reutilización de plantillas. La estructura que se ha elegido es la misma que hemos utilizado en SASS, es decir seguimos una estructura basada también en Atomic Design.

### 🛠 Subatoms
- `base.pug`: Archivo base de HTML basado en PWA. y que utlizaremos para extender las diferentes páginas HTML. En este archivo podremos sobreescribir elementos como por ejemplo el *title*,*description*,*keywords*...

### 📃 Pages
 - `index.pug` : Página principal de ejemplo, donde podemos ver el uso de diferentes componentes

### 🛵 Orgnanisms
 - `footer.pug` : Plantilla donde se define el pie del proyecto
 - `header.pug` : Plantilla donde se define la cabecera del proyecto
 - `organisms.pug` : Archivo de ayuda para importar o exportar todos los organismos 

### 🛴 Molecules
 - `_forms.pug` : Platilla para formulaios
 - `_glide.pug` : Plantilla para slider
 - `_menu.pug` : Plantilla de menú
 - `molecules.pug` : Archivo de ayuda para importar o exportar todos las moléculas 

### ⚛️ Atoms
Todas las plantillas de los átomos que podemos extender en nuestros ficheros de `pug`, cada una tiene ejemplos de uso y de llamada, así como elementos de personalización a través de variables.