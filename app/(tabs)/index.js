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
// Este arquivo está em app/(tabs)/index.js, então sobe DUAS pastas até a raiz para achar components.
import Cabecalho from "../../components/Cabecalho";

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
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <StatusBar style="dark" />
      
      {/* Cabeçalho personalizado */}
      <Cabecalho nome={nome} cargo={cargo} foto={foto} />

      {/* Cartão de Bio */}
      <View style={styles.cartao}>
        <View style={styles.tituloLinha}>
          <Ionicons name="person-outline" size={20} color="#1E293B" />
          <Text style={styles.titulo}>Sobre mim</Text>
        </View>
        <Text style={styles.bio}>{bio}</Text>
      </View>

      {/* Cartão de Disponibilidade */}
      <View style={styles.cartao}>
        <View style={styles.tituloLinha}>
          <Ionicons name="briefcase-outline" size={20} color="#1E293B" />
          <Text style={styles.titulo}>Disponibilidade</Text>
        </View>
        <View style={styles.linhaCartao}>
          <Text style={styles.valor}>Status atual para projetos</Text>
          <Pressable
            style={[
              styles.selo,
              { backgroundColor: disponivel ? "#DCFCE7" : "#FEE2E2" },
            ]}
            onPress={() => setDisponivel(!disponivel)}
          >
            <Text
              style={[
                styles.seloTexto,
                { color: disponivel ? "#166534" : "#991B1B" },
              ]}
            >
              {disponivel ? "Disponível" : "Indisponível"}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.descricao}>
          Toque no selo para alternar seu status profissional.
        </Text>
      </View>

      {/* Área de Curtidas */}
      <View style={styles.areaCurtidas}>
        <Pressable
          style={[styles.botaoCurtir, curtidas > 0 && styles.botaoCurtirAtivo]}
          onPress={curtir}
        >
          <FontAwesome5
            name="heart"
            size={18}
            color={curtidas > 0 ? "#E11D48" : "#64748B"}
          />
          <Text style={styles.textoCurtir}>
            {curtidas === 0 ? "Curtir" : `${curtidas} curtidas`}
          </Text>
        </Pressable>
        <Text style={styles.mensagem}>{mensagem}</Text>
        {curtidas > 0 && (
          <Pressable onPress={zerar}>
            <Text style={styles.textoZerar}>Zerar curtidas</Text>
          </Pressable>
        )}
      </View>

      {/* Seção de Recomendações */}
      <View style={styles.cartao}>
        <View style={styles.tituloLinha}>
          <FontAwesome5 name="star" size={18} color="#2563EB" />
          <Text style={styles.titulo}>Recomendações ({recomendacoes}/10)</Text>
        </View>
        <Text style={styles.valor}>
          Ajude a recomendar meu perfil profissional na comunidade!
        </Text>

        <Pressable style={styles.botaoRecomendacoes} onPress={recomendar}>
          <FontAwesome5 name="thumbs-up" size={16} color="#FFFFFF" />
          <Text style={styles.textoBotao}>Recomendar Perfil</Text>
        </Pressable>

        {recomendacoes > 0 && (
          <Pressable
            style={styles.botaoZerarRecomendacoes}
            onPress={zerarRecomendacoes}
          >
            <Text style={styles.textoBotao}>Zerar Recomendações</Text>
          </Pressable>
        )}
      </View>

      {/* Seção de Projetos em Breve */}
      <View style={styles.cartao}>
        <View style={styles.tituloLinha}>
          <Ionicons name="code-slash" size={20} color="#1E293B" />
          <Text style={styles.titulo}>Projetos em Destaque</Text>
        </View>
        <View style={styles.projetoEmBreve}>
          <Ionicons name="phone-portrait-outline" size={24} color="#475569" />
          <View style={styles.projetoTexto}>
            <Text style={styles.projetoTitulo}>Aplicativo Mobile React Native</Text>
            <Text style={styles.descricao}>Desenvolvimento de apps multiplataforma modernos.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF2FB" },
  conteudo: { padding: 20, maxWidth: 480, alignSelf: "center", width: "100%" },
  botaoPrincipal: {
    backgroundColor: "#4D7C2A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  botaoSecundario: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    gap: 8,
  },
  botaoRecomendacoes: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  botaoZerarRecomendacoes: {
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  textoBotao: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tituloLinha: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  titulo: { fontSize: 18, fontWeight: "700", color: "#1E293B" },
  valor: { fontSize: 16, color: "#334155", marginBottom: 8 },
  bio: { fontSize: 15, color: "#475569", lineHeight: 22 },
  descricao: { fontSize: 14, color: "#64748B", marginTop: 4 },
  linhaCartao: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  selo: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, alignSelf: "flex-start", marginTop: 4 },
  seloTexto: { fontSize: 13, fontWeight: "600" },
  areaCurtidas: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  botaoCurtir: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  botaoCurtirAtivo: { borderColor: "#FECDD3", backgroundColor: "#FFF1F2" },
  textoCurtir: { fontSize: 15, fontWeight: "600", color: "#334155" },
  mensagem: { fontSize: 14, color: "#64748B", textAlign: "center" },
  textoZerar: { fontSize: 13, color: "#94A3B8", textDecorationLine: "underline", marginTop: 4 },
  projetoEmBreve: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 8, backgroundColor: "#F8FAFC", padding: 12, borderRadius: 10 },
  projetoTexto: { flex: 1 },
  projetoTitulo: { fontSize: 15, fontWeight: "600", color: "#475569" },
});