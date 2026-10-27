// ============================================================
// IMPORTS
// ============================================================

// useState cria variáveis que, ao mudar, redesenham a tela
import { useState } from "react";

// Componentes do React Native usados nesta tela:
// View = caixa, Text = texto, TextInput = campo onde se digita,
// Pressable = algo que pode ser tocado, FlatList = lista otimizada
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

// ============================================================
// COMPONENTE DA TELA
// Como o arquivo se chama recados.js e está dentro de app/,
// o Expo Router abre esta tela na rota "/recados".
// ============================================================
export default function Recados() {
  // ----------------------------------------------------------
  // ESTADOS
  // ----------------------------------------------------------

  // "texto" guarda o que a pessoa está digitando no campo.
  // Começa como string vazia.
  const [texto, setTexto] = useState("");

  // "recados" guarda a lista de recados já enviados.
  // Começa como array vazio [].
  //
  // ATENÇÃO (é a resposta do slide): esse state vive DENTRO desta tela.
  // Quando você volta para o início, o Expo Router remove a tela da pilha
  // e o state é jogado fora. Ao entrar de novo, a tela nasce do zero
  // e "recados" volta a ser []. Por isso o recado some.
  const [recados, setRecados] = useState([]);

  // ----------------------------------------------------------
  // FUNÇÃO QUE ADICIONA UM RECADO
  // ----------------------------------------------------------
  function adicionar() {
    // trim() tira os espaços das pontas. Se sobrar texto vazio,
    // "return" encerra a função e não adiciona nada.
    if (texto.trim() === "") return;

    // Criamos uma lista NOVA, nunca alteramos a antiga diretamente.
    // [novoItem, ...recados] = o novo recado primeiro, depois
    // todos os anteriores (os "..." copiam os itens da lista antiga).
    // Date.now() devolve o horário em milissegundos, que usamos como
    // id único de cada recado.
    setRecados([{ id: Date.now().toString(), texto }, ...recados]);

    // Limpa o campo de digitação para o próximo recado
    setTexto("");
  }

  // ----------------------------------------------------------
  // O QUE APARECE NA TELA
  // ----------------------------------------------------------
  return (
    <View style={styles.container}>
      {/* Campo de texto "controlado": o que aparece nele vem do state
          "texto" (value), e a cada letra digitada o state é atualizado
          (onChangeText). Os dois andam juntos. */}
      <TextInput
        style={styles.input}
        placeholder="Escreva um recado"
        value={texto}
        onChangeText={setTexto}
      />

      {/* Ao tocar, chama a função adicionar */}
      <Pressable style={styles.botao} onPress={adicionar}>
        <Text style={styles.botaoTexto}>ENVIAR</Text>
      </Pressable>

      {/* FlatList mostra listas de forma eficiente (só desenha o que
          aparece na tela). Ela precisa de 3 coisas:
          - data: a lista de dados
          - keyExtractor: como pegar o id único de cada item
          - renderItem: como desenhar cada item */}
      <FlatList
        data={recados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recado}>
            <Text>{item.texto}</Text>
          </View>
        )}
        // Aparece quando a lista está vazia
        ListEmptyComponent={
          <Text style={{ marginTop: 16 }}>Nenhum recado ainda.</Text>
        }
      />
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    borderWidth: 1, // espessura da borda
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
