@echo off
color 0A
cls
echo.
echo    ██╗  ██╗██╗   ██╗██████╗ ██████╗  █████╗ 
echo    ██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗██╔══██╗
echo    ███████║ ╚████╔╝ ██║  ██║██████╔╝███████║
echo    ██╔══██║  ╚██╔╝  ██║  ██║██╔══██╗██╔══██║
echo    ██║  ██║   ██║   ██████╔╝██║  ██║██║  ██║
echo    ╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
echo.
echo    ██████╗ ██╗   ██╗██████╗  █████╗ ███████╗███████╗
echo    ██╔══██╗╚██╗ ██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝
echo    ██████╔╝ ╚████╔╝ ██████╔╝███████║███████╗███████╗
echo    ██╔═══╝   ╚██╔╝  ██╔═══╝ ██╔══██║╚════██║╚════██║
echo    ██║        ██║   ██║     ██║  ██║███████║███████║
echo    ╚═╝        ╚═╝   ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝
echo.
echo    ════════════════════════════════════════════════════════════
echo    🐉 SISTEMA DE BYPASS DE LICENCIA AVANZADO
echo    ════════════════════════════════════════════════════════════
echo.

echo [1/4] 🚀 Ejecutando HydraBypass...
node bypass.js

echo.
echo [2/4] 🔍 Verificando instalación del sistema...
if exist "node_modules" (
    echo    ✅ Módulos de Node.js encontrados
) else (
    echo    ⚠️  Módulos de Node.js no encontrados
    echo    📦 Instalando dependencias...
    npm install
)

echo.
echo [3/4] 🧹 Limpiando caché del sistema...
if exist "%APPDATA%\license-data.json" (
    del "%APPDATA%\license-data.json"
    echo    ✅ Caché de licencia limpiado
) else (
    echo    ℹ️  No se encontró caché para limpiar
)

echo.
echo [4/4] ✅ Verificando instalación final...
node test-bypass.js

echo.
echo ════════════════════════════════════════════════════════════
echo 🎉 HYDRA BYPASS INSTALADO EXITOSAMENTE
echo ════════════════════════════════════════════════════════════
echo.
echo 🚀 La aplicación ahora debería iniciar sin verificación
echo    de licencia y con todas las funciones habilitadas.
echo.
echo 📋 Para iniciar la aplicación:
echo    npm start
echo.
echo 🔧 Para verificar el bypass:
echo    node test-bypass.js
echo.
echo 🐉 Para reinstalar el bypass:
echo    node bypass.js
echo.
echo ════════════════════════════════════════════════════════════
echo Presiona cualquier tecla para continuar...
pause > nul 