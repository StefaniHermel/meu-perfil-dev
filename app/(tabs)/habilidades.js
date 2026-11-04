import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function HabilidadesScreen() {
  // Estado para guardar o ID da habilidade que está aberta no momento (null = nenhuma aberta)
  const [habilidadeAberta, setHabilidadeAberta] = useState(null);

  const habilidadesList = [
    {
      id: "1",
      nome: "React Native & Expo",
      nivel: "Intermediário",
      descricao: "Desenvolvimento de aplicativos móveis multiplataforma modernos, utilizando componentes nativos, gerenciamento de estado e navegação avançada por abas.",
      icone: "mobile-alt",
    },
    {
      id: "2",
      nome: "JavaScript / TypeScript",
      nivel: "Intermediário",
      descricao: "Forte base em lógica de programação, manipulação de dados assíncronos, integração com APIs e armazenamento local com AsyncStorage.",
      icone: "code",
    },
    {
      id: "3",
      nome: "Machine Learning (Noções)",
      nivel: "Iniciante / Em estudo",
      descricao: "Exploração inicial de conceitos de inteligência artificial, redes neurais e aprendizado de máquina aplicados à inovação educacional.",
      icone: "brain",
    },
    {
      id: "4",
      nome: "Didática e Pedagogia",
      nivel: "Avançado",
      descricao: "Experiência sólida em mediação de leitura, gestão educacional participativa, facilitação de grupos e comunicação clara de conceitos.",
      icone: "chalkboard-teacher",
    },
  ];

  // Função para alternar entre abrir e fechar os detalhes ao clicar
  function alternarDetalhe(id) {
    if (habilidadeAberta === id) {
      setHabilidadeAberta(null); // Se já estiver aberta, fecha
    } else {
      setHabilidadeAberta(id); // Caso contrário, abre esta
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <StatusBar style="dark" />
      
      <View style={styles.cabecalhoSecao}>
        <Text style={styles.tituloPrincipal}>Minhas Habilidades</Text>
        <Text style={styles.subtituloPrincipal}>
          Toque em uma competência para ver ou ocultar os detalhes.
        </Text>
      </View>

      {habilidadesList.map((item) => {
        const estaAberta = habilidadeAberta === item.id;

        return (
          <Pressable
            key={item.id}
            style={[styles.cartao, estaAberta && styles.cartaoAtivo]}
            onPress={() => alternarDetalhe(item.id)}
          >
            <View style={styles.linhaCabecalho}>
              <View style={styles.tituloLinha}>
                <FontAwesome5 name={item.icone} size={20} color="#2563EB" />
                <Text style={styles.titulo}>{item.nome}</Text>
              </View>
              <Ionicons
                name={estaAberta ? "chevron-up" : "chevron-down"}
                size={20}
                color="#64748B"
              />
            </View>

            <View style={styles.selo}>
              <Text style={styles.seloTexto}>{item.nivel}</Text>
            </View>

            {/* Mostra a descrição apenas se esta habilidade específica estiver selecionada */}
            {estaAberta && (
              <View style={styles.containerDescricao}>
                <Text style={styles.subtituloDescricao}>Descrição Detalhada:</Text>
                <Text style={styles.descricao}>{item.descricao}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
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
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cartaoAtivo: {
    borderColor: "#2563EB",
    backgroundColor: "#F8FAFC",
  },
  linhaCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tituloLinha: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  titulo: { fontSize: 18, fontWeight: "700", color: "#1E293B" },
  selo: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  seloTexto: { fontSize: 12, fontWeight: "600", color: "#1D4ED8" },
  containerDescricao: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 12,
  },
  subtituloDescricao: { fontSize: 13, fontWeight: "700", color: "#475569", marginBottom: 4 },
  descricao: { fontSize: 14, color: "#334155", lineHeight: 20 },
});