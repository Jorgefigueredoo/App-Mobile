import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCharacters = async (pageNum = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNum}`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }
      
      const data = await response.json();
      
      if (isRefresh) {
        setCharacters(data.results);
        setPage(1);
      } else {
        setCharacters(prev => pageNum === 1 ? data.results : [...prev, ...data.results]);
      }
      
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCharacters(1);
  }, []);

  const onRefresh = () => {
    fetchCharacters(1, true);
  };

  const loadMore = () => {
    if (!loading) {
      fetchCharacters(page + 1);
      setPage(prev => prev + 1);
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'alive': return '#55cc44';
      case 'dead': return '#d63d2e';
      default: return '#9e9e9e';
    }
  };

  const renderCharacter = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={styles.status}>{item.status} - {item.species}</Text>
        </View>
        <Text style={styles.detail}>Origem: {item.origin.name}</Text>
        <Text style={styles.detail} numberOfLines={1}>
          Localização: {item.location.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && characters.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00b5cc" />
        <Text style={styles.loadingText}>Carregando personagens...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error && characters.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => fetchCharacters(1)}
        >
          <Text style={styles.retryText}>Tentar Novamente</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛸 Rick and Morty</Text>
        <Text style={styles.headerSubtitle}>
          {characters.length} personagens carregados
        </Text>
      </View>
      
      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#00b5cc']}
          />
        }
        ListFooterComponent={
          loading && characters.length > 0 ? (
            <ActivityIndicator size="small" color="#00b5cc" style={styles.footerLoader} />
          ) : null
        }
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: '#00b5cc',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0f7fa',
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  status: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detail: {
    fontSize: 13,
    color: '#888',
    marginTop: 3,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d63d2e',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#00b5cc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerLoader: {
    marginVertical: 20,
  },
});