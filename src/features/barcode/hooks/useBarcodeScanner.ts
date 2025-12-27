import { useState, useCallback } from 'react';
import { Alert, Linking } from 'react-native';

interface BarcodeResult {
  data: string;
  type: string;
}

interface Product {
  barcode: string;
  name: string;
  brand?: string;
  category?: string;
}

export const useBarcodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestCameraPermission = useCallback(async () => {
    try {
      setHasPermission(true); // Simplified for now
      return true;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }, []);

  const lookupProduct = useCallback(async (barcode: string): Promise<Product | null> => {
    try {
      const mockProducts: Record<string, Product> = {
        '123456789012': { barcode: '123456789012', name: 'Milk', brand: 'Dairy Farm', category: 'Dairy' },
        '987654321098': { barcode: '987654321098', name: 'Bread', brand: 'Bakery Co', category: 'Bakery' }
      };
      
      return mockProducts[barcode] || null;
    } catch (error) {
      console.error('Product lookup failed:', error);
      return null;
    }
  }, []);

  const startScanning = useCallback(async () => {
    const permission = hasPermission ?? await requestCameraPermission();
    if (permission) {
      setIsScanning(true);
    }
  }, [hasPermission, requestCameraPermission]);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
  }, []);

  const handleBarcodeScan = useCallback(async (result: BarcodeResult) => {
    setIsScanning(false);
    const product = await lookupProduct(result.data);
    return { barcode: result.data, product };
  }, [lookupProduct]);

  return {
    isScanning,
    hasPermission,
    startScanning,
    stopScanning,
    handleBarcodeScan,
    requestCameraPermission
  };
};