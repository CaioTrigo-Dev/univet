const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Encontra a raiz do projeto atual (mobile) e a raiz do Monorepo (univet)
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../');

const config = getDefaultConfig(projectRoot);

// 1. Diz ao Metro para vigiar arquivos de toda a extensão do Monorepo (incluindo packages/shared)
config.watchFolders = [workspaceRoot];

// 2. Ensina ao Metro como buscar os módulos npm na ordem correta (primeiro no mobile, depois na raiz do Monorepo)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Otimiza o cache desativando restrições de node_modules estritos
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
