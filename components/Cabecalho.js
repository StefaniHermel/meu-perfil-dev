import { StyleSheet, Text, View, Image } from 'react-native';

export default function Cabecalho({ foto, nome, cargo }) {
  return (
    <View style={styles.cabecalho}>
      <Text style={styles.boasVindas}>Bem-vindo ao meu perfil</Text>

      <Image source={{ uri: foto }} style={styles.foto} />

      <Text style={styles.nome}>{nome}</Text>

      <View style={styles.cargoBox}>
        <Text style={styles.cargo}>{cargo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  boasVindas: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4169E1',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4169E1',
    marginBottom: 12,
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cargoBox: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 8,
  },
  cargo: {
    color: '#3730A3',
    fontSize: 14,
    fontWeight: '600',
  },
});