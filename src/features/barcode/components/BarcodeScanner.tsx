import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useBarcodeScanner } from '../hooks/useBarcodeScanner';

interface BarcodeScannerProps {
  onScan: (barcode: string, product: any) => void;
  onClose: () => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const { isScanning, startScanning, stopScanning, handleBarcodeScan } = useBarcodeScanner();

  const handleScan = async (result: { data: string; type: string }) => {
    const scanResult = await handleBarcodeScan(result);
    onScan(scanResult.barcode, scanResult.product);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Barcode</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cameraContainer}>
        {/* Camera view would go here */}
        <View style={styles.mockCamera}>
          <Text style={styles.mockText}>Camera View</Text>
          <TouchableOpacity 
            style={styles.mockScanButton}
            onPress={() => handleScan({ data: '123456789012', type: 'EAN13' })}
          >
            <Text style={styles.mockScanText}>Mock Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
        <Text style={styles.instruction}>Position barcode within the frame</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
  },
  cameraContainer: {
    flex: 1,
  },
  mockCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  mockText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  mockScanButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  mockScanText: {
    color: '#fff',
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
  },
  instruction: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
});