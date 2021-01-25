import SegmentedControl from '@react-native-community/segmented-control';
import * as React from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform } from 'react-native';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import AsyncImageAnimated from 'react-native-async-image-animated';
import CreditCard from 'react-native-credit-card-form-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseUrl from '../BaseUrl';
import Globals from '../Globals';
import GlobalStyles from '../GlobalStyles';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import Producto from './Model/Producto';
import ProductoCarrito from './Model/ProductoCarrito';

let productosPrueba: ProductoCarrito[] = [
  new ProductoCarrito(new Producto("1", "Producto 1", 50.50, 23, "Generica", "Categoría", "y", null), 1),
  new ProductoCarrito(new Producto("2", "Producto 2", 50.50, 23, "Generica", "Categoría", "y", null), 1),
  new ProductoCarrito(new Producto("5", "Producto 5", 50.50, 23, "Generica", "Categoría", "n", null), 1),
];
let productosPendientesPrueba: Producto[] = [
  new Producto("1", "Producto 1", 50.50, 23, "Generica", "Categoría", "n", null),
  new Producto("2", "Producto 2", 50.50, 23, "Generica", "Categoría", "n", null),
  new Producto("3", "Producto 3", 80.50, 23, "Generica", "Categoría", "n", null),
  new Producto("8", "Producto 8", 150.50, 23, "Generica", "Categoría", "n", null),
];
let productosRecomendacionesPrueba: Producto[] = [
  new Producto("1", "Producto 1 con un nmbre largo", 50.50, 23, "Generica", "Categoría", "n", null),
  new Producto("2", "Producto 2", 50.50, 23, "Generica", "Categoría", "n", null),
  new Producto("3", "Producto 3", 50.50, 23, "Generica", "Categoría", "n", null),
  new Producto("4", "Producto 4", 50.50, 23, "Generica", "Categoría", "n", null),
  new Producto("5", "Producto 5", 50.50, 23, "Generica", "Categoría", "n", null),
];

