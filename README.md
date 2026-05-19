# 🛸 Rick and Morty App

Aplicativo mobile desenvolvido em React Native com Expo que consome a [Rick and Morty API](https://rickandmortyapi.com/) e exibe informações sobre os personagens da série.

## 📱 Funcionalidades

- ✅ **Listagem de Personagens**: Exibe todos os personagens com imagens e informações
- ✅ **Scroll Infinito**: Carrega mais personagens automaticamente ao rolar
- ✅ **Pull to Refresh**: Arraste para baixo para atualizar a lista
- ✅ **Indicador de Status**: Mostra se o personagem está vivo, morto ou desconhecido
- ✅ **Loading States**: Indicadores de carregamento durante requisições
- ✅ **Tratamento de Erros**: Mensagens amigáveis e opção de tentar novamente
- ✅ **Design Responsivo**: Interface moderna e intuitiva

## 🎨 Informações Exibidas

Para cada personagem, o app mostra:
- **Foto/Avatar** do personagem
- **Nome** completo
- **Status** (Alive/Dead/Unknown) com indicador visual colorido
- **Espécie** (Human, Alien, etc.)
- **Origem** (planeta ou dimensão de origem)
- **Localização** atual do personagem

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- npm ou yarn
- Expo Go instalado no celular (opcional, para testar no dispositivo físico)

### Instalação

1. **Clone ou navegue até o diretório do projeto**

2. **Instale as dependências**:
```bash
npm install
```

3. **Inicie o projeto**:
```bash
npm start
```
ou
```bash
expo start
```

4. **Execute no dispositivo**:
   - **iOS**: Pressione `i` ou escaneie o QR code com a câmera do iPhone
   - **Android**: Pressione `a` ou escaneie o QR code com o app Expo Go
   - **Web**: Pressione `w` para abrir no navegador

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para desenvolvimento e deploy
- **Rick and Morty API**: API pública gratuita sem necessidade de autenticação

## 📦 Dependências

```json
{
  "expo": "~54.0.33",
  "expo-status-bar": "~3.0.9",
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

## 🌐 API Utilizada

**Endpoint**: `https://rickandmortyapi.com/api/character`

A API retorna dados estruturados sobre os personagens da série, incluindo:
- Informações básicas (nome, status, espécie)
- Imagens de alta qualidade
- Dados de origem e localização
- Suporta paginação automática

## 📱 Screenshots

O app inclui:
- **Tela de Loading**: Exibida durante o carregamento inicial
- **Lista de Personagens**: Cards com imagem e informações
- **Header Customizado**: Com título e contador de personagens
- **Scroll Infinito**: Carrega automaticamente mais dados

## 🎯 Recursos Implementados

### Estados da Aplicação
- **Loading**: Indicador durante carregamento
- **Success**: Lista de personagens renderizada
- **Error**: Mensagem de erro com botão de retry
- **Refreshing**: Pull-to-refresh ativo

### Componentes React Native
- `FlatList`: Lista otimizada com scroll infinito
- `Image`: Carregamento e cache de imagens
- `ActivityIndicator`: Indicadores de loading
- `RefreshControl`: Pull-to-refresh
- `TouchableOpacity`: Cards interativos

### Hooks Utilizados
- `useState`: Gerenciamento de estados
- `useEffect`: Carregamento inicial dos dados

## 🔄 Fluxo de Dados

1. App inicializa e chama a API
2. Dados são armazenados no estado
3. FlatList renderiza os personagens
4. Ao rolar até o final, mais dados são carregados
5. Pull-to-refresh recarrega a primeira página

## 💡 Melhorias Futuras

- [ ] Implementar busca por nome
- [ ] Adicionar filtros (status, espécie, gênero)
- [ ] Tela de detalhes do personagem
- [ ] Favoritar personagens (AsyncStorage)
- [ ] Modo escuro (Dark Mode)
- [ ] Animações de transição
- [ ] Cache de imagens offline

## 📝 Licença

Este é um projeto educacional desenvolvido para demonstração de consumo de APIs em React Native.

---

Desenvolvido com ❤️ usando React Native + Expo
