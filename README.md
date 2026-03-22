# EMB San Juan del Río - Landing Page

## Descripción del Proyecto
Esta es la página web promocional principal (Landing Page) diseñada y desarrollada para la academia de baloncesto EMB San Juan del Río. Su propósito principal es presentar la identidad de la academia, destacar la experiencia y metodología del entrenador Peter Martínez, y mostrar credibilidad frente a nuevos jugadores o prospectos mediante testimonios en formato de recortes de la comunidad.

El enfoque del diseño es minimalista, con una paleta de colores institucional (azul marino y acentos cobrizos), centrado en orientar al usuario hacia botones de acción (CTAs) para facilitar la inscripción y el contacto inmediato.

## Estructura del Sitio
El proyecto es estático y comprende tres vistas interconectadas:
- **Inicio (`index.html`)**: Página de aterrizaje que expone el resumen de los programas, la visión de la escuela deportiva y los canales de comunicación principales (WhatsApp, correo, ubicación física).
- **El Coach (`coach.html`)**: Página biográfica estilo línea de tiempo. Detalla la trayectoria deportiva y el enfoque formativo del entrenador principal de la academia.
- **Testimonios (`testimonios.html`)**: Galería implementada mediante CSS Grid que simula un corcho o muro asimétrico, donde se exponen recortes interactivos con las historias y opiniones de miembros del equipo, alumnos selectivos y padres de familia.

## Tecnologías Utilizadas

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

El proyecto fue construido desde cero sin dependencias de frameworks pesados para garantizar tiempos de carga instantáneos:
- **Maquetación y Estilos**: CSS puro (implementado vía hoja de estilo local) aplicando *CSS Variables* para la paleta de colores, *Flexbox* y *CSS Grid* para la distribución del contenido adaptativo.
- **Interactividad**: JavaScript asíncrono para animaciones de entrada progresiva basadas en *IntersectionObserver*, manejo de la barra de navegación móvil y apertura/cierre de modales de imagen (Lightbox).
- **Recursos Externos**: 
  - *FontAwesome 6*: Para la iconografía vectorial del sitio de forma limpia e indexable.
  - *Google Fonts*: Tipografías "Inter" y "Teko" para la jerarquía visual de los textos.

## Despliegue y Ejecución
Este entorno de la aplicación no depende de ninguna base de datos ni *back-end* dinámico.

Para visualizar y editar o realizar pruebas sobre el proyecto de forma local, basta con abrir el archivo raíz `index.html` en cualquier navegador web, o utilizar una extensión como *Live Server* en el editor de código.

## Créditos
Desarrollado de manera exclusiva para EMB San Juan del Río. Las métricas de rendimiento y desarrollo técnico corresponden a Xcore. Todos los derechos reservados.