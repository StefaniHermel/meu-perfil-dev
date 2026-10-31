// ============================================================
// TELA SOBRE
// Mostra as informações completas sobre a Stefani
// ============================================================

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

// Meus textos — edite aqui quando quiser mudar algo
const topicos = [
  {
    id: "quem-sou",
    icone: "user",
    cor: "#7C3AED",
    fundo: "#EDE9FE",
    titulo: "Quem sou eu",
    texto: "Olá, sou Stefani Hermel! 👋 Desenvolvedora Mobile em formação | Criação de projetos digitais. Sou apaixonada por tecnologia, criatividade e pela possibilidade de transformar ideias em projetos que façam a diferença.",
  },
  {
    id: "estudos",
    icone: "graduation-cap",
    cor: "#0891B2",
    fundo: "#CFFAFE",
    titulo: "Estudos",
    texto: "Atualmente, estou me especializando em Desenvolvimento Mobile e ampliando meus conhecimentos em JavaScript, HTML, CSS e React Native, além de estudar desenvolvimento web, análise de dados e inteligência artificial.",
  },
  {
    id: "experiencia",
    icone: "heart",
    cor: "#DB2777",
    fundo: "#FCE7F3",
    titulo: "Experiência e valores",
    texto: "Minha experiência profissional em diferentes áreas me ensinou a valorizar a comunicação, a organização e a compreensão das necessidades de cada pessoa. Acredito que um bom projeto começa com uma boa ideia, mas se torna especial quando é desenvolvido com dedicação, atenção aos detalhes e foco em quem vai utilizá-lo.",
  },
  {
    id: "o-que-faco",
    icone: "laptop-code",
    cor: "#CA8A04",
    fundo: "#FEF9C3",
    titulo: "O que eu faço",
    texto: "Ofereço desenvolvimento de projetos digitais personalizados, buscando criar soluções práticas, funcionais e com identidade própria, de acordo com as necessidades de cada cliente. Posso colaborar na criação de páginas web, interfaces digitais, protótipos e projetos mobile, sempre buscando evoluir tecnicamente e entregar um trabalho cuidadoso e bem estruturado.",
  },
  {
    id: "contato",
    icone: "rocket",
    cor: "#059669",
    fundo: "#D1FAE5",
    titulo: "Vamos conversar?",
    texto: "Estou aberta a novos desafios, parcerias e oportunidades para transformar ideias em realidade, construindo projetos que unam tecnologia, criatividade e propósito. Tem uma ideia e gostaria de tirá-la do papel? Será um prazer conhecer seu projeto e pensar juntos em como desenvolvê-lo. 🚀",
  },
];

export default function Sobre() {
  return (
    <ScrollView
      style={estilos.tela}
      // contentContainerStyle: estilo do CONTEÚDO que rola.
      // flexGrow: 1 deixa a rolagem funcionar mesmo com pouco conteúdo,
      // e paddingBottom garante que o último cartão não fique cortado.
      contentContainerStyle={estilos.conteudo}
    >
      {/* Título da aba no navegador */}
      <Stack.Screen options={{ title: "Sobre mim" }} />

      <Text style={estilos.tituloPagina}>Sobre mim</Text>

      {/* map: para cada item da lista, cria um cartão na tela */}
      {topicos.map((item) => (
        <View
          key={item.id}
          style={[estilos.cartao, { backgroundColor: item.fundo }]}
        >
          <View style={estilos.linhaTitulo}>
            <FontAwesome5 name={item.icone} size={20} color={item.cor} />
            <Text style={[estilos.tituloCartao, { color: item.cor }]}>
              {item.titulo}
            </Text>
          </View>
          <Text style={estilos.texto}>{item.texto}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  conteudo: {
    flexGrow: 1, // ← permite rolar
    padding: 20,
    paddingBottom: 60, // ← espaço extra no fim, nada fica cortado
    gap: 16,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  tituloPagina: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cartao: {
    borderRadius: 16,
    padding: 20,
    gap: 10,
  },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tituloCartao: {
    fontSize: 18,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
});
