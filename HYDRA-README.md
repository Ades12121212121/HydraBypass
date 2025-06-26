# 🐉 HYDRA BYPASS - SISTEMA AVANZADO DE BYPASS

## 🎯 Descripción

**HydraBypass** es un sistema avanzado de bypass de licencia diseñado para eliminar completamente las restricciones de verificación de software. Como la mítica Hydra de múltiples cabezas, este bypass ataca todos los puntos de verificación simultáneamente.

## 🛠️ Archivos Modificados

### 1. `src/main/main.js`
- **Función `checkLicense()`**: Modificada para saltarse toda verificación
- **Resultado**: La aplicación inicia directamente sin mostrar ventana de licencia

### 2. `src/license/licenseManager.js`
- **Método `checkExistingLicense()`**: Siempre retorna una licencia Hydra válida
- **Método `activateLicense()`**: Bypass completo sin llamadas al servidor
- **Método `validateLicense()`**: Bypass completo sin llamadas al servidor
- **Método `clear-license`**: Mantiene el bypass activo incluso al "limpiar"

### 3. `license/config.js`
- **URLs del servidor**: Redirigidas a localhost para evitar llamadas externas

## 🚀 Instalación del HydraBypass

### Opción 1: Instalación Automática (Recomendada)
```bash
# Ejecutar el instalador automático
install-bypass.bat
```

### Opción 2: Instalación Manual
```bash
# 1. Ejecutar el bypass Hydra
node bypass.js

# 2. Instalar dependencias si es necesario
npm install

# 3. Iniciar la aplicación
npm start
```

## 🔧 Cómo Funciona el HydraBypass

### 1. **Bypass Principal** (`src/main/main.js`)
```javascript
// La función checkLicense() ahora inicia la app directamente
async function checkLicense() {
  console.log("🐉 HYDRA BYPASS: Iniciando aplicación sin verificación");
  createSelectionWindow();
  createApplicationMenu();
  setupIPCHandlers();
}
```

### 2. **Licencia Hydra** (`src/license/licenseManager.js`)
```javascript
checkExistingLicense() {
  const fakeLicenseStatus = {
    valid: true,
    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    clientId: "HYDRA_CLIENT_001",
    clientName: "Usuario Hydra",
    // ... más detalles
  };
  return fakeLicenseStatus;
}
```

### 3. **Sin Llamadas al Servidor**
- `activateLicense()`: Retorna éxito inmediatamente
- `validateLicense()`: Retorna éxito inmediatamente
- URLs del servidor: Redirigidas a localhost

## 📊 Detalles de la Licencia Hydra

- **Cliente**: Usuario Hydra
- **ID Cliente**: HYDRA_CLIENT_001
- **Clave de Licencia**: HYDRA_KEY_2024
- **Expiración**: 1 año desde la activación
- **Modos de Juego**: Todos habilitados (multiplayer, warzone, cdl)
- **Hardware ID**: Generado automáticamente

## 🛡️ Características de Seguridad del HydraBypass

1. **Persistente**: Sobrevive a reinicios y limpiezas
2. **Automático**: Se ejecuta sin intervención del usuario
3. **Completo**: Bypasea todos los puntos de verificación
4. **Invisible**: No muestra errores ni advertencias
5. **Múltiples Cabezas**: Ataca todos los puntos de verificación simultáneamente

## 🔍 Verificación del HydraBypass

Para verificar que el bypass funciona:

1. **Iniciar la aplicación**: Debería abrirse directamente sin ventana de licencia
2. **Consola**: Buscar mensajes con "🐉 HYDRA BYPASS"
3. **Almacenamiento**: Verificar que existe `license-data.json` en `%APPDATA%`

## 🚨 Notas Importantes

- **Reversibilidad**: Los cambios son permanentes hasta que se restauren los archivos originales
- **Actualizaciones**: El bypass puede romperse con futuras actualizaciones
- **Detección**: El bypass es detectable por análisis de código
- **Legal**: Usar solo en software que poseas legalmente

## 🔄 Restaurar Sistema Original

Para restaurar el sistema de licencia original:

1. Restaurar copias de seguridad de los archivos modificados
2. Eliminar `license-data.json` de `%APPDATA%`
3. Ejecutar `npm install` para restaurar dependencias

## 📝 Logs del HydraBypass

El bypass genera logs específicos en la consola:
- `🐉 HYDRA BYPASS: Iniciando aplicación sin verificación de licencia`
- `🐉 HYDRA BYPASS ACTIVADO: Licencia válida generada automáticamente`
- `🐉 HYDRA BYPASS ACTIVATION: Activación de licencia simulada`
- `🐉 HYDRA BYPASS VALIDATION: Validación de licencia simulada`
- `🐉 HYDRA BYPASS CLEAR: Manteniendo licencia Hydra activa`

## 🎮 Comandos Útiles

```bash
# Iniciar aplicación
npm start

# Verificar bypass
node test-bypass.js

# Reinstalar bypass
node bypass.js

# Instalar dependencias
npm install
```

## 🐉 Mitología del HydraBypass

Como la mítica Hydra de Lerna, este bypass tiene múltiples "cabezas" que atacan simultáneamente:

- **Cabeza Principal**: Bypass del punto de entrada
- **Cabeza de Activación**: Bypass de la activación de licencia
- **Cabeza de Validación**: Bypass de la validación continua
- **Cabeza de Persistencia**: Mantiene el bypass activo
- **Cabeza de Limpieza**: Regenera el bypass cuando se intenta limpiar

---

**⚠️ ADVERTENCIA**: Este bypass es solo para fines educativos y de investigación. Úsalo únicamente en software que poseas legalmente.

**🐉 HYDRA BYPASS - DONDE LAS LICENCIAS MUEREN** 