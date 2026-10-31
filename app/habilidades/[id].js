// ============================================================
// TELA DE DETALHE DA HABILIDADE (3ª tela)
// Mostra nome, nível e a descrição da habilidade clicada
// ============================================================

import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { habilidades } from "../../data/habilidades";

export default function DetalheHabilidade() {
  // Lê o id que veio no endereço, ex: /habilidades/js
  const { id } = useLocalSearchParams();

  // Procura na lista a habilidade com esse id
  // Comparamos com String() para garantir que os dois sejam texto
  const habilidade = habilidades.find((item) => String(item.id) === String(id));

  // Se não encontrou, mostra um aviso em vez de quebrar o app
  if (!habilidade) {
    return (
      <View style={estilos.container}>
        <Text>Habilidade não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      {/* Título da aba no navegador */}
      <Stack.Screen options={{ title: habilidade.nome }} />

      {/* Cartão com as cores da habilidade */}
      <View style={[estilos.cartao, { backgroundColor: habilidade.fundo }]}>
        <FontAwesome5 name={habilidade.icone} size={48} color={habilidade.cor} />

        <Text style={[estilos.nome, { color: habilidade.texto }]}>
          {habilidade.nome}
        </Text>

        {/* Nível: Iniciante, Intermediário ou Avançado */}
        <Text style={[estilos.nivel, { color: habilidade.cor }]}>
          Nível: {habilidade.nivel}
        </Text>

        {/* 👇 AQUI está o texto que estava faltando! */}
        <Text style={[estilos.descricao, { color: habilidade.texto }]}>
          {habilidade.descricao}
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  cartao: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    gap: 12,
  },
  nome: {
    fontSize: 24,
    fontWeight: "bold",
  },
  nivel: {
    fontSize: 16,
    fontWeight: "600",
  },
  descricao: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
