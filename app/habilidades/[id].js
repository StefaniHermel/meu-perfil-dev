import { View, Text, Pressable, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { habilidades } from "../../data/habilidades";

export default function DetalheHabilidade() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const habilidade = habilidades.find((h) => h.id === id);

  if (!habilidade) {
    return <Text style={{ padding: 16 }}>Habilidade não encontrada.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: habilidade.nome }} />

      <Text style={styles.titulo}>{habilidade.nome}</Text>
      <Text style={styles.nivel}>Nível: {habilidade.nivel}</Text>
      <Text style={styles.descricao}>{habilidade.descricao}</Text>

      <Pressable style={styles.voltar} onPress={() => router.back()}>
        <Text style={styles.textoBotao}>VOLTAR</Text>
      </Pressable>

      <Pressable style={styles.inicio} onPress={() => router.dismissAll()}>
        <Text style={styles.textoBotao}>IR PARA O INÍCIO</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  nivel: { fontSize: 14, marginBottom: 8 },
  descricao: { fontSize: 14, color: "#555", marginBottom: 24 },
  voltar: {
    backgroundColor: "#4169E1",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  inicio: { backgroundColor: "#1F2937", padding: 14, borderRadius: 14 },
  textoBotao: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});