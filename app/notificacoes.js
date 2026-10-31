import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export default function Notificacoes() {
  const [naoLidas, setNaoLidas] = useState(0);
  const navigation = useNavigation();

  // desafio extra: número na bolinha da aba
  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: naoLidas > 0 ? naoLidas : undefined,
    });
  }, [naoLidas, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔔 {naoLidas} não lidas</Text>

      <TouchableOpacity style={styles.botao} onPress={() => setNaoLidas(naoLidas + 1)}>
        <Text style={styles.textoBotao}>Chegou notificação</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => setNaoLidas(0)}>
        <Text style={styles.textoBotao}>Marcar todas como lidas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, gap: 12 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginVertical: 16 },
  botao: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
});