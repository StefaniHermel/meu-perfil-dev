// ============================================================
// IMPORTAÇÕES
// "import" traz ferramentas de outros arquivos/bibliotecas
// para dentro do nosso arquivo.
// ============================================================
import { StatusBar } from 'expo-status-bar';

// useState é um "Hook" do React: serve para guardar valores que
// mudam com o tempo (como o número de curtidas) e que, quando
// mudam, fazem a tela se atualizar sozinha.
import { useState } from 'react';

import {
  StyleSheet, // cria os estilos (parecido com CSS)
  Text,       // mostra texto na tela
  View,       // caixa/contêiner (parecido com <div>)
  ScrollView, // área que permite rolar a tela
  Pressable,  // área que reage a toques (botão)
  Alert,      // janelinha de aviso
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'; // ícones
import Cabecalho from './components/Cabecalho';    // seu componente


// ============================================================
// COMPONENTE PRINCIPAL
// Em React, a tela é uma função que devolve (return) o que
// deve aparecer.
// ============================================================
export default function App() {

  // ----------------------------------------------------------
  // ESTADO DAS CURTIDAS
  // useState(0) cria uma "caixinha" com valor inicial 0.
  //   curtidas    -> o valor atual (só para LER)
  //   setCurtidas -> a função para MUDAR o valor
  // Nunca se faz "curtidas = 5". Sempre setCurtidas(5).
  // Ao chamar setCurtidas, o React redesenha a tela.
  // ----------------------------------------------------------
  const [curtidas, setCurtidas] = useState(0);

  // Chamada a cada toque no coração: soma 1 ao valor atual.
  function curtir() {
    setCurtidas(curtidas + 1);
  }

  // Chamada ao tocar em "Zerar curtidas": volta ao início (0).
  function zerar() {
    setCurtidas(0);
  }

  // ----------------------------------------------------------
  // MENSAGEM QUE MUDA CONFORME AS CURTIDAS
  // "let" cria uma variável que pode ser alterada.
  // O if / else if escolhe o texto de acordo com o número.
  // Como esse código roda a cada redesenho da tela, a mensagem
  // se atualiza sozinha quando "curtidas" muda.
  // ----------------------------------------------------------
  let mensagem = "Toque no coração para curtir meu perfil!"; // 0 curtidas
  if (curtidas >= 1 && curtidas < 5) {
    mensagem = "Obrigada pela curtida! 💙";                   // 1 a 4
  } else if (curtidas >= 5) {
    mensagem = "Uau, você realmente gostou! 🎉";              // 5 ou mais
  }

  // ----------------------------------------------------------
  // DADOS DO PERFIL (variáveis comuns, não mudam)
  // "const" cria um valor que não será reatribuído.
  // ----------------------------------------------------------
  const nome = "Stefani Hermel";
  const cargo = "Desenvolvedora Mobile em formação";
  const cidade = "Garopaba, SC";
  const email = "contato.hermel@gmail.com";
  const disponivel = true;

  const foto = "https://github.com/StefaniHermel.png";

  const bio =
    "Professora de séries iniciais que decidiu entrar no mundo da tecnologia. " +
    "Estudo desenvolvimento mobile e machine learning, unindo a didática da sala de aula " +
    "com a lógica da programação para criar aplicativos simples e úteis.";

  // Lista (array) de objetos: cada habilidade tem nome, ícone e cores.
  const habilidades = [
    { nome: "JavaScript", icone: "js", cor: "#CA8A04", fundo: "#FEF9C3", texto: "#854D0E" },
    { nome: "HTML", icone: "html5", cor: "#E34F26", fundo: "#FFEDD5", texto: "#9A3412" },
    { nome: "CSS", icone: "css3-alt", cor: "#1572B6", fundo: "#DBEAFE", texto: "#1E40AF" },
    { nome: "React Native", icone: "react", cor: "#0891B2", fundo: "#CFFAFE", texto: "#155E75" },
  ];


  // ----------------------------------------------------------
  // O QUE APARECE NA TELA (JSX)
  // Parece HTML, mas é JavaScript. Tudo que está entre
  // chaves { } é código JavaScript sendo executado.
  // ----------------------------------------------------------
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {/* Seu componente de cabeçalho (foto, nome e cargo) */}
      <Cabecalho foto={foto} nome={nome} cargo={cargo} />

      {/* ======== BOTÃO DE CURTIR ========
          onPress: função chamada quando a pessoa toca no botão.
          style={[a, b]}: junta dois estilos. O segundo só vale
          se a condição antes do && for verdadeira.
          Aqui: "curtidas > 0 && styles.botaoCurtirAtivo" aplica
          o fundo rosa somente quando há pelo menos 1 curtida. */}
      <Pressable
        style={[styles.botaoCurtir, curtidas > 0 && styles.botaoCurtirAtivo]}
        onPress={curtir}
      >
        {/* solid: coração preenchido (true) ou só o contorno (false).
            color: cinza sem curtidas, vermelho com curtidas.
            "condição ? valorSe : valorSenão" é o operador ternário. */}
        <FontAwesome5
          name="heart"
          solid={curtidas > 0}
          size={20}
          color={curtidas > 0 ? "#E11D48" : "#6B7280"}
        />

        {/* Mostra o número e acerta singular/plural:
            1 curtida / 0 curtidas / 2 curtidas */}
        <Text style={[styles.textoCurtir, curtidas > 0 && styles.textoCurtirAtivo]}>
          {curtidas} {curtidas === 1 ? "curtida" : "curtidas"}
        </Text>
      </Pressable>

      {/* Mensagem que definimos lá em cima com if / else if */}
      <Text style={styles.mensagem}>{mensagem}</Text>

      {/* ======== BOTÃO DE ZERAR ========
          "condição && (algo)" = renderização condicional:
          o botão só aparece SE curtidas > 0. */}
      {curtidas > 0 && (
        <Pressable onPress={zerar}>
          <Text style={styles.textoZerar}>Zerar curtidas</Text>
        </Pressable>
      )}

      {/* Cartão: localização + disponibilidade */}
      <View style={styles.cartao}>
        <Text style={styles.rotulo}>📍 Localização</Text>
        <Text style={styles.valor}>{cidade}</Text>

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
      </View>

      {/* Cartão: bio */}
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Sobre mim</Text>
        <Text style={styles.bio} numberOfLines={3}>
          {bio}
        </Text>
      </View>

      {/* Cartão: habilidades
          .map() percorre a lista e cria um item na tela para cada
          habilidade. "key" ajuda o React a identificar cada item. */}
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Habilidades</Text>
        <View style={styles.grade}>
          {habilidades.map((item) => (
            <View
              key={item.nome}
              style={[styles.etiqueta, { backgroundColor: item.fundo }]}
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
            </View>
          ))}
        </View>
      </View>

      {/* Botão de contato: abre um alerta com o e-mail.
          Aqui o style é uma função: "pressed" é true enquanto
          o dedo está apertando, então a cor escurece. */}
      <Pressable
        style={({ pressed }) => [
          styles.botao,
          { backgroundColor: pressed ? "#1E3A8A" : "#4169E1" },
        ]}
        onPress={() => Alert.alert("Contato", email)}
      >
        <Text style={styles.textoBotao}>✉️ Entrar em contato</Text>
      </Pressable>

      <StatusBar style="auto" />
    </ScrollView>
  );
}


// ============================================================
// ESTILOS
// StyleSheet.create funciona como o CSS, mas escrito em
// JavaScript: propriedades em camelCase (backgroundColor, e
// não background-color) e valores entre aspas.
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2FB",
  },
  conteudo: {
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    maxWidth: 480,
    alignSelf: "center",
  },
  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
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
    lineHeight: 22,
    color: "#4B5563",
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
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
  botao: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
  },
  textoBotao: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ---------- Estilos do botão de curtir ----------
  botaoCurtir: {
    flexDirection: "row",   // ícone e texto lado a lado
    alignItems: "center",   // alinhados no meio
    gap: 8,                 // espaço entre o ícone e o texto
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  botaoCurtirAtivo: {       // aplicado só quando há curtidas
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
});