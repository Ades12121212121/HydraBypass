/**
 * 🐉 HYDRA BYPASS - VERIFICADOR DEL SISTEMA
 * Verifica que todos los componentes del bypass estén funcionando correctamente
 * Diseñado para asegurar que el bypass esté completamente operativo
 */

const Store = require('electron-store');

// Configuración del almacenamiento
const store = new Store({
  name: 'license-data',
  encryptionKey: 'app-license-secure-key'
});

console.log('🐉 HYDRA BYPASS - VERIFICADOR DEL SISTEMA');
console.log('═══════════════════════════════════════════════════════════════\n');

// 1. Verificar que existe la licencia Hydra
console.log('1️⃣ Verificando licencia Hydra...');
const licenseStatus = store.get('licenseStatus');
const licenseKey = store.get('licenseKey');

if (licenseStatus && licenseStatus.valid) {
  console.log('   ✅ Licencia Hydra válida encontrada');
  console.log(`   🎯 Cliente: ${licenseStatus.clientName}`);
  console.log(`   🆔 ID: ${licenseStatus.clientId}`);
  console.log(`   📅 Expiración: ${licenseStatus.expiration}`);
  console.log(`   🎮 Modos de juego: ${Object.keys(licenseStatus.gameModes || {}).join(', ')}`);
} else {
  console.log('   ❌ No se encontró licencia Hydra válida');
  console.log('   💡 Ejecuta: node bypass.js');
}

// 2. Verificar clave de licencia Hydra
console.log('\n2️⃣ Verificando clave de licencia Hydra...');
if (licenseKey && licenseKey.includes('HYDRA')) {
  console.log('   ✅ Clave Hydra encontrada');
  console.log(`   🔑 Clave: ${licenseKey}`);
} else {
  console.log('   ❌ Clave Hydra no encontrada');
}

// 3. Verificar hardware ID
console.log('\n3️⃣ Verificando hardware ID...');
const hardwareId = store.get('hardwareId');
if (hardwareId) {
  console.log('   ✅ Hardware ID encontrado');
  console.log(`   💻 ID: ${hardwareId.substring(0, 8)}...`);
} else {
  console.log('   ❌ Hardware ID no encontrado');
}

// 4. Verificar expiración
console.log('\n4️⃣ Verificando expiración de la licencia...');
if (licenseStatus && licenseStatus.expiration) {
  const expiration = new Date(licenseStatus.expiration);
  const now = new Date();
  const daysLeft = Math.ceil((expiration - now) / (1000 * 60 * 60 * 24));
  
  if (expiration > now) {
    console.log(`   ✅ Licencia válida por ${daysLeft} días`);
  } else {
    console.log('   ❌ Licencia expirada');
  }
} else {
  console.log('   ❌ No se pudo verificar expiración');
}

// 5. Verificar modos de juego
console.log('\n5️⃣ Verificando modos de juego habilitados...');
if (licenseStatus && licenseStatus.gameModes) {
  const modes = licenseStatus.gameModes;
  const enabledModes = Object.entries(modes)
    .filter(([_, enabled]) => enabled)
    .map(([mode]) => mode);
  
  if (enabledModes.length > 0) {
    console.log(`   ✅ Modos habilitados: ${enabledModes.join(', ')}`);
  } else {
    console.log('   ❌ No hay modos habilitados');
  }
} else {
  console.log('   ❌ No se encontraron modos de juego');
}

// Resumen final
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📊 RESUMEN DEL HYDRA BYPASS');
console.log('═══════════════════════════════════════════════════════════════');

const allChecks = [
  licenseStatus && licenseStatus.valid,
  licenseKey && licenseKey.includes('HYDRA'),
  hardwareId,
  licenseStatus && licenseStatus.expiration && new Date(licenseStatus.expiration) > new Date(),
  licenseStatus && licenseStatus.gameModes && Object.values(licenseStatus.gameModes).some(v => v)
];

const passedChecks = allChecks.filter(check => check).length;

if (passedChecks === allChecks.length) {
  console.log('🎉 HYDRA BYPASS COMPLETAMENTE FUNCIONAL');
  console.log('✅ Todos los componentes están activos y operativos');
  console.log('🚀 La aplicación debería iniciar sin problemas');
  console.log('🐉 Sistema de bypass completamente operativo');
} else {
  console.log('⚠️ HYDRA BYPASS PARCIALMENTE FUNCIONAL');
  console.log(`✅ ${passedChecks}/${allChecks.length} componentes activos`);
  console.log('💡 Ejecuta: node bypass.js para completar la instalación');
}

console.log('\n🔧 Comandos útiles:');
console.log('   🚀 Iniciar aplicación: npm start');
console.log('   🔍 Verificar bypass: node test-bypass.js');
console.log('   🐉 Reinstalar bypass: node bypass.js');
console.log('   📦 Instalar dependencias: npm install'); 