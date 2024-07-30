# Sistema de Agenda de Salas de Cine - Frontend

Este proyecto es el frontend del sistema de agenda para una sala de cine, desarrollado con Next.js y Tailwind CSS. El sistema permite a los usuarios ver la disponibilidad de las salas y reservar boletos.

## Requisitos Previos

- Node.js (v14 o superior)
- npm, yarn o cualquier empaquetador de tu preferencia

## Instalación

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/cesarsw-a11/cine-agenda-frontend
    ```

2. **Instalar dependencias**

    ```bash
    cd cine-agenda-frontend
    pnpm install
    ```

    o si prefieres usar yarn:

    ```bash
    pnpm install
    ```

3. **Configurar el entorno**

    Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias, como lo es la url hacia la API en nest js:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001/
    ```

## Ejecución

1. **Iniciar la aplicación**

    ```bash
    pnpm run dev
    ```


2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.