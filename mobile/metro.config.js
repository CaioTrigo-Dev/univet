const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

// Firebase v10+ precisa do campo exports para encontrar seu build React Native
// Com packageExports=false, o Firebase usa o campo main (build Node.js) que quebra no RN
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ['require', 'react-native', 'browser', 'default'];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// @expo/metro-runtime is auto-injected by Expo as a pre-module for ALL platforms.
// On native (iOS/Android) its install.native.ts seals global.fetch and installs
// window.location BEFORE the app runs, corrupting Firebase Auth initialization.
// We remove it from pre-modules entirely; for web it is explicitly imported first
// in index.web.js so it still polyfills the browser environment correctly.
const originalGetModules = config.serializer.getModulesRunBeforeMainModule;
config.serializer.getModulesRunBeforeMainModule = (entryFilePath) => {
  const modules = originalGetModules ? originalGetModules(entryFilePath) : [];
  return modules.filter(m => !m.includes('metro-runtime'));
};

// Força todos os imports de 'react' e 'react/*' a resolver do mobile/node_modules
// para evitar conflito quando pacotes do root usam uma versão diferente do React.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react' || moduleName.startsWith('react/')) {
    try {
      const resolved = require.resolve(moduleName, { paths: [projectRoot] });
      return { filePath: resolved, type: 'sourceFile' };
    } catch {
      return context.resolveRequest(context, moduleName, platform);
    }
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
