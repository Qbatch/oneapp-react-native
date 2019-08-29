import React from 'react';
import Meteor from 'react-native-meteor';
import { Platform, StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { NavBar, Icon, WhiteSpace, Button, TabBar, SearchBar, List, Card, ActivityIndicator, Result } from 'antd-mobile-rn';

import { getImageUrl } from '../../utils/helpers';

const Item = List.Item;
const Brief = Item.Brief;

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: false,
      query: ''
    };
  }

  handleSearch = () => {
    const { query } = this.state;

    this.setState({ loading: true });
    Meteor.call('product.search', { query }, (error, products) => {
      this.setState({ loading: false });
      if (products) {
        this.setState({ products });
      } else {
        Alert.alert(error.reason);
      }
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { navigation } = nextProps;
    const barcode = navigation.getParam('barcode');

    if (barcode) {
      this.setState({ query: barcode }, () => this.handleSearch());
    }
  }

  renderList(products) {
    return (
      <List>
        {
          products.map((product) => {
            const { title, imageUrl, asin } = product;
            return (
              <Item
                key={asin}
                thumb={imageUrl ? getImageUrl({ imageUrl }) : require('../../assets/images/no-image.png')}
                arrow="horizontal"
                align="bottom"
                wrap={true}
                onClick={() => {this.props.navigation.navigate('ProductDetail', { product })}}>
                  {title}
                <Brief>{asin}</Brief>
              </Item>
            );
          })
        }
      </List>
    );
  }

  renderMessage() {
    return (
      <View>
        <Result
          img={
            <Image
              source={require('../../assets/images/amazon.png')}
              style={{ width: 60, height: 60 }}
            />
          }
          title="Search Amazon Catalog"
          message="You can search Amazon by typing an ASIN, UPC, or ISBN. You can even search by product title."
        />
      </View>
    );
  }

  render() {
    const { products, loading, query } = this.state;

    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={loading}
          toast
          size="large"
          text="Loading..."
        />
        <SearchBar
          placeholder="Search Product..."
          cancelText="Cancel"
          value={query}
          onChange={(query) => this.setState({ query })}
          onSubmit={() => this.handleSearch()}
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically
          autoCorrect={false}
          autoFocus
          />
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          { products.length > 0 ? this.renderList(products): this.renderMessage()}
        </ScrollView>
      </View>
    );
  }
}

