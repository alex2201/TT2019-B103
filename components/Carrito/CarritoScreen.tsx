import SegmentedControl from '@react-native-community/segmented-control';
import * as React from 'react';
import { Alert } from 'react-native';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseUrl from '../BaseUrl';
import Globals from '../Globals';
import Producto from './Model/Producto';
import ProductoCarrito from './Model/ProductoCarrito';

let productosPrueba: ProductoCarrito[] = [
  new ProductoCarrito(new Producto("1", "Producto 1", 50.50, 23, "Generica", "Categoría"), 1),
  new ProductoCarrito(new Producto("2", "Producto 2", 50.50, 23, "Generica", "Categoría"), 1),
  new ProductoCarrito(new Producto("5", "Producto 5", 50.50, 23, "Generica", "Categoría"), 1),
];
let productosPendientesPrueba: Producto[] = [
  new Producto("1", "Producto 1", 50.50, 23, "Generica", "Categoría"),
  new Producto("2", "Producto 2", 50.50, 23, "Generica", "Categoría"),
  new Producto("3", "Producto 3", 80.50, 23, "Generica", "Categoría"),
  new Producto("8", "Producto 8", 150.50, 23, "Generica", "Categoría"),
];
let productosRecomendacionesPrueba: Producto[] = [
  new Producto("1", "Producto 1 con un nmbre largo", 50.50, 23, "Generica", "Categoría"),
  new Producto("2", "Producto 2", 50.50, 23, "Generica", "Categoría"),
  new Producto("3", "Producto 3", 50.50, 23, "Generica", "Categoría"),
  new Producto("4", "Producto 4", 50.50, 23, "Generica", "Categoría"),
  new Producto("5", "Producto 5", 50.50, 23, "Generica", "Categoría"),
];

