import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from "react-native";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";

// Este arquivo está em app/sobre/, então sobe DUAS pastas até a raiz.
import Cabecalho from "../components/Cabecalho";

export default function Sobre() {
  const router = useRouter();

  // Estados do perfil
  const [curtidas, setCurtidas] = useState(0);
  const [recomendacoes, setRecomendacoes] = useState(0);
  const [disponivel, setDisponivel] = useState(true);
  const [carregou, setCarregou] = useState(false);

  // Carrega recomendações e disponibilidade salvas
  useEffect(() => {
    async function carregar() {
      try {
        const salvo = await AsyncStorage.getItem("perfil");

        if (salvo !== null) {
          const dados = JSON.parse(salvo);

          setRecomendacoes(dados.recomendacoes ?? 0);
          setDisponivel(dados.disponivel ?? true);
        }
      } catch (erro) {
        console.log("Erro ao carregar o perfil:", erro);
      } finally {
        setCarregou(true);
      }
    }

    carregar();
  }, []);

  // Salva os dados sempre que eles mudam
  useEffect(() => {
    if (!carregou) return;

    async function salvar() {
      try {
        await AsyncStorage.setItem(
          "perfil",
          JSON.stringify({ recomendacoes, disponivel })
        );
      } catch (erro) {
        console.log("Erro ao salvar o perfil:", erro);
      }
    }

    salvar();
  }, [recomendacoes, disponivel, carregou]);

  // Funções dos botões
  function recomendar() {
    if (recomendacoes >= 10) {
      Alert.alert("Limite atingido!", "Você já recebeu 10 recomendações.");
      return;
    }

    setRecomendacoes((valor) => valor + 1);
  }

  function zerarRecomendacoes() {
    const pergunta = "Deseja realmente zerar a quantidade de recomendações?";

    // No navegador, Alert com botões não aparece; usamos window.confirm
    if (Platform.OS === "web") {
      if (window.confirm(pergunta)) {
        setRecomendacoes(0);
      }
      return;
    }

    Alert.alert("Zerar recomendações", pergunta, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Zerar",
        style: "destructive",
        onPress: () => setRecomendacoes(0),
      },
    ]);
  }

  function curtir() {
    setCurtidas((valor) => valor + 1);
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
  const email = "contato.hermel@gmail.com";
  const foto = "https://github.com/StefaniHermel.png";

  const bio =
    "Professora de séries iniciais que decidiu entrar no mundo da tecnologia. " +
    "Estudo desenvolvimento mobile e machine learning, unindo a didática da sala de aula " +
    "com a lógica da programação para criar aplicativos simples e úteis.";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Cabecalho foto={foto} nome={nome} cargo={cargo} />

      {/* Mural de recados */}
      <Pressable
        style={styles.botaoPrincipal}
        onPress={() => router.push("/recados")}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FFFFFF" />
        <Text style={styles.textoBotao}>Mural de recados</Text>
      </Pressable>

      {/* Curtidas */}
      <View style={styles.areaCurtidas}>
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
            color={curtidas > 0 ? "#E11D48" : "#64748B"}
          />

          <Text style={styles.textoCurtir}>
            {curtidas} {curtidas === 1 ? "curtida" : "curtidas"}
          </Text>
        </Pressable>

        <Text style={styles.mensagem}>{mensagem}</Text>

        {curtidas > 0 && (
          <Pressable onPress={zerar}>
            <Text style={styles.textoZerar}>Zerar curtidas</Text>
          </Pressable>
        )}
      </View>

      {/* Localização e disponibilidade */}
      <View style={styles.cartao}>
        <View style={styles.tituloLinha}>
          <Ionicons name="location-outline" size={22} color="#2563EB" />
          <Text style={styles.titulo}>Localização</Text>
        </View>

        <Text style={styles.valor}>Garopaba, SC</Text>

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
            {disponivel
              ? "● Disponível para projetos"
              : "● Indisponível no momento"}
          </Text>
        </View>

        <Pressable
          style={[
            styles.botaoSecundario,
            { backgroundColor: disponivel ? "#1D4ED8" : "#15803D" },
          ]}
          onPress={() => setDisponivel((valor) => !valor)}
        >
          <Ionicons name="sync-outline" size={18} color="#FFFFFF" />
          <Text style={styles.textoBotao}>
            {disponivel ? "Tornar indisponível" : "Tornar disponível"}
          </Text>
        </Pressable>
      </View>

      {/* Sobre mim */}
      <View style={styles.cartao}>
        <View style={styles.tituloLinha}>
          <Ionicons name="person-circle-outline" size={24} color="#2563EB" />
          <Text style={styles.titulo}>Sobre mim</Text>
        </View>

        <Text style={styles.bio}>{bio}</Text>
      </View>

      {/* Habilidades */}
      <Pressable
        style={styles.cartao}
        onPress={() => router.push("/habilidades")}
      >
        <View style={styles.linhaCartao}>
          <View style={styles.tituloLinha}>
            <Ionicons name="code-slash-outline" size={24} color="#2563EB" />
            <Text style={styles.titulo}>Habilidades</Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#64748B" />
        </View>

        <Text style={styles.descricao}>
          Conheça as tecnologias e ferramentas que estou estudando.
        </Text>
      </Pressable>

      {/* Projetos */}
      <View style={styles.cartao}>
        <View style={styles.tituloLinha}>
          <Ionicons name="folder-open-outline" size={24} color="#2563EB" />
          <Text style={styles.titulo}>Meus projetos</Text>
        </View>

        <View style={styles.projetoEmBreve}>
          <Ionicons name="construct-outline" size={25} color="#64748B" />
          <View style={styles.projetoTexto}>
            <Text style={styles.projetoTitulo}>Em breve</Text>
            <Text style={styles.descricao}>
              Novos projetos e aplicações serão apresentados aqui.
            </Text>
          </View>
        </View>
      </View>

      {/* Contato */}
      <Pressable
        style={styles.botaoPrincipal}
        onPress={() => Alert.alert("Contato", email)}
      >
        <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
        <Text style={styles.textoBotao}>Entrar em contato</Text>
      </Pressable>

      {/* Recomendações */}
      <Pressable style={styles.botaoRecomendacoes} onPress={recomendar}>
        <Ionicons name="thumbs-up-outline" size={20} color="#FFFFFF" />
        <Text style={styles.textoBotao}>Recomendar ({recomendacoes}/10)</Text>
      </Pressable>

      {recomendacoes > 0 && (
        <Pressable
          style={styles.botaoZerarRecomendacoes}
          onPress={zerarRecomendacoes}
        >
          <Ionicons name="refresh-outline" size={17} color="#BE123C" />
          <Text style={styles.textoZerarRecomendacoes}>
            Zerar recomendações
          </Text>
        </Pressable>
      )}

      <Text style={styles.rodape}>Desenvolvido por {nome} · 2026</Text>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2FB",
  },

  conteudo: {
    alignItems: "center",
    padding: 20,
    paddingTop: 45,
    paddingBottom: 35,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 3,
  },

  tituloLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  linhaCartao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },

  valor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 8,
    marginBottom: 14,
  },

  bio: {
    fontSize: 15,
    lineHeight: 23,
    color: "#475569",
    marginTop: 12,
  },

  descricao: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
    marginTop: 9,
  },

  selo: {
    alignSelf: "flex-start",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  seloTexto: {
    fontSize: 13,
    fontWeight: "600",
  },

  botaoPrincipal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#1E40AF",
    marginBottom: 14,
  },

  botaoSecundario: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    marginTop: 14,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  areaCurtidas: {
    alignItems: "center",
    marginBottom: 16,
  },

  botaoCurtir: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: "#FFFFFF",
    paddingVertical: 11,
    paddingHorizontal: 22,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  botaoCurtirAtivo: {
    backgroundColor: "#FFE4E6",
    borderColor: "#FDA4AF",
  },

  textoCurtir: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },

  mensagem: {
    fontSize: 14,
    color: "#475569",
    marginTop: 9,
    textAlign: "center",
  },

  textoZerar: {
    fontSize: 13,
    fontWeight: "600",
    color: "#BE123C",
    marginTop: 7,
    textDecorationLine: "underline",
  },

  botaoRecomendacoes: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#0F172A",
    marginBottom: 12,
  },

  botaoZerarRecomendacoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  textoZerarRecomendacoes: {
    fontSize: 14,
    fontWeight: "600",
    color: "#BE123C",
  },

  projetoEmBreve: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    backgroundColor: "#F1F5F9",
    padding: 14,
    borderRadius: 14,
    marginTop: 14,
  },

  projetoTexto: {
    flex: 1,
  },

  projetoTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
  },

  rodape: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
});