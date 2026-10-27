// ============================================================
// IMPORTS: trazem para este arquivo o que vamos usar
// ============================================================

// StatusBar controla a barra de status do celular (hora, bateria...)
import { StatusBar } from "expo-status-bar";

// useState é um "Hook" do React: cria variáveis que, quando mudam,
// fazem a tela ser desenhada de novo
import { useState } from "react";

// useRouter nos dá o objeto "router", usado para navegar entre telas
// (Expo Router: cada arquivo dentro de app/ é uma tela)
import { useRouter } from "expo-router";

// Componentes básicos do React Native:
// View = caixa (como uma <div>), Text = texto, ScrollView = área com rolagem,
// Pressable = qualquer coisa que pode ser tocada, Alert = janelinha de aviso,
// StyleSheet = onde criamos os estilos
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

// Ícones (coração, logos de linguagens...)
import { FontAwesome5 } from "@expo/vector-icons";

// Nosso componente do cabeçalho. O "../" sobe uma pasta, porque este
// arquivo está dentro de app/ e o components/ fica na raiz do projeto
import Cabecalho from "../components/Cabecalho";

// A lista de habilidades vive em data/habilidades.js, para que esta tela
// e a tela de detalhe usem os mesmos dados
import { habilidades } from "../data/habilidades";

