import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {ProductStars} from '../components/product-star';
import {colors, fonts, globalStyle} from '../styles/styles';
import {Product} from '../types';
import {ProductDetailsModal} from './product-details-modal';

interface Props {
  item: Product;
}

export const ProductItem: React.FC<Props> = ({item}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {item.active ? (
          <ImageBackground
            source={{uri: item.image}}
            style={styles.image}
            imageStyle={styles.imageStyle}>
            {item.promo ? (
              <View style={styles.promoContainer}>
                <Text style={styles.promoText}>Promo</Text>
              </View>
            ) : null}
          </ImageBackground>
        ) : (
          <Grayscale style={styles.greyscaleFlex}>
            <ImageBackground
              source={{uri: item.image}}
              style={styles.image}
              imageStyle={styles.imageStyleDisabled}>
              {item.promo ? (
                <View style={styles.promoContainer}>
                  <Text style={styles.promoText}>Promo</Text>
                </View>
              ) : null}
            </ImageBackground>
          </Grayscale>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={globalStyle.productName}>{item.name}</Text>
          <Text style={globalStyle.productDescription}>{item.description}</Text>
        </View>
        <View style={styles.starsContainer}>
          <ProductStars rating={item.rating} />
        </View>
        <View style={styles.buttonContainer}>
          {item.active ? (
            <TouchableOpacity
              style={globalStyle.logButton}
              onPress={() => setModalVisible(true)}>
              <Text style={[globalStyle.logButtonText, {fontSize: 14}]}>
                Show details
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={globalStyle.logButtonDisabled} disabled>
              <Text style={[globalStyle.logButtonText, {fontSize: 14}]}>
                Unavailable
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {modalVisible ? (
        <ProductDetailsModal
          key={`key-${item.id}`}
          itemId={item.id}
          modalVisible={modalVisible}
          setModalVisible={(value) => setModalVisible(value)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageContainer: {
    flex: 0.45,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageStyle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageStyleDisabled: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    opacity: 0.7,
  },
  contentContainer: {
    flex: 0.55,
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  promoContainer: {
    zIndex: 1000,
    opacity: 1,
    marginTop: 16,
    width: 75,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
  },
  promoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.normal.n600,
  },
  greyscaleFlex: {
    flex: 1,
  },
  textContainer: {
    flex: 0.5,
  },
  starsContainer: {
    flex: 0.25,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.25,
    justifyContent: 'center',
  },
});
