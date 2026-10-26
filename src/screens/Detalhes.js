import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Detalhes({ route }) {
  const { receita } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={[styles.conteudo, { paddingBottom: 24 + insets.bottom }]}>
      <Image source={{ uri: receita.strMealThumb }} style={styles.imagem} />
      <Text style={styles.nome}>{receita.strMeal}</Text>
      <Text style={styles.categoria}>{receita.strCategory} · {receita.strArea}</Text>
      <Text style={styles.subtitulo}>Modo de preparo</Text>
      <Text style={styles.preparo}>{receita.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    padding: 16,
  },
  imagem: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#30251f',
    marginTop: 20,
  },
  categoria: {
    color: '#766456',
    fontSize: 16,
    marginTop: 8,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a74420',
    marginTop: 24,
    marginBottom: 12,
  },
  preparo: {
    fontSize: 16,
    lineHeight: 26,
    color: '#403a35',
  },
});