class CarritoScreen extends React.Component<any, {
  data: ProductoCarrito[],
  recomendaciones: Producto[],
  pendientes: Producto[],
  selectedIndex: number
}> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      data: new Array<ProductoCarrito>(),
      recomendaciones: new Array<Producto>(),
      pendientes: new Array<Producto>(),
      selectedIndex: 0,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => { this.props.navigation.navigate('BarCodeScanner', {}) }} title="Escanear" />
      ),
    });
    this.props.navigation.addListener(
      'focus',
      (payload: any) => {
        console.debug('willFocus', payload);
        this.obtenerRecomendaciones()
      }
    );
  }

  async obtenerRecomendaciones() {
    console.log("Obteniendo recomendaciones...")
    let socio = Globals.socio
    console.log(socio)
    if (socio !== null) {
      let idSocio = socio.idSocio
      let request = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: idSocio })
      };
      const rawResponse = await fetch(`${BaseUrl}/get_recs`, request);
      console.log(rawResponse)
      const content = await rawResponse.json();
      let recomendaciones = content.productsInfo.productsInfo as Producto[]
      this.setState({ recomendaciones: recomendaciones })
    }
  }

  styles = StyleSheet.create({
    titulo: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: 5,
    },
    tituloRecomendacion: {
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: 5,
    },
    qtyBtn: {
      borderRadius: 5,
      width: 30,
      marginLeft: 8,
      marginRight: 8,
    },
    pagarBtn: {
      borderRadius: 5,
      backgroundColor: 'black',
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
    }
  })

  renderItemComponent = (item: ProductoCarrito) => {
    return (
      <View
        style={{
          height: 150,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <View
          style={{
            width: "25%",
          }}
        >
          <Image
            source={require('../../resources/no-imagen-producto.jpg')}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        <View
          style={{
            flexGrow: 1,
            padding: 15,
          }}
        >
          <Text style={this.styles.titulo}>{item.producto.nombre}</Text>
          <Text style={{ marginBottom: 5 }}>{`Código: ${item.producto.idProducto}`}</Text>
          <Text style={{ marginBottom: 5 }}>{`Precio: $${item.producto.precioUnitario.toFixed(2)} MXN`}</Text>
          <View
            style={{
              marginTop: 5,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {this.QtyButton({ title: "-", onPress: () => { this.handleQtyChangeOnItem(item, false) } })}
            <Text>{`Cantidad: ${item.cantidad}`}</Text>
            {this.QtyButton({ title: "+", onPress: () => { this.handleQtyChangeOnItem(item, true) } })}
          </View>
        </View>
      </View>
    );
  }

  renderItemPendienteComponent = (item: Producto) => {
    return (
      <View
        style={{
          height: 150,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <View
          style={{
            width: "25%",
          }}
        >
          <Image
            source={require('../../resources/no-imagen-producto.jpg')}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </View>

        <View
          style={{
            flexGrow: 1,
            padding: 15,
          }}
        >
          <Text style={this.styles.titulo}>{item.nombre}</Text>
          <Text style={{ marginBottom: 5 }}>{`Código: ${item.idProducto}`}</Text>
          <Text style={{ marginBottom: 5 }}>{`Precio: $${item.precioUnitario.toFixed(2)} MXN`}</Text>
          <Text style={{ marginBottom: 5 }}>{`Sección: ${item.nombreSubCat}`}</Text>

        </View>
      </View>
    );
  }

  renderItemRecomendacionComponent = (item: Producto) => {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={(e) => {
            this.handleRecomendacionPress(item)
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
            }}
          >
            <Image
              source={require('../../resources/no-imagen-producto.jpg')}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </View>

          <View>
            <Text style={this.styles.tituloRecomendacion} numberOfLines={2} >{item.nombre}</Text>
            <Text style={{ marginBottom: 5 }}>{`$${item.precioUnitario.toFixed(2)} MXN`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  QtyButton = ({ title, onPress }: { title: string, onPress: () => void }) => {
    let iconName = title === '+' ? "add-circle-outline" : "remove-circle-outline";
    return (
      <TouchableOpacity style={this.styles.qtyBtn} onPress={onPress}>
        <Icon name={iconName} size={30} />
      </TouchableOpacity>
    );
  };

  ItemSeparator = () => {
    return (<View style={{
      height: 2,
      backgroundColor: "rgba(0,0,0,0.5)",
      marginTop: 5,
      marginBottom: 5,
    }}
    />);
  }

  handleQtyChangeOnItem(item: ProductoCarrito, add: boolean) {
    let itemIndex = this.state.data.indexOf(item);
    let newData = this.state.data;
    if (add) {
      newData[itemIndex].cantidad = item.cantidad + 1
    } else if (newData[itemIndex].cantidad > 1) {
      newData[itemIndex].cantidad = item.cantidad - 1
    } else {
      newData = newData.filter((x, index, y) => { return index != itemIndex; });
    }

    this.setState({
      data: newData
    })
  }

  handleRecomendacionPress(item: Producto) {
    let descripcion = `${item.nombre}\n$${item.precioUnitario.toFixed(2)} MXN\n${item.nombreSubCat}`
    Alert.alert(
      'Producto',
      descripcion,
      [
        {
          text: 'Mapa',
          onPress: () => {
            if (Globals.goToMapa !== null) {
              Globals.goToMapa()
            }
          }
        },
        {
          text: 'Agregar a pendientes', onPress: () => {
            var pendientes = this.state.pendientes
            if (pendientes.filter((x) => x.idProducto === item.idProducto).length === 0) {
              pendientes.push(item)
              this.setState({ pendientes: pendientes })
              Alert.alert(
                "Aviso",
                "El producto se agregó a la lista de pendientes."
              )
            } else {
              Alert.alert(
                "Aviso",
                "Este producto ya se encuentra en la lista de pendientes."
              )
            }
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    let totalCompra = this.state.data.length > 0 ? this.state.data
      .map((item) => { return item.cantidad * item.producto.precioUnitario })
      .reduce((prevValue, currentValue, _) => { return prevValue + currentValue })
      .toFixed(2) : 0.00;

    return (
      <View
        style={{
          height: "100%",
        }}
      >
        <SegmentedControl
          values={['Compra', 'Pendiente']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
          }}
        />
        {
          this.state.selectedIndex === 0
          &&
          <FlatList
            style={{
              width: '100%'
            }}
            data={this.state.data}
            renderItem={item => this.renderItemComponent(item.item)}
            keyExtractor={item => item.producto.idProducto}
            ItemSeparatorComponent={this.ItemSeparator}
          />
        }

        {
          this.state.selectedIndex === 1
          &&
          <FlatList
            style={{
              width: '100%'
            }}
            data={this.state.pendientes}
            renderItem={item => this.renderItemPendienteComponent(item.item)}
            keyExtractor={item => item.idProducto}
            ItemSeparatorComponent={this.ItemSeparator}
          />
        }

        <View
          style={{
            height: 130,
            width: "100%",
            borderTopWidth: 1,
            borderTopColor: 'black'
          }}
        >
          <FlatList
            data={this.state.recomendaciones}
            renderItem={item => this.renderItemRecomendacionComponent(item.item)}
            keyExtractor={item => item.idProducto}
            ItemSeparatorComponent={this.ItemSeparator}
            horizontal={true}
          />
        </View>

        <View
          style={{
            padding: 10,
          }}
        >

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24
              }}
            > {"Total de compra:"}</Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}
            > {`$${totalCompra} MXN`}</Text>
          </View>

          <TouchableOpacity
            style={this.styles.pagarBtn}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {"Pagar"}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default CarritoScreen;
