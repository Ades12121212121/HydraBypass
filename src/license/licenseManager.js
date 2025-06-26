const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");
const Store = require("electron-store");
const si = require("systeminformation");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

class LicenseManager {
  constructor(options = {}) {
    this.mainWindow = null;
    this.options = {
      licenseServerUrl: "XXXXXXXX",
      activationServerUrl: "XXXXXXXX",
      encryptionKey: "XXXXXXXXXX",
      ...options,
    };

    // Configuration pour stockage persistant
    this.store = new Store({
      encryptionKey: this.options.encryptionKey,
      schema: {
        licenseKey: {
          type: "string",
        },
        hardwareId: {
          type: "string",
        },
        licenseStatus: {
          type: "object",
        },
      },
    });

    // Initialiser les écouteurs IPC
    this.initIPCListeners();
  }

  // Initialiser la fenêtre de licence
  async showLicenseWindow() {
    // Si une fenêtre existe déjà, la fermer
    if (this.mainWindow) {
      this.mainWindow.close();
      this.mainWindow = null;
    }

    // Créer la fenêtre
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 800,
      show: false, // Ne pas afficher immédiatement
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "licensePreload.js"),
      },
      icon: path.join(__dirname, "../../assets/icon.ico"),
    });

    // Charger le fichier HTML
    await this.mainWindow.loadFile(path.join(__dirname, "licenseView.html"));

    // Afficher la fenêtre une fois chargée
    this.mainWindow.once("ready-to-show", () => {
      this.mainWindow.show();
    });

    // Désactiver le menu pour la production
    // this.mainWindow.setMenu(null);

    // Ouvrir DevTools en développement
    if (process.env.NODE_ENV === "development") {
      this.mainWindow.webContents.openDevTools();
    }

    return new Promise((resolve) => {
      // Écouter l'événement de licence validée
      ipcMain.once("license-validated", () => {
        console.log("Licence validée, fermeture de la fenêtre de vérification");
        const licenseStatus = this.store.get("licenseStatus");

        if (this.mainWindow) {
          this.mainWindow.close();
          this.mainWindow = null;
        }

        resolve(licenseStatus);
      });

      // S'assurer que la résolution est appelée même si la fenêtre est fermée manuellement
      this.mainWindow.on("closed", () => {
        // Nettoyer la référence
        if (this.mainWindow) {
          this.mainWindow = null;
        }

        // Si l'événement license-validated n'a pas été déclenché, on résout quand même
        // Cela permettra à l'application de continuer même si l'utilisateur ferme la fenêtre
        const licenseStatus = this.store.get("licenseStatus");
        resolve(licenseStatus);
      });
    });
  }

  // Initialiser les écouteurs IPC
  initIPCListeners() {
    ipcMain.handle("validate-license", async (event, licenseKey) => {
      const hardwareId =
        this.store.get("hardwareId") || (await this.generateHardwareId());
      this.store.set("licenseKey", licenseKey);

      // Vérifier si c'est la première utilisation
      const existingLicenseStatus = this.store.get("licenseStatus");

      if (!existingLicenseStatus || !existingLicenseStatus.valid) {
        // Première utilisation - activer la licence
        return this.activateLicense(licenseKey, hardwareId);
      } else {
        // Utilisation ultérieure - vérifier la licence
        return this.validateLicense(licenseKey, hardwareId);
      }
    });

    ipcMain.handle("get-license-status", () => {
      return this.store.get("licenseStatus");
    });

    ipcMain.handle("get-saved-license", () => {
      return this.store.get("licenseKey");
    });

    ipcMain.handle("get-hardware-id", async () => {
      return this.store.get("hardwareId") || (await this.generateHardwareId());
    });

    ipcMain.handle("get-activation-date", () => {
      const licenseStatus = this.store.get("licenseStatus");
      return licenseStatus ? licenseStatus.activationDate : null;
    });

    ipcMain.handle("clear-license", () => {
      // HYDRA BYPASS: No limpiar realmente la licencia, mantener el bypass activo
      console.log("🐉 HYDRA BYPASS CLEAR: Manteniendo licencia Hydra activa");
      
      // Crear una nueva licencia Hydra en lugar de limpiar
      const fakeLicenseStatus = {
        valid: true,
        expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
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
      
      this.store.set("licenseStatus", fakeLicenseStatus);
      this.store.set("licenseKey", "HYDRA_KEY_2024");
      
      return true;
    });
  }

  // Générer un ID matériel unique
  async generateHardwareId() {
    try {
      // Récupérer des informations matérielles
      const [cpu, system, uuid, disk] = await Promise.all([
        si.cpu(),
        si.system(),
        si.uuid(),
        si.diskLayout(),
      ]);

      // Créer une empreinte unique basée sur le matériel
      const hardwareInfo = JSON.stringify({
        cpuId:
          cpu.manufacturer + cpu.brand + cpu.family + cpu.model + cpu.stepping,
        systemId: system.manufacturer + system.model + system.serial,
        diskId: disk.length > 0 ? disk[0].serialNum : "",
        uuid: uuid.os,
      });

      // Créer un hash de ces informations
      const hardwareId = crypto
        .createHash("sha256")
        .update(hardwareInfo)
        .digest("hex");

      // Sauvegarder l'ID matériel
      this.store.set("hardwareId", hardwareId);
      return hardwareId;
    } catch (error) {
      console.error("Erreur lors de la génération de l'ID matériel:", error);
      // En cas d'échec, générer un UUID aléatoire
      const fallbackId = uuidv4();
      this.store.set("hardwareId", fallbackId);
      return fallbackId;
    }
  }

  // Activer la licence (première utilisation)
  async activateLicense(licenseKey, hardwareId) {
    // HYDRA BYPASS: No hacer llamadas al servidor, retornar éxito inmediatamente
    console.log("🐉 HYDRA BYPASS ACTIVATION: Activación de licencia simulada");
    
    const fakeResult = {
      valid: true,
      expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      clientId: "HYDRA_CLIENT_001",
      clientName: "Usuario Hydra",
      activationDate: new Date().toISOString(),
      gameModes: {
        multiplayer: true,
        warzone: true,
        cdl: true
      }
    };

    // Guardar la licencia Hydra
    this.store.set("licenseStatus", {
      valid: fakeResult.valid,
      expiration: fakeResult.expiration,
      clientId: fakeResult.clientId,
      clientName: fakeResult.clientName,
      activationDate: fakeResult.activationDate,
      timestamp: new Date().toISOString(),
      gameModes: fakeResult.gameModes
    });

    // Enviar resultado Hydra a la interfaz
    if (this.mainWindow) {
      this.mainWindow.webContents.send("license-result", fakeResult);
    }

    return true;
  }

  // Valider la licence avec le serveur
  async validateLicense(licenseKey, hardwareId) {
    // HYDRA BYPASS: No hacer llamadas al servidor, retornar éxito inmediatamente
    console.log("🐉 HYDRA BYPASS VALIDATION: Validación de licencia simulada");
    
    const fakeResult = {
      valid: true,
      expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      clientId: "HYDRA_CLIENT_001",
      clientName: "Usuario Hydra",
      activationDate: new Date().toISOString(),
      gameModes: {
        multiplayer: true,
        warzone: true,
        cdl: true
      }
    };

    // Actualizar la licencia Hydra
    this.store.set("licenseStatus", {
      valid: fakeResult.valid,
      expiration: fakeResult.expiration,
      clientId: fakeResult.clientId,
      clientName: fakeResult.clientName,
      activationDate: fakeResult.activationDate,
      timestamp: new Date().toISOString(),
      gameModes: fakeResult.gameModes
    });

    // Enviar resultado Hydra a la interfaz
    if (this.mainWindow) {
      this.mainWindow.webContents.send("license-result", fakeResult);
    }

    return true;
  }

  // Vérifier si une licence valide existe
  checkExistingLicense() {
    // HYDRA BYPASS: Siempre retornar una licencia válida
    const fakeLicenseStatus = {
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

    // Guardar la licencia Hydra en el almacenamiento
    this.store.set("licenseStatus", fakeLicenseStatus);
    this.store.set("licenseKey", "HYDRA_KEY_2024");

    console.log("🐉 HYDRA BYPASS ACTIVADO: Licencia válida generada automáticamente");
    return fakeLicenseStatus;
  }
}

module.exports = LicenseManager;
