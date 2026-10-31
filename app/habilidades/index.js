// ============================================================
// IMPORTS
// ============================================================
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";

// Os mesmos ícones que você usava na Home
import { FontAwesome5 } from "@expo/vector-icons";

// Dois "../" porque este arquivo está em app/habilidades/
import { habilidades } from "../../data/habilidades";
import { Ionicons } from '@expo/vector-icons';

// ============================================================
// TELA 2: lista de habilidades (rota /habilidades)
// ============================================================
export default function ListaHabilidades() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {/* Título do cabeçalho desta tela */}
      <Stack.Screen options={{ title: "Habilidades" }} />

      {/* Grade de 2 colunas, igual à que estava na Home */}
      <View style={styles.grade}>
        {/* .map() cria um botão para cada habilidade da lista */}
        {habilidades.map((item) => (
          <Pressable
            key={item.id}
            style={[styles.etiqueta, { backgroundColor: item.fundo }]}
            // Abre a TELA 3: app/habilidades/[id].js
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
    </ScrollView>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF2FB" },
  conteudo: { padding: 20, maxWidth: 480, alignSelf: "center", width: "100%" },
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
  etiquetaIcone: { marginBottom: 6 },
  etiquetaTexto: { fontSize: 14, fontWeight: "700" },
});