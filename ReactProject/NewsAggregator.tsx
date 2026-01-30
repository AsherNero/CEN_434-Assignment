import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Linking, StyleSheet, Text, TouchableOpacity, View, StatusBar, SafeAreaView } from 'react-native';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const NewsAggregator = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=7585afa893b647b4ae62d63350f49216');
        const data = await response.json();
        if (data.status === 'ok') {
          setNews(data.articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.card} 
      onPress={() => Linking.openURL(item.url)}
    >
      <View style={styles.sourceBadge}>
        <Text style={styles.sourceText}>{item.source.name}</Text>
      </View>
      
      <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
      
      <Text style={styles.newsDescription} numberOfLines={3}>
        {item.description || "No description available for this breaking story."}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.dateText}>
          {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
        <Text style={styles.readMore}>Read Article →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Feed</Text>
        <View style={styles.dot} />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Fetching latest updates...</Text>
        </View>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNewsItem}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F9FB', // Soft off-white background
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6C63FF',
    marginLeft: 4,
    marginTop: 10,
  },
  listPadding: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    // Modern Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  sourceBadge: {
    backgroundColor: '#F0EFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  sourceText: {
    color: '#6C63FF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 24,
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  readMore: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '700',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  }
});

export default NewsAggregator;