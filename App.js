
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import Cabecalho from "./components/Cabecalho";

export default function App() {
  // Estados do aplicativo
  const [curtidas, setCurtidas] = useState(0);
  const [recomendacoes, setRecomendacoes] = useState(0);
  const [disponivel, setDisponivel] = useState(true);
  const [mostrarHabilidades, setMostrarHabilidades] = useState(true);

  // Adiciona uma recomendação, respeitando o limite de 10
  function recomendar() {
    if (recomendacoes >= 10) {
      Alert.alert(
        "Limite atingido!",
        "Você já recebeu 10 recomendações."
      );
      return;
    }

    setRecomendacoes(recomendacoes + 1);
  }

  // Curtidas do perfil
  function curtir() {
    setCurtidas(curtidas + 1);
  }

  function zerar() {
    setCurtidas(0);
  }

  // Mensagem que muda conforme as curtidas
  let mensagem = "Toque no coração para curtir meu perfil!";

  if (curtidas >= 1 && curtidas < 5) {
    mensagem = "Obrigada pela curtida! 💙";
  } else if (curtidas >= 5) {
    mensagem = "Uau, você realmente gostou! 🎉";
  }

  // Dados do perfil
  const nome = "Stefani Hermel";
  const cargo = "Desenvolvedora Mobile em formação";
  const cidade = "Garopaba, SC";
  const email = "contato.hermel@gmail.com";
  const foto = "https://github.com/StefaniHermel.png";

  const bio =
    "Professora de séries iniciais que decidiu entrar no mundo da tecnologia. " +
    "Estudo desenvolvimento mobile e machine learning, unindo a didática da sala de aula " +
    "com a lógica da programação para criar aplicativos simples e úteis.";

  // Lista de habilidades
  const habilidades = [
    {
      nome: "JavaScript",
      icone: "js",
      cor: "#CA8A04",
      fundo: "#FEF9C3",
      texto: "#854D0E",
    },
    {
      nome: "HTML",
      icone: "html5",
      cor: "#E34F26",
      fundo: "#FFEDD5",
      texto: "#9A3412",
    },
    {
      nome: "CSS",
      icone: "css3-alt",
      cor: "#1572B6",
      fundo: "#DBEAFE",
      texto: "#1E40AF",
    },
    {
      nome: "React Native",
      icone: "react",
      cor: "#0891B2",
      fundo: "#CFFAFE",
      texto: "#155E75",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {/* Cabeçalho com foto, nome e cargo */}
      <Cabecalho foto={foto} nome={nome} cargo={cargo} />

      {/* Botão de curtidas */}
      <Pressable
        style={[
          styles.botaoCurtir,
          curtidas > 0 && styles.botaoCurtirAtivo,
        ]}
        onPress={curtir}
      >
        <FontAwesome5
          name="heart"
          solid={curtidas > 0}
          size={20}
          color={curtidas > 0 ? "#E11D48" : "#6B7280"}
        />

        <Text
          style={[
            styles.textoCurtir,
            curtidas > 0 && styles.textoCurtirAtivo,
          ]}
        >
          {curtidas} {curtidas === 1 ? "curtida" : "curtidas"}
        </Text>
      </Pressable>

      <Text style={styles.mensagem}>{mensagem}</Text>

      {/* Botão para zerar as curtidas */}
      {curtidas > 0 && (
        <Pressable onPress={zerar}>
          <Text style={styles.textoZerar}>Zerar curtidas</Text>
        </Pressable>
      )}

      {/* Cartão de localização e disponibilidade */}
      <View style={styles.cartao}>
        <Text style={styles.rotulo}>📍 Localização</Text>
        <Text style={styles.valor}>{cidade}</Text>

        <View
          style={[
            styles.selo,
            {
              backgroundColor: disponivel ? "#DCFCE7" : "#FEE2E2",
            },
          ]}
        >
          <Text
            style={[
              styles.seloTexto,
              {
                color: disponivel ? "#166534" : "#991B1B",
              },
            ]}
          >
            {disponivel
              ? "● Disponível para projetos"
              : "● Indisponível"}
          </Text>
        </View>

        {/* Botão para alternar a disponibilidade */}
        <Pressable
          style={[
            styles.botaoDisponibilidade,
            {
              backgroundColor: disponivel ? "#4169E1" : "#15803D",
            },
          ]}
          onPress={() => setDisponivel(!disponivel)}
        >
          <Text style={styles.textoBotaoDisponibilidade}>
            {disponivel
              ? "Tornar indisponível"
              : "Tornar disponível"}
          </Text>
        </Pressable>
      </View>

      {/* Cartão sobre mim */}
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Sobre mim</Text>
        <Text style={styles.bio} numberOfLines={3}>
          {bio}
        </Text>
      </View>

      {/* Botão para mostrar ou esconder habilidades */}
      <Pressable
        style={styles.botaoHabilidades}
        onPress={() =>
          setMostrarHabilidades(!mostrarHabilidades)
        }
      >
        <Text style={styles.textoBotaoHabilidades}>
          {mostrarHabilidades
            ? "Esconder habilidades"
            : "Mostrar habilidades"}
        </Text>
      </Pressable>

      {/* Cartão de habilidades */}
      {mostrarHabilidades && (
        <View style={styles.cartao}>
          <Text style={styles.titulo}>Habilidades</Text>

          <View style={styles.grade}>
            {habilidades.map((item) => (
              <View
                key={item.nome}
                style={[
                  styles.etiqueta,
                  { backgroundColor: item.fundo },
                ]}
              >
                <FontAwesome5
                  name={item.icone}
                  size={28}
                  color={item.cor}
                  style={styles.etiquetaIcone}
                />

                <Text
                  style={[
                    styles.etiquetaTexto,
                    { color: item.texto },
                  ]}
                >
                  {item.nome}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Botão de contato */}
      <Pressable
        style={({ pressed }) => [
          styles.botao,
          {
            backgroundColor: pressed ? "#1E3A8A" : "#4169E1",
          },
        ]}
        onPress={() => Alert.alert("Contato", email)}
      >
        <Text style={styles.textoBotao}>
          ✉️ Entrar em contato
        </Text>
      </Pressable>

      {/* Botão de recomendações: máximo de 10 */}
      <Pressable
        style={styles.botaoRecomendacoes}
        onPress={recomendar}
      >
        <Text style={styles.textoBotaoRecomendacoes}>
          👍 Recomendar ({recomendacoes}/10)
        </Text>
      </Pressable>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

// Estilos do aplicativo
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
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoCurtir: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

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
