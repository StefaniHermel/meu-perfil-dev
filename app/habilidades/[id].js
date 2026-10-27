// ============================================================
// IMPORTS
// ============================================================
import { View, Text, Pressable, StyleSheet } from "react-native";

// Stack: permite mudar o título do cabeçalho desta tela
// useLocalSearchParams: lê os parâmetros que vieram na rota (o "id")
// useRouter: dá o "router" para voltar e navegar
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

// Dois "../" porque este arquivo está em app/habilidades/,
// dois níveis abaixo da raiz, onde fica a pasta data/
import { habilidades } from "../../data/habilidades";

// ============================================================
// COMPONENTE DA TELA
//
// ROTA DINÂMICA: os colchetes no nome [id].js dizem ao Expo Router que
// essa parte da rota muda. A mesma tela serve para todas as habilidades:
//   /habilidades/js   -> id = "js"
//   /habilidades/css  -> id = "css"
// ============================================================
export default function DetalheHabilidade() {
  // Pega o parâmetro "id" da rota. O nome precisa ser igual ao que
  // está entre colchetes no arquivo ([id] -> id).
  const { id } = useLocalSearchParams();

  const router = useRouter();

  // .find() percorre a lista e devolve o PRIMEIRO item que atende
  // à condição. Aqui: a habilidade cujo id é igual ao da rota.
  // Se não achar nenhuma, devolve undefined.
  const habilidade = habilidades.find((h) => h.id === id);

  // PROTEÇÃO: se alguém abrir um id que não existe
  // (por exemplo /habilidades/xyz), mostramos um aviso em vez de
  // deixar o app quebrar tentando ler "habilidade.nome" de undefined.
  if (!habilidade) {
    return <Text style={{ padding: 16 }}>Habilidade não encontrada.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Stack.Screen dentro da tela muda as opções do cabeçalho.
          Aqui o título passa a ser o nome da habilidade (JavaScript, CSS...) */}
      <Stack.Screen options={{ title: habilidade.nome }} />

      <Text style={styles.titulo}>{habilidade.nome}</Text>
      <Text style={styles.nivel}>Nível: {habilidade.nivel}</Text>
      <Text style={styles.descricao}>{habilidade.descricao}</Text>

      {/* router.back() desfaz o último router.push:
          volta UMA tela na pilha */}
      <Pressable style={styles.voltar} onPress={() => router.back()}>
        <Text style={styles.textoBotao}>VOLTAR</Text>
      </Pressable>

      {/* router.dismissAll() fecha todas as telas empilhadas e volta
          direto para a primeira da pilha (o início). Se a sua versão do
          Expo Router não tiver essa função, use router.replace("/"). */}
      <Pressable style={styles.inicio} onPress={() => router.dismissAll()}>
        <Text style={styles.textoBotao}>IR PARA O INÍCIO</Text>
      </Pressable>
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================
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