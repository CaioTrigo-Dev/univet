// Corrige o bug de inicialização do jest-expo no SDK 52 que tenta acessar global.window
global.window = global.window || {};
