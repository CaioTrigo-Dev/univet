# 🐾 Clínica UniVet

O **UniVet** é um sistema completo para uma clínica veterinária, permitindo que tutores agendem consultas, acompanhem a saúde dos seus pets e recebam notificações de forma prática e centralizada.

## 🚀 Tecnologias Integradas

| Camada | Tecnologia |
|--------|------------|
| **Mobile** | React Native (Expo) + TypeScript |
| **Backend** | Node.js + Express (TypeScript) |
| **Web** | React + TypeScript |
| **Banco / Auth** | Firebase (Firestore, Auth, Storage) |

## 🏗️ Estrutura do Monorepo

O sistema utiliza arquitetura de monorepo estruturada em 3 frentes:

- `/mobile`: App React Native desenvolvido para os tutores (agendamentos, carteira de vacinação, prontuários).
- `/backend`: API REST em Node.js/Express, responsável pela validação, negócio e persistência no Firebase.
- `/web`: Painel administrativo em React para veterinários e administradores gerenciarem a clínica.

## 📐 Padrões de Projeto & Arquitetura

O foco central deste projeto é escalabilidade e manutenção, adotando práticas rigorosas para a API:
- **Clean Architecture:** Camadas bem definidas (Domain, Application, Interface Adapters e Frameworks).
- **SOLID:** Princípios aplicados em serviços, casos de uso e injeção de dependências.
- **Domain-Driven Design (DDD):** Modelagem rica baseada no domínio veterinário (Entidades, Aggregates, Value Objects).

## 📥 Como executar o projeto localmente

1. Faça o clone do repositório:
```bash
git clone https://github.com/edufilhocruz/univet.git
cd univet
```

2. Instale as dependências nas respectivas pastas:
```bash
# Instalando no Backend
cd backend && npm install

# Instalando no App Mobile
cd ../mobile && npm install

# Instalando no Painel Web
cd ../web && npm install
```

3. Configure o Firebase Server e chaves de ambiente:
Crie os arquivos `.env` necessários dentro do `/backend`, `/mobile` e `/web` de acordo com os serviços de Firebase configurados.

4. Inicialize os serviços:
```bash
# Backend (na pasta /backend)
npm run dev

# App Mobile (na pasta /mobile)
npx expo start

# Painel Web (na pasta /web)
npm start
```
