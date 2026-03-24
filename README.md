Mi primera API consumiendo datos de api publica.

# 🧪 Rick and Morty App

Aplicación web construida con React, TypeScript y Tailwind CSS que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/).

![Rick and Morty App](https://rickandmortyapi.com/api/character/avatar/1.jpeg)

---

## 🚀 Demo en vivo

🔗 [Ver aplicación](https://app-de-rick-y-morty.vercel.app/)

---

## ✨ Funcionalidades

- 👾 **Personajes** — Lista paginada con imagen, estado, especie y origen
- 🎬 **Episodios** — Lista paginada con fecha de emisión y cantidad de personajes
- 🌍 **Locaciones** — Lista paginada con dimensión y cantidad de residentes
- 🔍 **Buscador** — Búsqueda de personajes por nombre en tiempo real
- 📄 **Detalle** — Página individual con toda la información de cada personaje
- 📱 **Responsive** — Diseño adaptado para móvil, tablet y escritorio

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión | Para qué se usa |
|---|---|---|
| React | 18 | Librería principal de UI |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 3 | Estilos utilitarios |
| React Router | 6 | Navegación entre páginas |
| Vite | 5 | Bundler y servidor de desarrollo |

---

## 📁 Estructura del proyecto
```
src/
  api/
    rickAndMortyApi.ts   # Funciones para consumir la API
  components/
    Card.tsx             # Componente reutilizable de tarjeta
    Navbar.tsx           # Barra de navegación
    Spinner.tsx          # Indicador de carga
  pages/
    CharactersPage.tsx       # Página de personajes con buscador
    CharacterDetailPage.tsx  # Página de detalle de personaje
    EpisodesPage.tsx         # Página de episodios
    LocationsPage.tsx        # Página de locaciones
  types/
    index.ts             # Interfaces y tipos de TypeScript
  App.tsx                # Componente raíz con rutas
  main.tsx               # Punto de entrada
```

---

## ⚙️ Instalación y uso local

### Requisitos previos
- Node.js v18 o superior
- npm v9 o superior

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/rick-and-morty-app.git
```

2. Entra a la carpeta:
```bash
cd rick-and-morty-app
```

3. Instala las dependencias:
```bash
npm install
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre el navegador en:
```
http://localhost:5173
```

---

## 📡 API utilizada

Este proyecto consume la [Rick and Morty API](https://rickandmortyapi.com/), una API REST pública y gratuita.

| Endpoint | Descripción |
|---|---|
| `/character` | Lista de personajes paginada |
| `/character?name=rick` | Búsqueda de personajes por nombre |
| `/character/:id` | Detalle de un personaje |
| `/episode` | Lista de episodios paginada |
| `/location` | Lista de locaciones paginada |

---

## 👨‍💻 Autor
git
Hecho con 💚 por **Luis David Fúquen**

[![GitHub](https://img.shields.io/badge/GitHub-TU_USUARIO-181717?style=flat&logo=github)](https://github.com/TU_USUARIO)