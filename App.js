import { StatusBar } from 'expo-status-bar';
// Importa a barra de status do Expo

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
// StyleSheet = cria os estilos
// Text = mostra textos
// View = cria o espaço/container
// Button = cria o botão
// Alert = mostra uma mensagem na tela


export default function App() {
  // Cria o componente principal do aplicativo


  const nome = "Stefani Hermel";
  // Guarda o seu nome em uma constante

  const cargo = "Desenvolvedora Mobile em formação";
  // Guarda o seu cargo em uma constante

  const cidade = "Garopaba, SC";
  // Guarda sua cidade em uma constante

  const email = "seuemail@email.com";
  // Guarda seu e-mail em uma constante
  // Depois você pode trocar pelo seu e-mail


  const disponivel = true;
  // true significa que você está disponível para projetos
  // Se fosse false, significaria que não está disponível


  return (
    <View style={styles.container}>
      {/* View = o container principal da tela */}


      <Text style={styles.nome}>{nome}</Text>
      {/* Mostra o nome que está guardado na constante nome */}


      <Text style={styles.cargo}>{cargo}</Text>
      {/* Mostra o cargo que está guardado na constante cargo */}


      <Text>{cidade}</Text>
      {/* Mostra a cidade */}


      <Text>
        {disponivel ? "Disponível para projetos" : "Indisponível"}
      </Text>
      {/* 
        Aqui usamos o operador ternário:

        se disponivel for true:
        → "Disponível para projetos"

        se for false:
        → "Indisponível"
      */}


      <View style={styles.espacoBotao}>
        {/* Cria um espaço antes do botão */}

        <Button
          title="Entrar em contato"
          // Texto que aparece no botão

          onPress={() => Alert.alert("Contato", email)}
          // Quando clicar no botão, aparece uma mensagem
          // mostrando o e-mail
        />

      </View>


      <StatusBar style="auto" />
      {/* Configura a barra de status do celular */}

    </View>
  );
}


const styles = StyleSheet.create({
  // Aqui criamos os estilos da tela

  container: {
    flex: 1,
    // Ocupa toda a tela

    alignItems: "center",
    // Centraliza os elementos na horizontal

    justifyContent: "center",
    // Centraliza os elementos na vertical

    backgroundColor: "lightblue",
    // Cor do fundo
  },


  nome: {
    fontSize: 28,
    // Deixa o nome maior

    fontWeight: "bold",
    // Deixa o nome em negrito
  },


  cargo: {
    color: "blue",
    // Muda a cor do cargo
  },


  espacoBotao: {
    marginTop: 20,
    // Cria espaço entre o texto e o botão
  },

});