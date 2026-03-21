import { ipcMain, app, dialog, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";
createRequire(import.meta.url);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
ipcMain.handle("save-file", async (event, { fileName, buffer }) => {
  try {
    const baseDir = app.getPath("documents");
    const saveDir = path.join(baseDir, "ScoreApp");
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }
    const filePath = path.join(saveDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log("File saved to:", filePath);
    return { filePath };
  } catch (error) {
    console.error("Save file error:", error);
    throw error;
  }
});
ipcMain.handle("download-file", async () => {
  try {
    const baseDir = app.getPath("documents");
    const templatePath = path.join(baseDir, "/ScoreApp/test.csv");
    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file not found");
    }
    const buffer = fs.readFileSync(templatePath);
    const result = await dialog.showSaveDialog({
      defaultPath: "test.csv",
      filters: [
        { name: "Excel Files", extensions: ["csv"] }
      ]
    });
    if (result.canceled || !result.filePath) {
      return { success: false, message: "Download canceled" };
    }
    fs.writeFileSync(result.filePath, buffer);
    return {
      success: true,
      filePath: result.filePath,
      message: "Template downloaded successfully"
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to download template"
    };
  }
});
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
