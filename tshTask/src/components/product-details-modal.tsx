import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  ImageBackground,
} from 'react-native';
import {fetchProduct} from '../api/api-utils';
import {colors, globalStyle} from '../styles/styles';
import {Product} from '../types';

const close = require('../assets/images/close.png');

interface Props {
  itemId: number;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const ProductDetailsModal: React.FC<Props> = ({
  itemId,
  modalVisible,
  setModalVisible,
}) => {
  const [data, setData] = useState<Product>({} as any);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const result = await fetchProduct(itemId);
      setData(result);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent>
      <View style={styles.modalContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={56} color={colors.blue} />
          </View>
        ) : (
          <View style={styles.modalInside}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{uri: data.image}}
                style={styles.image}
                imageStyle={styles.imageStyle}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeContainer}>
                  <Image source={close} style={styles.closeImage} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.textContainer}>
                <Text style={[globalStyle.productName, {fontSize: 24}]}>
                  {data.name}
                </Text>
                <Text style={[globalStyle.productDescription, {fontSize: 18}]}>
                  {data.description}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageContainer: {
    flex: 0.6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageStyle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    flex: 0.4,
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  textContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(26,27,29,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingContainer: {
    backgroundColor: colors.white,
    flex: 1,
    maxHeight: 570,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInside: {
    backgroundColor: colors.white,
    flex: 1,
    maxHeight: 570,
    borderRadius: 8,
    width: '100%',
  },
  closeContainer: {
    marginTop: 16,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  closeImage: {
    width: 24,
    height: 24,
    padding: 9,
  },
});