const productsData = [{
  "asin": "B0769Z3KSX",
  "title": "Tactical Vest Kit for Nerf Guns for boys N-Strike Elite Series with Foam Darts for Kids",
  "imageUrl": "616stFe1VUL.jpg",
  "relationships": "",
  "salesRank": 2852,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Large Standard Size",
  "packageDimensions": {
    "height": {
      "value": 3.5,
      "units": "inches"
    },
    "length": {
      "value": 8,
      "units": "inches"
    },
    "width": {
      "value": 6.2,
      "units": "inches"
    },
    "weight": {
      "value": 0.8,
      "units": "pounds"
    }
  }
}, {
  "asin": "B00DW1JT5G",
  "title": "Nerf Official N-Strike Elite Strongarm Blaster (Amazon Exclusive)",
  "listPrice": {
    "amount": 12.99,
    "currencyCode": "USD"
  },
  "imageUrl": "41S49cwqn8L.jpg",
  "relationships": {
    "parent": {
      "asin": "B07CKC6JSD"
    }
  },
  "salesRank": 27,
  "isInCatalog": true,
  "status": "Inactive",
  "category": "Toys & Games",
  "sizeTier": "Large Standard Size",
  "packageDimensions": {
    "height": {
      "value": 3,
      "units": "inches"
    },
    "length": {
      "value": 14.5,
      "units": "inches"
    },
    "width": {
      "value": 7.5,
      "units": "inches"
    },
    "weight": {
      "value": 1.2,
      "units": "pounds"
    }
  }
}, {
  "asin": "B072MPBT4J",
  "title": "Nerf Rival Phantom Corps Kronos XVIII-500",
  "listPrice": {
    "amount": 59.99,
    "currencyCode": "USD"
  },
  "imageUrl": "417F5v7BaCL.jpg",
  "relationships": "",
  "salesRank": 309,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Large Standard Size",
  "packageDimensions": {
    "height": {
      "value": 2.52,
      "units": "inches"
    },
    "length": {
      "value": 13.07,
      "units": "inches"
    },
    "width": {
      "value": 8.03,
      "units": "inches"
    },
    "weight": {
      "value": 1.5,
      "units": "pounds"
    }
  }
}, {
  "asin": "B005GYUTWO",
  "title": "Nerf Walkie Talkie Fun at the Touch of a Button, Set of 2, 1000 feet Range by Sakar",
  "listPrice": {
    "amount": 24.99,
    "currencyCode": "USD"
  },
  "imageUrl": "41ukiEj9hOL.jpg",
  "relationships": {
    "parent": {
      "asin": "B017GTMYPQ"
    }
  },
  "salesRank": 3036,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Large Standard Size",
  "packageDimensions": {
    "height": {
      "value": 1.97,
      "units": "inches"
    },
    "length": {
      "value": 11.65,
      "units": "inches"
    },
    "width": {
      "value": 8.03,
      "units": "inches"
    },
    "weight": {
      "value": 0.71,
      "units": "pounds"
    }
  }
}, {
  "asin": "B0083TXWXC",
  "title": "Nerf N-Strike Elite Retaliator",
  "listPrice": {
    "amount": 26.99,
    "currencyCode": "USD"
  },
  "imageUrl": "41Ez4ag%2BCsL.jpg",
  "relationships": {
    "parent": {
      "asin": "B0188OXPFG"
    }
  },
  "salesRank": 1705,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Small Oversize",
  "packageDimensions": {
    "height": {
      "value": 2.91,
      "units": "inches"
    },
    "length": {
      "value": 18.98,
      "units": "inches"
    },
    "width": {
      "value": 11.42,
      "units": "inches"
    },
    "weight": {
      "value": 2.56,
      "units": "pounds"
    }
  }
}, {
  "asin": "B01BH928LQ",
  "title": "Nerf N-Strike Elite HyperFire Blaster",
  "listPrice": {
    "amount": 49.99,
    "currencyCode": "USD"
  },
  "imageUrl": "51nWaJK-ZjL.jpg",
  "relationships": {
    "parent": {
      "asin": "B01ES0YNKU"
    }
  },
  "salesRank": 2113,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Small Oversize",
  "packageDimensions": {
    "height": {
      "value": 3.9,
      "units": "inches"
    },
    "length": {
      "value": 24.3,
      "units": "inches"
    },
    "width": {
      "value": 11.9,
      "units": "inches"
    },
    "weight": {
      "value": 4.35,
      "units": "pounds"
    }
  }
}, {
  "asin": "B072MPC9NZ",
  "title": "Nerf N-Strike Elite SurgeFire",
  "listPrice": {
    "amount": 24.99,
    "currencyCode": "USD"
  },
  "imageUrl": "51qqNShf3XL.jpg",
  "relationships": {
    "parent": {
      "asin": "B07DRNKWYC"
    }
  },
  "salesRank": 185,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Small Oversize",
  "packageDimensions": {
    "height": {
      "value": 3,
      "units": "inches"
    },
    "length": {
      "value": 21.5,
      "units": "inches"
    },
    "width": {
      "value": 10.5,
      "units": "inches"
    },
    "weight": {
      "value": 2.5,
      "units": "pounds"
    }
  }
}, {
  "asin": "B01IHFD37Q",
  "title": "Nerf Rival Nemesis MXVII-10K, Red",
  "listPrice": {
    "amount": 99.99,
    "currencyCode": "USD"
  },
  "imageUrl": "41K7DYtcmDL.jpg",
  "relationships": {
    "parent": {
      "asin": "B01N0368VC"
    }
  },
  "salesRank": 230,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Small Oversize",
  "packageDimensions": {
    "height": {
      "value": 4.88,
      "units": "inches"
    },
    "length": {
      "value": 29.92,
      "units": "inches"
    },
    "width": {
      "value": 12.2,
      "units": "inches"
    },
    "weight": {
      "value": 6.35,
      "units": "pounds"
    }
  }
}, {
  "asin": "B00DW1JT3I",
  "title": "Nerf N-Strike Elite Rampage Blaster",
  "listPrice": {
    "amount": 32.99,
    "currencyCode": "USD"
  },
  "imageUrl": "51XwcS5rx5L.jpg",
  "relationships": {
    "parent": {
      "asin": "B07BLLGHHJ"
    }
  },
  "salesRank": 436,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Small Oversize",
  "packageDimensions": {
    "height": {
      "value": 3.9,
      "units": "inches"
    },
    "length": {
      "value": 21,
      "units": "inches"
    },
    "width": {
      "value": 12.7,
      "units": "inches"
    },
    "weight": {
      "value": 2.75,
      "units": "pounds"
    }
  }
}, {
  "asin": "B07BBPR2VR",
  "title": "Aevdor CS Grenade, FenglinTech Nerf Rival Soft Foam Bullets Refill Darts Tactical Grenade Blaster",
  "imageUrl": "41PEd58WKIL.jpg",
  "relationships": "",
  "salesRank": 1637,
  "isInCatalog": false,
  "status": "",
  "category": "Toys & Games",
  "sizeTier": "Large Standard Size",
  "packageDimensions": {
    "height": {
      "value": 2.2,
      "units": "inches"
    },
    "length": {
      "value": 5.59,
      "units": "inches"
    },
    "width": {
      "value": 2.83,
      "units": "inches"
    },
    "weight": {
      "value": 0.45,
      "units": "pounds"
    }
  }
}];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: 'white'
  }
});
