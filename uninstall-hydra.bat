@echo off
color 0C
cls
echo.
echo    ██╗  ██╗██╗   ██╗██████╗ ██████╗  █████╗ 
echo    ██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗██╔══██╗
echo    ███████║ ╚████╔╝ ██║  ██║██████╔╝███████║
echo    ██╔══██║  ╚██╔╝  ██║  ██║██╔══██╗██╔══██║
echo    ██║  ██║   ██║   ██████╔╝██║  ██║██║  ██║
echo    ╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
echo.
echo    ════════════════════════════════════════════════════════════
echo    🚫 DESINSTALACIÓN DEL HYDRA BYPASS
echo    ════════════════════════════════════════════════════════════
echo.

echo ⚠️  ADVERTENCIA: Esta acción eliminará completamente el HydraBypass
echo    y restaurará el sistema de licencia original.
echo.
echo ¿Estás seguro de que quieres continuar? (S/N)
set /p confirm=

if /i "%confirm%"=="S" (
    echo.
    echo [1/4] 🧹 Limpiando datos de licencia...
    if exist "%APPDATA%\license-data.json" (
        del "%APPDATA%\license-data.json"
        echo    ✅ Datos de licencia eliminados
    ) else (
        echo    ℹ️  No se encontraron datos para eliminar
    )
    
    echo.
    echo [2/4] 🔄 Restaurando archivos originales...
    echo    ⚠️  Necesitas restaurar manualmente los archivos:
    echo       - src/main/main.js
    echo       - src/license/licenseManager.js
    echo       - license/config.js
    echo       desde tus copias de seguridad.
    
    echo.
    echo [3/4] 📦 Reinstalando dependencias originales...
    npm install
    
    echo.
    echo [4/4] ✅ Verificando desinstalación...
    echo    ℹ️  Verifica que la aplicación funcione correctamente
    
    echo.
    echo ════════════════════════════════════════════════════════════
    echo 🚫 HYDRA BYPASS DESINSTALADO
    echo ════════════════════════════════════════════════════════════
    echo.
    echo El sistema de licencia original ha sido restaurado.
    echo La aplicación ahora requerirá una licencia válida.
    echo.
    echo ════════════════════════════════════════════════════════════
) else (
    echo.
    echo ❌ Desinstalación cancelada por el usuario.
    echo El HydraBypass permanece activo.
)

echo Presiona cualquier tecla para continuar...
pause > nul 