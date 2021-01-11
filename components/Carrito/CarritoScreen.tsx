import * as React from 'react';
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
import Producto from './Model/Producto';

let productosPrueba: Producto[] = [
  new Producto("1", "Producto 1", 1, 50.50, 23, "Generica"),
  new Producto("2", "Producto 2", 1, 200.48, 23, "Generica"),
  new Producto("3", "Producto 3", 1, 10.98, 23, "Generica"),
  new Producto("4", "Producto 4", 1, 0.58, 23, "Generica"),
];

class CarritoScreen extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      data: productosPrueba,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => { this.props.navigation.navigate('BarCodeScanner', {}) }} title="Escanear" />
      ),
    });
  }

  state = {
    data: new Array<Producto>()
  }

  styles = StyleSheet.create({
    titulo: {
      fontSize: 20,
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

  renderItemComponent = (item: Producto) => {
    return (
      <View
        style={{
          height: 150,
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
            source={require('../../resources/producto-prueba.jpeg')}
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

  handleQtyChangeOnItem(item: Producto, add: boolean) {
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

  render() {

    let totalCompra = this.state.data
      .map((item) => { return item.cantidad * item.precioUnitario })
      .reduce((prevValue, currentValue, _) => { return prevValue + currentValue })
      .toFixed(2);

    return (
      <View
        style={{
          height: "100%",
        }}
      >
        <FlatList
          data={this.state.data}
          renderItem={item => this.renderItemComponent(item.item)}
          keyExtractor={item => item.idProducto}
          ItemSeparatorComponent={this.ItemSeparator}
        />

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
