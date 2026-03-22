# 🐾 Clínica UniVet — Sistema Completo de Gestão Veterinária

Bem-vindo ao repositório do **UniVet**, um sistema completo e moderno para clínicas veterinárias. Este projeto adota uma arquitetura de **monorepo**, englobando um aplicativo móvel para tutores de pets, um painel administrativo web para a clínica, e uma API back-end robusta, tudo integrado com o ecossistema do Firebase.

## 📖 Índice

1. [Visão Geral do Projeto](#-visão-geral-do-projeto)
2. [Arquitetura do Sistema](#-arquitetura-do-sistema)
3. [Padrões de Projeto (Clean, SOLID, DDD)](#%EF%B8%8F-padrões-de-projeto-e-engenharia)
4. [Estrutura do Monorepo](#-estrutura-do-monorepo)
5. [Modelagem do Banco de Dados](#-modelagem-do-banco-de-dados)
6. [Configuração do Ambiente e Firebase](#%EF%B8%8F-configuração-do-ambiente)
7. [Como Executar o Projeto Localmente](#-como-executar-o-projeto)

---

## 🚀 Visão Geral do Projeto

O **UniVet** tem como foco criar um elo digital entre a clínica e os tutores de pets, oferecendo facilidade para marcação de consultas, controle de vacinas e prontuários centralizados.

### Componentes Centrais
- **App Mobile (Tutores):** Permite aos donos de pets agendar serviços, visualizar o histórico clínico, a carteira de vacinação e receber lembretes (push notifications).
- **Painel Web (Veterinários/Admin):** Interface para a equipe da clínica gerenciar horários, cadastrar prontuários, atualizar status de agendamentos e administrar usuários.
- **API Backend (Node.js/Express):** O "coração" do sistema, concentra todas as regras de negócio, segurança e intermedia o acesso ao banco de dados e autenticações.

### 🎨 Filosofia de Design ("Organic Clean")
O sistema adota uma linguagem visual focada em clareza, confiança e saúde:
- **Verde Floresta:** Confiança, saúde e cuidado.
- **Branco:** Higiene, contexto clínico.
- **Laranja Coral:** Interação suave, notificações de alertas.
- **Tipografia:** Nunito (amigável para títulos) + DM Sans (profissional para corpo do texto).

---

## 📐 Arquitetura do Sistema

O sistema é suportado pelo **Firebase**, utilizando *Authentication* para gestão de acesso, *Cloud Firestore* como banco NoSQL escalável, e *Storage* para arquivos (imagens de pets, PDFs de exames).

**Fluxo de Dados Simplificado:**
```text
App Mobile (ou Painel Web) ➝ Requisição HTTP + Bearer Token (Firebase Auth) ➝ API REST (Express) ➝ Firebase Admin SDK ➝ Firestore (pets, appointments, services, vets, etc.)
```

---

## ⚙️ Padrões de Projeto e Engenharia

A API Backend foi desenvolvida para ser escalável, testável e manutenível, guiando-se por três pilares essenciais:

1. **Clean Architecture:** O código é desenhado em camadas (Entities ➝ Use Cases ➝ Interface Adapters ➝ Frameworks & Drivers). O domínio de negócio não conhece bibliotecas externas ou persistência direta no Firestore; toda interação é abstraída via interfaces (Repositórios).
2. **Princípios SOLID:**
   - Classes com Responsabilidade Única (SRP).
   - Injeção de Dependências (DIP) para garantir testabilidade.
   - Substituição de Liskov e Segregação de Interfaces.
3. **Domain-Driven Design (DDD):** Modelagem rica e focada no domínio veterinário:
   - Uso de *Entities* (Pet, Appointment, etc) e *Value Objects* (Schedule).
   - Uso de *Aggregates* para manter a consistência imediata (ex: agendamentos complexos).

---

## 🏗 Estrutura do Monorepo

O repositório está subdividido em 3 projetos autônomos dentro do mesmo repositório:

```bash
/univet
├── /mobile    # App React Native (Expo)
│   ├── src/   # Components, Screens, Contexts, Navigation (React Navigation v7)
│   └── ...
├── /backend   # API RESTful em Node.js / Express
│   ├── src/   # Domain, UseCases, Controllers, Middlewares, Firebase Config
│   └── ...
└── /web       # Painel Admin Responsivo
    ├── src/   # Dashboards, Tabelas de Gestão, Hooks de Dados
    └── ...
```

### Tecnologias Principais

| Camada | Stack | Versões / Notas |
|--------|-------|-----------------|
| **Mobile** | React Native, Expo, TypeScript | SDK 52, React Navigation ^7.x |
| **Backend** | Node.js, Express, TypeScript | Zod (validação), Firebase Admin SDK |
| **Banco** | Cloud Firestore / Auth / Storage | Totalmente focado nas Regras de Segurança do Firestore |
| **Web** | React, TypeScript | ^18.x |

---

## 🗄 Modelagem do Banco de Dados

O banco de dados (*Cloud Firestore*) é modelado nos seguintes principais nós (coleções):

- `users`: Armazena dados do usuário autenticado e a sua regra de acesso (`tutor`, `vet` ou `admin`).
- `pets`: Dados vitais e histórico do animal de estimação (espécie, raça, dono, alergias).
- `vets`: Perfil profissional dos veterinários (CRMV, especialidades, dias/horários).
- `services`: Catálogo de serviços prestados (consultas, banho e tosa, vacinas) com valor e duração.
- `appointments`: Controle central de agendamentos (IDs referenciando o pet, veterinário, serviço, status do atendimento).
- `medical_records`: Prontuário médico detalhado, contendo diagnóstico, remédios e prescrições inseridas pelo Vet.
- `vaccines`: Carteirinha de vacinação digital do Pet.

> *Dica: As Regras de Segurança (Firestore Rules) protegem a integridade do sistema, permitindo que tutores acessem somente os próprios animais e consultas, enquanto veterinários e administradores operam em dados gerais.*

---

## 🛠️ Configuração do Ambiente

### 1. Pré-Requisitos
Certifique-se de que a sua máquina atende aos requisitos abaixo:
- **Node.js** v20.x ou superior (Recomendado utilizar via NVM: `nvm use --lts`);
- **Expo CLI** (`npm install -g expo-cli eas-cli`);

### 2. Configurando as Variáveis de Ambiente e Firebase
É indispensável criar um projeto no Firebase (com Auth, Firestore e Storage ativados) e parametrizá-lo nos diferentes escopos.

#### No Frontend (`mobile/` e `web/`):
Crie um arquivo `.env` para declarar as chaves públicas:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_chave
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
EXPO_PUBLIC_API_URL=http://localhost:3000
```

#### No Backend (`backend/`):
Crie um arquivo `.env` para definir a porta do servidor e também faça o download da **Chave de Serviço (Service Account Key)** gerada via painel do Firebase Admin:
```env
PORT=3000
NODE_ENV=development
```
Baixe a sua Chave Privada Firebase (`serviceAccountKey.json`) e guarde-a em `backend/src/config/serviceAccountKey.json` **(IMPORTANTE: Nunca suba esta chave no git!)**.

---

## 💻 Como Executar o Projeto

Com os pré-requisitos listados instanciados, basta subir as instâncias:

**1. Clone e instale as dependências:**
```bash
git clone https://github.com/edufilhocruz/univet.git
cd univet

cd backend && npm install
cd ../mobile && npm install
cd ../web && npm install
```

**2. Iniciando a API Backend:**
```bash
cd backend
npm run dev
# A API iniciará rodando em http://localhost:3000
```

**3. Iniciando o App Mobile (Expo):**
```bash
cd mobile
npx expo start
# Escaneie o QR Code em seu celular via app Expo Go (ou emulador /dispositivo físico)
```

**4. Iniciando o Painel Admin (Web):**
```bash
cd web
npm start
# O painel inicializará em http://localhost:3001
```

> 🤝 **Contribuição:** Para enviar Pull Requests, certifique-se de seguir as normativas do Clean Architecture e evite comprometer as chaves secretas.

---
**Clínica UniVet** 🐾 - Construindo saúde e confiança, lado a lado.
