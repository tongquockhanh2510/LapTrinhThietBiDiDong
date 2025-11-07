import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTaskContext } from '@/contexts/task-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function SyncSettingsScreen() {
  const router = useRouter();
  const { 
    syncStatus,
    syncToCloud,
    syncFromCloud,
    getLastSyncText,
    tasks,
    setApiUrl,
    getApiUrl,
  } = useTaskContext();

  const [apiUrlInput, setApiUrlInput] = useState(getApiUrl());
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  const handleSyncToCloud = async () => {
    Alert.alert(
      'Upload to Cloud',
      `This will upload ${tasks.length} tasks to cloud. Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Upload', 
          onPress: async () => {
            await syncToCloud();
            Alert.alert('Success', 'Data uploaded to cloud successfully!');
          }
        },
      ]
    );
  };

  const handleSyncFromCloud = async () => {
    Alert.alert(
      'Download from Cloud',
      'This will replace local data with cloud data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          style: 'destructive',
          onPress: async () => {
            await syncFromCloud();
            Alert.alert('Success', 'Data downloaded from cloud successfully!');
          }
        },
      ]
    );
  };

  const handleSaveApiUrl = async () => {
    if (!apiUrlInput.trim()) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }

    try {
      await setApiUrl(apiUrlInput);
      setIsEditingUrl(false);
      Alert.alert(
        'Success', 
        'Mock API URL updated successfully!\n\nNew URL: ' + apiUrlInput
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save API URL');
    }
  };

  const handleEditUrl = () => {
    setIsEditingUrl(true);
  };

  const handleCancelEditUrl = () => {
    setApiUrlInput(getApiUrl());
    setIsEditingUrl(false);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Cloud Sync</ThemedText>
      </View>

      {/* Sync Status Card */}
      <View style={styles.statusCard}>
        <MaterialIcons 
          name={syncStatus.error ? 'cloud-off' : 'cloud-done'} 
          size={48} 
          color={syncStatus.error ? '#FF6B6B' : '#4CAF50'} 
        />
        <ThemedText style={styles.statusTitle}>
          {syncStatus.isSyncing ? 'Syncing...' : 
           syncStatus.error ? 'Sync Error' :
           'Synced'}
        </ThemedText>
        <ThemedText style={styles.statusSubtitle}>
          {syncStatus.isSyncing ? 'Please wait' : 
           syncStatus.error ? syncStatus.error :
           `Last sync: ${getLastSyncText()}`}
        </ThemedText>
      </View>

      {/* Sync Actions */}
      <View style={styles.actionsContainer}>
        <ThemedText style={styles.sectionTitle}>API Configuration</ThemedText>

        {/* API URL Input */}
        <View style={styles.apiUrlContainer}>
          <View style={styles.apiUrlHeader}>
            <MaterialIcons name="link" size={20} color="#666" />
            <ThemedText style={styles.apiUrlLabel}>Mock API URL</ThemedText>
          </View>
          
          {isEditingUrl ? (
            <View style={styles.apiUrlEditContainer}>
              <TextInput
                style={styles.apiUrlInput}
                value={apiUrlInput}
                onChangeText={setApiUrlInput}
                placeholder="https://your-api.mockapi.io/api/v1"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.apiUrlButtons}>
                <TouchableOpacity 
                  style={[styles.apiUrlButton, styles.cancelButton]}
                  onPress={handleCancelEditUrl}
                >
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.apiUrlButton, styles.saveButton]}
                  onPress={handleSaveApiUrl}
                >
                  <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.apiUrlDisplayContainer}>
              <ThemedText style={styles.apiUrlText} numberOfLines={2}>
                {apiUrlInput}
              </ThemedText>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={handleEditUrl}
              >
                <MaterialIcons name="edit" size={20} color="#2196F3" />
                <ThemedText style={styles.editButtonText}>Edit</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ThemedText style={[styles.sectionTitle, { marginTop: 20 }]}>Sync Options</ThemedText>

        {/* Upload to Cloud */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleSyncToCloud}
          disabled={syncStatus.isSyncing}
        >
          <View style={styles.actionIcon}>
            <MaterialIcons name="cloud-upload" size={24} color="#4CAF50" />
          </View>
          <View style={styles.actionContent}>
            <ThemedText style={styles.actionTitle}>Upload to Cloud</ThemedText>
            <ThemedText style={styles.actionSubtitle}>
              Save {tasks.length} tasks to cloud storage
            </ThemedText>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        {/* Download from Cloud */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleSyncFromCloud}
          disabled={syncStatus.isSyncing}
        >
          <View style={styles.actionIcon}>
            <MaterialIcons name="cloud-download" size={24} color="#2196F3" />
          </View>
          <View style={styles.actionContent}>
            <ThemedText style={styles.actionTitle}>Download from Cloud</ThemedText>
            <ThemedText style={styles.actionSubtitle}>
              Replace local data with cloud data
            </ThemedText>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {syncStatus.isSyncing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <ThemedText style={styles.loadingText}>Syncing...</ThemedText>
        </View>
      )}

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <MaterialIcons name="info" size={20} color="#666" />
        <ThemedText style={styles.infoText}>
          Enter your Mock API URL (e.g., mockapi.io, JSONPlaceholder, or custom endpoint). 
          Currently using simulated in-memory storage for demo.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  statusCard: {
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    alignItems: 'center',
    gap: 10,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 10,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  apiUrlContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  apiUrlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  apiUrlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  apiUrlEditContainer: {
    gap: 12,
  },
  apiUrlInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#000',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  apiUrlButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  apiUrlButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  apiUrlDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  apiUrlText: {
    flex: 1,
    fontSize: 13,
    color: '#2196F3',
    fontFamily: 'monospace',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2196F3',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  actionIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFF9E6',
    borderRadius: 10,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});
