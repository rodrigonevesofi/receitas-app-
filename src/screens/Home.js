import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';

export default function Home({ navigation }) {
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const insets = useSafeAreaInsets();

  async function carregarReceitas() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken',
        { timeout: 15000 }
      );
      setReceitas(resposta.data.meals || []);
    } catch {
      setErro('Não foi possível carregar as receitas. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarReceitas();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#a74420" />
        <Text style={styles.mensagem}>Carregando receitas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.mensagem}>{erro}</Text>
        <TouchableOpacity style={styles.botao} onPress={carregarReceitas} accessibilityRole="button">
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={receitas}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={[styles.lista, { paddingBottom: 16 + insets.bottom }]}
      ListHeaderComponent={<Text style={styles.titulo}>Receitas com frango</Text>}
      ListEmptyComponent={<Text style={styles.mensagem}>Nenhuma receita encontrada.</Text>}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Detalhes', { receita: item })}
          accessibilityRole="button"
          accessibilityLabel={`Ver receita: ${item.strMeal}`}
        >
          <Image source={{ uri: item.strMealThumb }} style={styles.imagem} />
          <Text style={styles.nome}>{item.strMeal}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  mensagem: {
    color: '#555',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  lista: {
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#30251f',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9e1d8',
  },
  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#30251f',
    padding: 16,
  },
  botao: {
    backgroundColor: '#a74420',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
});
