# Frontend - Sistema de Inventario Automotriz

Frontend desarrollado en Angular para el sistema de inventario automotriz.

## Tecnologías Utilizadas

- Angular 16
- TypeScript
- Bootstrap 5
- Font Awesome
- RxJS

## Instalación


1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar el servidor de desarrollo:
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── cargo/
│   │   ├── dashboard/
│   │   ├── mercancia/
│   │   ├── navbar/
│   │   └── usuario/
│   ├── models/
│   ├── services/
│   └── app.module.ts
├── assets/
└── styles.css
```

## Características

- **Dashboard**: Vista principal con estadísticas del sistema
- **Gestión de Mercancías**: CRUD completo con filtros
- **Gestión de Usuarios**: Administración de usuarios del sistema
- **Gestión de Cargos**: Administración de cargos disponibles
- **Diseño Responsivo**: Compatible con dispositivos móviles
- **Interfaz Moderna**: Diseño limpio y profesional

## Configuración del Backend

Asegúrate de que el backend esté ejecutándose en `http://localhost:8080` antes de usar el frontend.

## Comandos Útiles

```bash
# Servidor de desarrollo
ng serve

# Construir para producción
ng build --prod

# Ejecutar pruebas
ng test

# Linting
ng lint
```


