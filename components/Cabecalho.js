
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Cabecalho({ foto, nome, cargo }) {
  return (
    <View style={styles.cabecalho}>
      <Text style={styles.boasVindas}>MEU PORTFÓLIO</Text>

      <View style={styles.fotoContainer}>
        <Image source={{ uri: foto }} style={styles.foto} />
      </View>

      <Text style={styles.nome}>{nome}</Text>

      <View style={styles.cargoBox}>
        <Ionicons name="code-slash" size={16} color="#FFFFFF" />
        <Text style={styles.cargo}>{cargo}</Text>
      </View>

      <View style={styles.localizacao}>
        <Ionicons name="location-outline" size={16} color="#64748B" />
        <Text style={styles.localizacaoTexto}>Garopaba, SC</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 26,
    marginBottom: 18,
    width: "100%",
    borderTopWidth: 5,
    borderTopColor: "#2563EB",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  boasVindas: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2563EB",
    letterSpacing: 2,
    marginBottom: 18,
  },

  fotoContainer: {
    padding: 5,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#BFDBFE",
    marginBottom: 14,
  },

  foto: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },

  nome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
  },

  cargoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1E40AF",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 12,
  },

  cargo: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  localizacao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 14,
  },

  localizacaoTexto: {
    color: "#64748B",
    fontSize: 14,
  },
});
