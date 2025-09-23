# Pokedex <img width="16" height="16" alt="9f25803a-57d2-11e6-8746-0bea27561007" src="https://github.com/user-attachments/assets/00f8501e-cc35-40c0-a061-f6e1794de06c" />

Primera evaluación parcial-Programación Web- UDV- POKEDEX
Requerimientos:

#Requerimientos del Proyecto:
Parte I – Estructura HTML y CSS BEM: Maquetación correcta y uso coherente de BEM.
Parte II – Consumo de la API: Implementación de llamadas a la PokeAPI con fetch.
Parte III – Renderizado dinámico: Mostrar lista y detalle de Pokémon en el DOM.
Parte IV – Favoritos y persistencia: Gestión de favoritos en localStorage.
Parte V – Responsividad y video explicativo: Aplicación adaptada a móviles y explicación clara en el video.

#Explicación:
-Parte I – Estructura HTML y CSS BEM 
Esta parte establece la base visual y estructural del proyecto. El uso de HTML5 crea una estructura organizada para la interfaz de la Pokédex, mientras que CSS3, siguiendo la metodología BEM (Block Element Modifier), asegura un estilo consistente y modular. BEM ayuda a nombrar las clases de manera clara (e.g., .pokedex__left, .poke-card__types) para evitar conflictos y facilitar el mantenimiento. El diseño visual, con un cuerpo rojo y pantalla azul, imita una Pokédex clásica, haciendo que la aplicación sea atractiva y fácil de navegar tanto en desktop como en móviles gracias a los estilos base.

-Parte II – Consumo de la API 
Esta parte permite que la aplicación obtenga datos en tiempo real de la PokeAPI usando la función fetch de JavaScript. Esto es crucial porque carga dinámicamente la lista de los 151 Pokémon originales, incluyendo sus nombres, imágenes, tipos, habilidades, estadísticas y más. Sin esta integración, la Pokédex estaría limitada a datos estáticos, pero gracias a la API, los datos son frescos y accesibles, proporcionando una experiencia interactiva y actualizada para el usuario.

-Parte III – Renderizado dinámico 
Esta parte hace que la Pokédex sea interactiva al renderizar la lista de Pokémon y sus detalles directamente en el DOM (Document Object Model) según las acciones del usuario. Por ejemplo, al hacer clic en un Pokémon de la lista, se muestra su información detallada (número, nombre, experiencia base, tipos, etc.) en la tarjeta. Esto permite una navegación fluida y personalizada, ya que los datos se actualizan en tiempo real sin necesidad de recargar la página, mejorando la experiencia del usuario.

-Parte IV – Favoritos y persistencia 
Esta parte añade funcionalidad práctica al permitir que los usuarios marquen Pokémon como favoritos con un ícono de estrella (★/☆) y guarden esas preferencias usando localStorage. Esto asegura que los favoritos persistan incluso después de cerrar el navegador o reiniciar el dispositivo. Es útil para usuarios que quieren recordar sus Pokémon preferidos, como una lista personalizada que se mantiene entre sesiones, añadiendo valor y personalización al proyecto.

-Parte V – Responsividad y video explicativo 
La responsividad asegura que la Pokédex se adapte a diferentes tamaños de pantalla, como teléfonos y tablets, usando media queries en CSS para reorganizar el diseño (e.g., apilar la lista y detalles en móviles). Esto hace que la aplicación sea accesible desde cualquier dispositivo, ampliando su alcance. El video explicativo demuestra todas las funcionalidades (maquetación, API, renderizado, favoritos, responsividad) en acción, sirviendo como una guía clara para usuarios o evaluadores, y cumpliendo con el requisito de documentación visual.

#Pasos de como se realizó:
1. Se crea una carpeta que se abrirá en visual code studio para hacer toda la codificación:
<img width="1920" height="1008" alt="Captura de pantalla 2025-09-22 213028" src="https://github.com/user-attachments/assets/86f53506-d58c-44b8-881d-a5b07fed5649" />

2. Se creó el index.html pues es la parte en donde se apertura la página, también se creo el script.js y el styles.css que permite pulir las características de la página, esto se realizó en visual. 
<img width="1920" height="1008" alt="Captura de pantalla 2025-09-22 213019" src="https://github.com/user-attachments/assets/23c5b15e-1775-4e4f-b9bc-d3c7e59ec195" />

3. Este es el resultado:
<img width="755" height="700" alt="Captura de pantalla 2025-09-22 184306" src="https://github.com/user-attachments/assets/e85a4c7e-850c-49b8-b548-e4db0ae3e956" />

4.Luego de tener este resultado y cubrir con casi todos los requisitos debe de poderse visualizar en el móvil, por lo que se requiere habilitar un puerto en phyton que será el 8000 en cmd desde la carpeta donde está el proyecto.
<img width="960" height="1008" alt="Captura de pantalla 2025-09-22 211344" src="https://github.com/user-attachments/assets/4df15b4e-be71-4cfc-b7c1-8738fba511b8" />

5. Al tener esto se comprueba la IP de la computadora para entonces accesar al teléfono, además de tener la IP es importante que el móvil esté conectado a la misma red WI-FI
<img width="960" height="1008" alt="Captura de pantalla 2025-09-22 211353" src="https://github.com/user-attachments/assets/aaaa2e16-9488-4721-b94d-8850950a7928" />

6. Se debe de ingresar en el navegador del teléfono http://(la ip):8000 que fue el puerto que se habilitó:
![Imagen de WhatsApp 2025-09-22 a las 21 35 39_63cd0bff](https://github.com/user-attachments/assets/7f727dcb-ee0e-4040-a2e7-e53511a1e6b5)

****FIN****