class CarritoScreen extends React.Component<any, {
  carrito: ProductoCarrito[],
  recomendaciones: Producto[],
  pendientes: Producto[],
  selectedIndex: number,
  mostrarModalPago: boolean,
  mostrarModalCalificar: boolean,
  productoSeleccionado: Producto | null,
  calificacion: number
}> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      carrito: new Array<ProductoCarrito>(),
      recomendaciones: new Array<Producto>(),
      pendientes: new Array<Producto>(),
      selectedIndex: 0,
      mostrarModalPago: false,
      mostrarModalCalificar: false,
      productoSeleccionado: null,
      calificacion: 0
    }
  }

  creditCardRef = React.createRef() as any

  componentDidMount() {
    Globals.actualizarCarrito = (item: Producto) => {
      let carritoActual = this.state.carrito
      console.log("Buscando item en carrito", item.idProducto)
      let indexProductoCarrito = carritoActual.findIndex(element => element.producto.idProducto === item.idProducto)
      if (indexProductoCarrito > -1) {
        console.log("Se encontró el producto en el carrito...", indexProductoCarrito)
        let producto = carritoActual[indexProductoCarrito]
        producto.cantidad += 1
        carritoActual[indexProductoCarrito] = producto
        this.setState({ carrito: carritoActual })
      } else {
        let nuevoProducto = new ProductoCarrito(item, 1)
        carritoActual.push(nuevoProducto)
        this.setState({ carrito: carritoActual })
      }
    }
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
    let socio = Globals.socio
    if (socio !== null) {
      let idSocio = socio.idSocio
      console.log("Obteniendo recomendaciones...", idSocio)
      let request = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: idSocio })
      };
      const rawResponse = await fetch(`${BaseUrl}/get_recs`, request);
      const content = await rawResponse.json();
      let recomendaciones = content.productsInfo.productsInfo as Producto[]
      this.setState({ recomendaciones: recomendaciones })
      console.log("Se obtuvieron recomendaciones...", idSocio)
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
          <AsyncImageAnimated
            source={{
              uri: 'https://i.imgur.com/R5TraVR.png'
            }}
            placeholderColor={'#cfd8dc'}
            placeholderSource={require('../../resources/no-imagen-producto.jpg')}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
          {/* <Image
            source={require('../../resources/no-imagen-producto.jpg')}
            style={{
              height: "100%",
              width: "100%",
            }}
          /> */}
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
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 16,
              }}
              onPress={
                () => {
                  this.setState({ productoSeleccionado: item.producto })
                }
              }
            >
              <Icon name={item.producto.valoracion === 'y' ? "star" : "star-outline"} size={30} color={'black'} />
            </TouchableOpacity>
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
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <View
          style={{
            width: "25%",
          }}
        >
          <AsyncImageAnimated
            source={{
              uri: item.img ?? ""
            }}
            placeholderColor={'#cfd8dc'}
            placeholderSource={require('../../resources/no-imagen-producto.jpg')}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
          {/* <Image
            source={require('../../resources/no-imagen-producto.jpg')}
            style={{
              height: "100%",
              width: "100%",
            }}
          /> */}
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
            <AsyncImageAnimated
              source={{
                uri: item.img ?? ""
              }}
              placeholderColor={'#cfd8dc'}
              placeholderSource={require('../../resources/no-imagen-producto.jpg')}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
            {/* <Image
              source={require('../../resources/no-imagen-producto.jpg')}
              style={{
                height: "100%",
                width: "100%",
              }}
            /> */}
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
    let itemIndex = this.state.carrito.indexOf(item);
    let newData = this.state.carrito;
    if (add) {
      if (this.state.carrito.reduce((prev, x) => prev + x.cantidad, 0) < 20) {
        newData[itemIndex].cantidad = item.cantidad + 1
      } else {
        Alert.alert("Aviso", "No puede agregar más de 20 artículos a su carrito.")
      }
    } else if (newData[itemIndex].cantidad > 1) {
      newData[itemIndex].cantidad = item.cantidad - 1
    } else {
      newData = newData.filter((x, index, y) => { return index != itemIndex; });
    }

    this.setState({
      carrito: newData
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

  terminarPago() {
    if (this.creditCardRef.current) {
      const { error, data } = this.creditCardRef.current.submit();
      console.log('ERROR: ', error);
      console.log('CARD DATA: ', data);
    }

    this.registrarCompra()
    this.setState({
      mostrarModalPago: false,
      carrito: new Array<ProductoCarrito>(),
      pendientes: new Array<Producto>(),
    })
    Alert.alert('Aviso', 'La compra se registró exitosamente. Puede consultar el resumen en el apartado de cuenta.')
  }

  async registrarCompra() {
    let carrito = this.state.carrito
    let idsProductos = carrito.map((val) => val.producto.idProducto)
    let cantidadesProductos = carrito.map((val) => val.cantidad)
    let socio = Globals.socio!
    let objeto = {
      idSocio: socio.idSocio,
      idProductos: idsProductos,
      cantidades: cantidadesProductos
    }

    console.log("Registrando compra...")
    let request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objeto)
    };
    console.log(objeto)
    const rawResponse = await fetch(`${BaseUrl}/insert_hist`, request);
    console.log(rawResponse)
    const content = await rawResponse.json();
    console.log(content)
    if (content.success === true) {
      console.log('Registro de compra exitoso.')
    } else {
      console.log('Falló el registro de compra.')
    }
  }

  handleSubmit = () => {
    if (this.creditCardRef.current) {
      const { error, data } = this.creditCardRef.current.submit();
      console.log('ERROR: ', error);
      console.log('CARD DATA: ', data);
    }
  }

  async actualizarCalificacion(idProducto: string, rating: number) {
    console.log("Actualizando calificacion...", idProducto, rating)
    let request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idProducto: idProducto, idSocio: Globals.socio!.idSocio, rating: rating })
    };
    const rawResponse = await fetch(`${BaseUrl}/insert_rating`, request);
    console.log(rawResponse)
    console.log("Termino calificacion...")
  }

  render() {
    let totalCompra = this.state.carrito.length > 0 ? this.state.carrito
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
            data={this.state.carrito}
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
            onPress={() => {
              if (this.state.carrito.length > 0) {
                this.setState({ mostrarModalPago: true })
              } else {
                Alert.alert("Aviso", "No tiene productos en su carrito de compras.")
              }

            }}
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

        <Modal
          visible={this.state.productoSeleccionado !== null}
          transparent={true}
        >
          <View
            style={{
              height: '100%',
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: 200,
                width: 200,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ calificacion: 1 })}
                >
                  <Icon name={this.state.calificacion >= 1 ? "star" : "star-outline"} size={30} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ calificacion: 2 })}
                >
                  <Icon name={this.state.calificacion >= 2 ? "star" : "star-outline"} size={30} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ calificacion: 3 })}
                >
                  <Icon name={this.state.calificacion >= 3 ? "star" : "star-outline"} size={30} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ calificacion: 4 })}
                >
                  <Icon name={this.state.calificacion >= 4 ? "star" : "star-outline"} size={30} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ calificacion: 5 })}
                >
                  <Icon name={this.state.calificacion >= 5 ? "star" : "star-outline"} size={30} color={'black'} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={GlobalStyles.primaryBtnContainer}
                onPress={
                  () => {
                    if (this.state.calificacion! > 0) {
                      let carrito = this.state.carrito
                      let indexProducto = carrito.findIndex((value) => value.producto.idProducto == this.state.productoSeleccionado!.idProducto)
                      let productoCarrito = carrito[indexProducto]
                      productoCarrito.producto.valoracion = 'y'
                      carrito[indexProducto] = productoCarrito
                      this.actualizarCalificacion(this.state.productoSeleccionado!.idProducto, this.state.calificacion!)
                      this.setState({ calificacion: 0, productoSeleccionado: null, carrito: carrito })
                    } else {
                      Alert.alert("Aviso", "Debe otorgar una calificación.")
                    }
                  }
                }
              >
                <Text
                  style={GlobalStyles.primaryBtnText}
                >
                  {"Calificar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={GlobalStyles.secondaryBtnContainer}
                onPress={() => {
                  this.setState({ calificacion: 0, productoSeleccionado: null })
                }}
              >
                <Text
                  style={GlobalStyles.secondaryBtnText}
                >
                  {"Cancelar"}
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </Modal>


        <Modal
          visible={this.state.mostrarModalPago}
          animationType={'fade'}
          transparent={true}
        >

          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
            }}
          >

            <View
              style={{
                width: '90%',
                height: '90%',
                backgroundColor: 'white'
              }}
            >

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  padding: 8,
                  marginTop: 16,
                }}
              >
                {'Introduce tus datos de pago.'}
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  padding: 8,
                  marginTop: 16,
                }}
              >
                {`Total a pagar:`}
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 8,
                  marginTop: 16,
                }}
              >
                {`$${totalCompra} MXN`}
              </Text>

              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={20}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 300,
                }}
              >
                <CreditCard
                  ref={this.creditCardRef}
                  onValidStateChange={(isValid) => console.log("IsValid: ", isValid)}
                />
              </KeyboardAvoidingView>

              <TouchableOpacity
                style={this.styles.pagarBtn}
                onPress={() => this.terminarPago()}
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

        </Modal>

      </View>
    );
  }
}

export default CarritoScreen;
