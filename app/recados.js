import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

export default function Recados() {
  const [texto, setTexto] = useState("");
  const [recados, setRecados] = useState([]);

  function adicionar() {
    if (texto.trim() === "") return;
    setRecados([{ id: Date.now().toString(), texto }, ...recados]);
    setTexto("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escreva um recado"
        value={texto}
        onChangeText={setTexto}
      />

      <Pressable style={styles.botao} onPress={adicionar}>
        <Text style={styles.botaoTexto}>ENVIAR</Text>
      </Pressable>

      <FlatList
        data={recados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recado}>
            <Text>{item.texto}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 16 }}>Nenhum recado ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#4169E1",
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  recado: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
});
