/**
 * 🐉 HYDRA BYPASS - SISTEMA DE LICENCIA
 * Este archivo limpia cualquier licencia existente y crea una nueva válida
 * Diseñado para eliminar completamente las restricciones de licencia
 */

const Store = require('electron-store');
const crypto = require('crypto');

// Configuración del almacenamiento
const store = new Store({
  name: 'license-data',
  encryptionKey: 'app-license-secure-key'
});

// Función para crear una licencia válida
function crearLicenciaHydra() {
  const licenciaHydra = {
    valid: true,
    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 año en el futuro
    clientId: "HYDRA_CLIENT_001",
    clientName: "Usuario Hydra",
    activationDate: new Date().toISOString(),
    timestamp: new Date().toISOString(),
    gameModes: {
      multiplayer: true,
      warzone: true,
      cdl: true
    }
  };

  // Limpiar datos existentes
  store.delete('licenseKey');
  store.delete('licenseStatus');
  store.delete('hardwareId');

  // Crear nueva licencia Hydra
  store.set('licenseKey', 'HYDRA_KEY_2024');
  store.set('licenseStatus', licenciaHydra);
  
  // Crear un hardware ID único
  const hardwareIdHydra = crypto.createHash('sha256')
    .update('HYDRA_HARDWARE_' + Date.now())
    .digest('hex');
  store.set('hardwareId', hardwareIdHydra);

  console.log('🐉 HYDRA BYPASS EJECUTADO EXITOSAMENTE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('📋 Detalles de la Licencia Hydra:');
  console.log('   🎯 Cliente: Usuario Hydra');
  console.log('   🆔 ID Cliente: HYDRA_CLIENT_001');
  console.log('   📅 Expiración: ' + licenciaHydra.expiration);
  console.log('   🎮 Modos de juego: Todos habilitados');
  console.log('   💻 Hardware ID: ' + hardwareIdHydra.substring(0, 8) + '...');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('✅ Sistema de licencia completamente bypassado');
  console.log('🚀 La aplicación está lista para usar sin restricciones');
}

// Ejecutar el bypass Hydra
crearLicenciaHydra(); 