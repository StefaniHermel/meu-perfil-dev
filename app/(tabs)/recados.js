import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecadosScreen() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [listaRecados, setListaRecados] = useState([]);
  const [carregou, setCarregou] = useState(false);

  // Carrega os recados salvos ao iniciar a tela
  useEffect(() => {
    async function carregarRecados() {
      try {
        const salvos = await AsyncStorage.getItem("recados");
        if (salvos !== null) {
          setListaRecados(JSON.parse(salvos));
        }
      } catch (erro) {
        console.log("Erro ao carregar recados:", erro);
      } finally {
        setCarregou(true);
      }
    }
    carregarRecados();
  }, []);

  // Salva os recados sempre que a lista for alterada
  useEffect(() => {
    if (!carregou) return;
    async function salvarRecados() {
      try {
        await AsyncStorage.setItem("recados", JSON.stringify(listaRecados));
      } catch (erro) {
        console.log("Erro ao salvar recados:", erro);
      }
    }
    salvarRecados();
  }, [listaRecados, carregou]);

  // Função para adicionar um novo recado
  function enviarRecado() {
    if (nome.trim() === "" || mensagem.trim() === "") {
      Alert.alert("Atenção", "Por favor, preencha o seu nome e o recado!");
      return;
    }

    const novoRecado = {
      id: Date.now().toString(),
      nome: nome.trim(),
      texto: mensagem.trim(),
      data: new Date().toLocaleDateString("pt-BR"),
    };

    setListaRecados([novoRecado, ...listaRecados]);
    setNome("");
    setMensagem("");
    Alert.alert("Sucesso!", "O seu recado foi enviado com sucesso!");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <StatusBar style="dark" />

      <View style={styles.cabecalhoSecao}>
        <Text style={styles.tituloPrincipal}>Mural de Recados</Text>
        <Text style={styles.subtituloPrincipal}>
          Deixe uma mensagem ou feedback profissional para a Stefani.
        </Text>
      </View>

      {/* Formulário para enviar recado */}
      <View style={styles.cartao}>
        <Text style={styles.label}>O seu nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Ana Maria"
          placeholderTextColor="#94A3B8"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>O seu recado:</Text>
        <TextInput
          style={[styles.input, styles.inputMensagem]}
          placeholder="Escreva sua mensagem aqui..."
          placeholderTextColor="#94A3B8"
          multiline
          value={mensagem}
          onChangeText={setMensagem}
        />

        <Pressable style={styles.botaoEnviar} onPress={enviarRecado}>
          <Ionicons name="send" size={16} color="#FFFFFF" />
          <Text style={styles.textoBotao}>Enviar Recado</Text>
        </Pressable>
      </View>

      {/* Lista de Recados Recebidos */}
      <Text style={styles.subtituloLista}>Recados da Comunidade ({listaRecados.length})</Text>

      {listaRecados.length === 0 ? (
        <View style={styles.cartaoVazio}>
          <Ionicons name="chatbubbles-outline" size={32} color="#94A3B8" />
          <Text style={styles.textoVazio}>Ainda não há recados. Seja o primeiro a deixar uma mensagem!</Text>
        </View>
      ) : (
        listaRecados.map((item) => (
          <View key={item.id} style={styles.cartaoRecado}>
            <View style={styles.recadoCabecalho}>
              <Text style={styles.recadoNome}>{item.nome}</Text>
              <Text style={styles.recadoData}>{item.data}</Text>
            </View>
            <Text style={styles.recadoTexto}>{item.texto}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF2FB" },
  conteudo: { padding: 20, maxWidth: 480, alignSelf: "center", width: "100%" },
  cabecalhoSecao: { marginBottom: 20, marginTop: 10 },
  tituloPrincipal: { fontSize: 24, fontWeight: "700", color: "#1E3A8A", marginBottom: 4 },
  subtituloPrincipal: { fontSize: 14, color: "#64748B", lineHeight: 20 },
  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 6 },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#1E293B",
    marginBottom: 12,
  },
  inputMensagem: { height: 90, textAlignVertical: "top" },
  botaoEnviar: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  textoBotao: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
  subtituloLista: { fontSize: 18, fontWeight: "700", color: "#1E3A8A", marginBottom: 12 },
  cartaoVazio: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textoVazio: { fontSize: 14, color: "#64748B", textAlign: "center" },
  cartaoRecado: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recadoCabecalho: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  recadoNome: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  recadoData: { fontSize: 12, color: "#94A3B8" },
  recadoTexto: { fontSize: 14, color: "#475569", lineHeight: 20 },
});