// ============================================================
// COMPONENTE PRINCIPAL
// "export default" significa que é o componente que o Expo Router
// mostra quando a rota "/" é aberta (index.js = tela inicial)
// ============================================================
export default function App() {
  // Cria o "router". Com ele usamos router.push("/rota") para ir a outra tela
  const router = useRouter();

  // ----------------------------------------------------------
  // ESTADOS (state)
  // Sintaxe: const [valor, funcaoQueMudaOValor] = useState(valorInicial)
  // Nunca mude "curtidas" direto (curtidas = 1). Sempre use setCurtidas,
  // senão o React não sabe que precisa redesenhar a tela.
  // ----------------------------------------------------------
  const [curtidas, setCurtidas] = useState(0); // número de curtidas
  const [recomendacoes, setRecomendacoes] = useState(0); // número de recomendações
  const [disponivel, setDisponivel] = useState(true); // true = disponível, false = não
  const [mostrarHabilidades, setMostrarHabilidades] = useState(true); // mostra/esconde o cartão

  // ----------------------------------------------------------
  // FUNÇÕES
  // ----------------------------------------------------------

  // Soma uma recomendação, mas só até o limite de 10
  function recomendar() {
    if (recomendacoes >= 10) {
      // Alert.alert(título, mensagem) abre uma janelinha de aviso.
      // Obs.: no navegador ela pode não aparecer; no celular funciona.
      Alert.alert("Limite atingido!", "Você já recebeu 10 recomendações.");
      return; // "return" encerra a função aqui, então não soma mais
    }

    setRecomendacoes(recomendacoes + 1);
  }

  // Soma uma curtida
  function curtir() {
    setCurtidas(curtidas + 1);
  }

  // Volta as curtidas para zero
  function zerar() {
    setCurtidas(0);
  }

  // ----------------------------------------------------------
  // RENDERIZAÇÃO CONDICIONAL com if / else if
  // A mensagem muda conforme o número de curtidas.
  // Como "curtidas" é state, a mensagem é recalculada a cada curtida.
  // ----------------------------------------------------------
  let mensagem = "Toque no coração para curtir meu perfil!";

  if (curtidas >= 1 && curtidas < 5) {
    // && significa "e": as duas condições precisam ser verdadeiras
    mensagem = "Obrigada pela curtida! 💙";
  } else if (curtidas >= 5) {
    mensagem = "Uau, você realmente gostou! 🎉";
  }

  // ----------------------------------------------------------
  // DADOS DO PERFIL
  // São constantes comuns, porque nunca mudam. Só vira state o que muda.
  // ----------------------------------------------------------
  const nome = "Stefani Hermel";
  const cargo = "Desenvolvedora Mobile em formação";
  const cidade = "Garopaba, SC";
  const email = "contato.hermel@gmail.com";
  const foto = "https://github.com/StefaniHermel.png";

  // O "+" junta os pedaços de texto em um só
  const bio =
    "Professora de séries iniciais que decidiu entrar no mundo da tecnologia. " +
    "Estudo desenvolvimento mobile e machine learning, unindo a didática da sala de aula " +
    "com a lógica da programação para criar aplicativos simples e úteis.";

  // ----------------------------------------------------------
  // O QUE APARECE NA TELA (JSX)
  // JSX parece HTML, mas é JavaScript. Tudo que está entre { } é código JS.
  // ----------------------------------------------------------
  return (
    // ScrollView permite rolar a tela.
    // style = estilo da própria área; contentContainerStyle = estilo do conteúdo dentro dela
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {/* PROPS: nome="valor" envia dados ao componente filho.
          Lá dentro, o Cabecalho recebe { foto, nome, cargo } */}
      <Cabecalho foto={foto} nome={nome} cargo={cargo} />

      {/* NAVEGAÇÃO: router.push("/recados") abre o arquivo app/recados.js
          e coloca essa tela em cima da pilha (Stack). Por isso aparece o
          botão de voltar no cabeçalho. */}
      <Pressable
        // Array de estilos: o estilo base + um objeto com ajustes só deste botão
        style={[styles.botao, { backgroundColor: "#4169E1", marginBottom: 12 }]}
        onPress={() => router.push("/recados")}
      >
        <Text style={styles.textoBotao}>💬 Mural de recados</Text>
      </Pressable>

      {/* BOTÃO DE CURTIR */}
      <Pressable
        // "curtidas > 0 && estilo": se for verdade, aplica o estilo ativo;
        // se for falso, o React ignora. É um jeito curto de fazer um "if".
        style={[styles.botaoCurtir, curtidas > 0 && styles.botaoCurtirAtivo]}
        onPress={curtir}
      >
        <FontAwesome5
          name="heart"
          // coração cheio (solid) só quando já tem curtida
          solid={curtidas > 0}
          size={20}
          // OPERADOR TERNÁRIO: condição ? seVerdadeiro : seFalso
          color={curtidas > 0 ? "#E11D48" : "#6B7280"}
        />

        <Text
          style={[styles.textoCurtir, curtidas > 0 && styles.textoCurtirAtivo]}
        >
          {/* Usa o ternário para escolher singular ou plural */}
          {curtidas} {curtidas === 1 ? "curtida" : "curtidas"}
        </Text>
      </Pressable>

      {/* Mostra a mensagem calculada lá em cima */}
      <Text style={styles.mensagem}>{mensagem}</Text>

      {/* RENDERIZAÇÃO CONDICIONAL com &&:
          o botão "Zerar" só existe na tela se curtidas > 0 */}
      {curtidas > 0 && (
        <Pressable onPress={zerar}>
          <Text style={styles.textoZerar}>Zerar curtidas</Text>
        </Pressable>
      )}

      {/* CARTÃO DE LOCALIZAÇÃO E DISPONIBILIDADE */}
      <View style={styles.cartao}>
        <Text style={styles.rotulo}>📍 Localização</Text>
        <Text style={styles.valor}>{cidade}</Text>

        {/* O selo troca de cor conforme "disponivel" (verde ou vermelho) */}
        <View
          style={[
            styles.selo,
            { backgroundColor: disponivel ? "#DCFCE7" : "#FEE2E2" },
          ]}
        >
          <Text
            style={[
              styles.seloTexto,
              { color: disponivel ? "#166534" : "#991B1B" },
            ]}
          >
            {disponivel ? "● Disponível para projetos" : "● Indisponível"}
          </Text>
        </View>

        {/* "!disponivel" é o contrário do valor atual: true vira false, false vira true.
            É assim que se faz um botão "liga/desliga" com state booleano. */}
        <Pressable
          style={[
            styles.botaoDisponibilidade,
            { backgroundColor: disponivel ? "#4169E1" : "#15803D" },
          ]}
          onPress={() => setDisponivel(!disponivel)}
        >
          <Text style={styles.textoBotaoDisponibilidade}>
            {disponivel ? "Tornar indisponível" : "Tornar disponível"}
          </Text>
        </Pressable>
      </View>

      {/* CARTÃO SOBRE MIM */}
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Sobre mim</Text>
        {/* numberOfLines={3} corta o texto em 3 linhas, com "..." no final */}
        <Text style={styles.bio} numberOfLines={3}>
          {bio}
        </Text>
      </View>

      {/* Botão que alterna entre mostrar e esconder as habilidades */}
      <Pressable
        style={styles.botaoHabilidades}
        onPress={() => setMostrarHabilidades(!mostrarHabilidades)}
      >
        <Text style={styles.textoBotaoHabilidades}>
          {mostrarHabilidades ? "Esconder habilidades" : "Mostrar habilidades"}
        </Text>
      </Pressable>

      {/* CARTÃO DE HABILIDADES (só aparece se mostrarHabilidades for true) */}
      {mostrarHabilidades && (
        <View style={styles.cartao}>
          <Text style={styles.titulo}>Habilidades</Text>

          <View style={styles.grade}>
            {/* .map() percorre a lista e cria um componente para cada item.
                "item" é uma habilidade de cada vez (JavaScript, HTML, CSS...) */}
            {habilidades.map((item) => (
              <Pressable
                // "key" é obrigatória em listas: ajuda o React a identificar
                // cada item. Precisa ser única, por isso usamos o id.
                key={item.id}
                style={[styles.etiqueta, { backgroundColor: item.fundo }]}
                // Template string com crase: `/habilidades/${item.id}` vira,
                // por exemplo, "/habilidades/js". Esse "js" chega ao arquivo
                // app/habilidades/[id].js como o parâmetro "id".
                onPress={() => router.push(`/habilidades/${item.id}`)}
              >
                <FontAwesome5
                  name={item.icone}
                  size={28}
                  color={item.cor}
                  style={styles.etiquetaIcone}
                />

                <Text style={[styles.etiquetaTexto, { color: item.texto }]}>
                  {item.nome}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* BOTÃO DE CONTATO */}
      <Pressable
        // Quando style é uma função, ela recebe { pressed }, que vale true
        // enquanto o dedo está apertando. Assim a cor escurece ao tocar.
        style={({ pressed }) => [
          styles.botao,
          { backgroundColor: pressed ? "#1E3A8A" : "#4169E1" },
        ]}
        onPress={() => Alert.alert("Contato", email)}
      >
        <Text style={styles.textoBotao}>✉️ Entrar em contato</Text>
      </Pressable>

      {/* BOTÃO DE RECOMENDAÇÕES (máximo de 10) */}
      <Pressable style={styles.botaoRecomendacoes} onPress={recomendar}>
        <Text style={styles.textoBotaoRecomendacoes}>
          👍 Recomendar ({recomendacoes}/10)
        </Text>
      </Pressable>

      {/* Ajusta a cor dos ícones da barra de status automaticamente */}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

// ============================================================
// ESTILOS
// StyleSheet.create organiza os estilos em um objeto. É parecido com
// CSS, mas escrito em JavaScript: nomes em camelCase (backgroundColor,
// não background-color) e valores entre aspas.
// ============================================================
const styles = StyleSheet.create({
  // Fundo da tela inteira. flex: 1 = ocupa todo o espaço disponível
  container: {
    flex: 1,
    backgroundColor: "#EAF2FB",
  },

  // Conteúdo dentro do ScrollView
  conteudo: {
    alignItems: "center", // centraliza os itens na horizontal
    padding: 20, // espaço interno nos 4 lados
    paddingTop: 60, // mais espaço no topo (substitui o padding só em cima)
    paddingBottom: 40,
    maxWidth: 480, // largura máxima (bom para o navegador)
    alignSelf: "center", // centraliza o bloco todo
  },

  // Cartão branco com cantos arredondados e sombra
  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20, // arredondamento dos cantos
    padding: 20,
    marginBottom: 16, // espaço embaixo (margin = espaço de fora)
    width: "100%", // ocupa a largura toda disponível
    // Sombra no iOS e no web:
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Sombra no Android:
    elevation: 4,
  },

  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },

  valor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },

  selo: {
    alignSelf: "flex-start", // não estica: fica só do tamanho do texto
    paddingVertical: 6, // espaço interno em cima e embaixo
    paddingHorizontal: 12, // espaço interno nos lados
    borderRadius: 20,
  },

  seloTexto: {
    fontSize: 14,
    fontWeight: "600",
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },

  bio: {
    fontSize: 15,
    lineHeight: 22, // altura de cada linha de texto
    color: "#4B5563",
  },

  // Grade de 2 colunas das habilidades (o mesmo conceito do flexbox do CSS)
  grade: {
    flexDirection: "row", // itens lado a lado (o padrão no React Native é coluna)
    flexWrap: "wrap", // quando não cabe, quebra para a linha de baixo
    justifyContent: "space-between", // espaço entre os itens
  },

  // Cada habilidade ocupa 48% da largura, então cabem 2 por linha
  etiqueta: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  etiquetaIcone: {
    marginBottom: 6,
  },

  etiquetaTexto: {
    fontSize: 14,
    fontWeight: "700",
  },

  // Estilo base dos botões grandes (usado no mural e no contato)
  botao: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoCurtir: {
    flexDirection: "row", // coração e texto lado a lado
    alignItems: "center", // alinha os dois no centro vertical
    gap: 8, // espaço entre o coração e o texto
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  // Estilo extra aplicado só quando curtidas > 0
  botaoCurtirAtivo: {
    backgroundColor: "#FFE4E6",
    borderColor: "#FDA4AF",
  },

  textoCurtir: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },

  textoCurtirAtivo: {
    color: "#BE123C",
  },

  mensagem: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
    textAlign: "center",
  },

  textoZerar: {
    fontSize: 14,
    fontWeight: "600",
    color: "#BE123C",
    marginBottom: 16,
    textDecorationLine: "underline",
  },

  botaoDisponibilidade: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  textoBotaoDisponibilidade: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  botaoHabilidades: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#4169E1",
  },

  textoBotaoHabilidades: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  botaoRecomendacoes: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#0D5277",
  },

  textoBotaoRecomendacoes: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});