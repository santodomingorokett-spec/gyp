# G&P ZARREA — Plataforma Integral para Bufete Jurídico

Implementación inicial de una **web responsive funcional** para operar un bufete de abogados con enfoque en:

- Gestión de clientes y expedientes.
- Agenda y control de vencimientos.
- Trazabilidad operativa.
- Visión gerencial para toma de decisiones.

## Acceso rápido

### Usuario especial (Dirección)
- Correo: `socio@bufete.co`
- Contraseña: `Admin#2026`

### Usuario estándar
- Correo: `abogado@bufete.co`
- Contraseña: `Abogado#2026`

## Cómo ejecutar

```bash
python -m http.server 8000
```

Abrir en navegador:

- `http://localhost:8000`

## Estructura

- `index.html`: interfaz principal (login y dashboard).
- `styles.css`: estilos responsive.
- `app.js`: lógica funcional del sistema (autenticación, módulos y KPIs).
- `docs/plan-integral-mvp.md`: plan funcional por fases.
- `config/gestion-integral.json`: configuración de módulos, roles, KPIs y flujos.

## Funcionalidades implementadas

- Login funcional por roles.
- Panel especial visible solo para usuario de dirección.
- Registro de expedientes (cliente + tipo de caso).
- Agenda de actividades/audiencias con fecha.
- KPIs dinámicos basados en datos registrados.
- Persistencia local con `localStorage`.
