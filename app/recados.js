// ============================================================
// IMPORTS
// ============================================================

// useState cria variáveis que, ao mudar, redesenham a tela.
// useEffect executa um código em momentos certos: ao abrir a tela
// ou quando algum state muda.
import { useState, useEffect } from "react";

// AsyncStorage é o "armário" do aparelho: guarda dados mesmo depois
// de fechar o app ou dar F5. Ele só guarda TEXTO (string).
import AsyncStorage from "@react-native-async-storage/async-storage";

// Componentes do React Native usados nesta tela:
// View = caixa, Text = texto, TextInput = campo de digitar,
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
// COMPONENTE DA TELA (rota "/recados")
// ============================================================
export default function Recados() {
  // ----------------------------------------------------------
  // ESTADOS
  // ----------------------------------------------------------

  // O que a pessoa está digitando no campo
  const [texto, setTexto] = useState("");

  // A lista de recados. Começa vazia, mas o useEffect de carregar
  // (mais abaixo) preenche com o que estava guardado.
  const [recados, setRecados] = useState([]);

  // "Bandeirinha": só vira true DEPOIS que terminamos de ler o
  // armazenamento. Sem ela, o efeito de salvar rodaria logo na
  // abertura, gravaria a lista vazia [] e apagaria os recados antigos.
  const [carregou, setCarregou] = useState(false);

  // ----------------------------------------------------------
  // CARREGAR: roda UMA vez, quando a tela abre
  // O [] no final (array de dependências vazio) significa
  // "execute só na primeira vez".
  // ----------------------------------------------------------
  useEffect(() => {
    // O useEffect não aceita receber uma função async direto,
    // por isso criamos a função "carregar" dentro dele e a chamamos.
    async function carregar() {
      // try = tenta executar. Se algo der errado, pula para o catch
      // e o app não trava.
      try {
        // getItem busca o valor da chave "recados".
        // await = espera a leitura terminar antes de seguir.
        const salvo = await AsyncStorage.getItem("recados");

        // Se nunca foi salvo nada, getItem devolve null.
        // Só convertemos se existir algo guardado.
        if (salvo !== null) {
          // JSON.parse transforma o TEXTO de volta em lista
          setRecados(JSON.parse(salvo));
        }
      } catch (erro) {
        // Se der erro, mostra no console (F12 no navegador)
        console.log("Erro ao carregar os recados:", erro);
      } finally {
        // finally roda SEMPRE, deu certo ou errado.
        // Libera o salvamento: agora já sabemos o que tinha guardado.
        setCarregou(true);
      }
    }

    carregar(); // chama a função que acabamos de criar
  }, []);

  // ----------------------------------------------------------
  // SALVAR: roda toda vez que "recados" ou "carregou" mudar
  // ----------------------------------------------------------
  useEffect(() => {
    // Se ainda não terminou de carregar, não salva nada
    if (!carregou) return;

    if (recados.length > 0) {
      // JSON.stringify transforma a lista em TEXTO,
      // porque o AsyncStorage só aceita texto.
      // setItem(chave, valor) guarda o valor na gaveta "recados".
      AsyncStorage.setItem("recados", JSON.stringify(recados));
    } else {
      // Lista vazia: não precisa guardar nada, então esvazia a gaveta
      AsyncStorage.removeItem("recados");
    }
  }, [recados, carregou]);

  // ----------------------------------------------------------
  // FUNÇÕES
  // ----------------------------------------------------------

  // Adiciona um recado novo no começo da lista
  function adicionar() {
    // trim() tira os espaços das pontas; se sobrar vazio, não adiciona
    if (texto.trim() === "") return;

    // Criamos uma lista NOVA: o recado novo primeiro, depois os antigos
    // (os "..." copiam os itens da lista antiga).
    // Date.now() vira o id único de cada recado.
    // Não precisamos chamar o AsyncStorage aqui: como "recados" mudou,
    // o useEffect de salvar roda sozinho.
    setRecados([{ id: Date.now().toString(), texto }, ...recados]);

    // Limpa o campo de digitação
    setTexto("");
  }

  // Remove UM recado (o do ✕ que foi tocado)
  function remover(id) {
    // filter cria uma lista nova só com os recados cujo id é DIFERENTE
    // do id clicado. Ou seja: o clicado fica de fora.
    setRecados(recados.filter((item) => item.id !== id));
  }

  // Remove TODOS os recados
  async function apagarTodos() {
    // 1) limpa o que aparece na tela (state)
    setRecados([]);

    // 2) limpa o que está guardado (armazenamento).
    // As duas coisas são necessárias: se fizer só a primeira,
    // os recados voltam quando reabrir o app.
    await AsyncStorage.removeItem("recados");
  }

  // ----------------------------------------------------------
  // O QUE APARECE NA TELA (JSX)
  // ----------------------------------------------------------
  return (
    <View style={styles.container}>
      {/* Campo "controlado": value mostra o state "texto" e
          onChangeText atualiza o state a cada letra digitada */}
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

      {/* RENDERIZAÇÃO CONDICIONAL com &&:
          o botão só existe na tela se houver pelo menos um recado */}
      {recados.length > 0 && (
        <Pressable style={styles.botaoApagar} onPress={apagarTodos}>
          <Text style={styles.botaoTexto}>APAGAR TODOS OS RECADOS</Text>
        </Pressable>
      )}

      {/* FlatList precisa de 3 coisas:
          data = a lista, keyExtractor = id único de cada item,
          renderItem = como desenhar cada item */}
      <FlatList
        data={recados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recado}>
            <Text style={styles.recadoTexto}>{item.texto}</Text>

            {/* ✕ remove só este recado.
                () => remover(item.id) é uma função que chama remover
                já passando o id deste item.
                hitSlop aumenta a área de toque além do tamanho do ✕ */}
            <Pressable onPress={() => remover(item.id)} hitSlop={10}>
              <Text style={styles.x}>✕</Text>
            </Pressable>
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
    marginBottom: 12,
  },
  // Botão vermelho de apagar tudo
  botaoApagar: {
    backgroundColor: "#BE123C",
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  recado: {
    flexDirection: "row", // texto e ✕ lado a lado
    alignItems: "center", // alinha os dois no centro vertical
    justifyContent: "space-between", // texto à esquerda, ✕ à direita
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  // flex: 1 faz o texto ocupar o espaço que sobra e quebrar a linha
  // se for grande, sem empurrar o ✕ para fora
  recadoTexto: { flex: 1, marginRight: 12 },
  x: { fontSize: 18, fontWeight: "bold", color: "#BE123C" },
});