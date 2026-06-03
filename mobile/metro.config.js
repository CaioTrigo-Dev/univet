const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Força todos os imports de 'react' e 'react/*' a usar o React 19
// do mobile/node_modules, independente de qual pacote está importando.
// Sem isso, pacotes do root (react-navigation etc.) importam React 18
// enquanto o app usa React 19 → "Invalid hook call".
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
