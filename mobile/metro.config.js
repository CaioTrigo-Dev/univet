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
