import React from 'react';
import Meteor from 'react-native-meteor';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  WhiteSpace,
  Card,
  WingBlank,
  SegmentedControl,
  ActivityIndicator
} from 'antd-mobile-rn';

import {
  Table,
  TableWrapper,
  Col,
  Row,
  Rows
} from 'react-native-table-component';

import { getImageUrl } from '../../utils/helpers';

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = props;
    const product = navigation.getParam('product');

    this.state = {
      product,
      offers: [],
      totalOfferCount: 0,
      loading: false,
      tableHead: ['', 'New', 'Used'],
      tableTitle: ['Buy Box', 'FBA', 'FBM'],
      tableData: [ ]
    };
  }

  UNSAFE_componentWillMount() {
    this.getProductOffers();
  }

  getProductOffers = () => {
    const { asin } = this.state.product;

    this.setState({ loading: true });
    Meteor.call('get.product.offers.summary', { asin }, (error, offers) => {
      this.setState({ loading: false });
      if (!error) {
        console.log({ offers });

        const newFba = offers.new.fulfilmentByAmazon.lowestOffers.map(o => `$${o.landedPrice.amount}`).join('\n');
        const newFbm = offers.new.fulfilmentByMerchant.lowestOffers.map(o => `$${o.landedPrice.amount}`).join('\n');
        const usedFba = offers.used.fulfilmentByAmazon.lowestOffers.map(o => `$${o.landedPrice.amount}`).join('\n');
        const usedFbm = offers.used.fulfilmentByMerchant.lowestOffers.map(o => `$${o.landedPrice.amount}`).join('\n');
        const newBuyBox = offers.new.buyBoxPrice ? offers.new.buyBoxPrice.landedPrice.amount : 'N/A';
        const usedBuyBox = offers.used.buyBoxPrice ? offers.used.buyBoxPrice.landedPrice.amount : 'N/A';

        console.log('newFba', newFba, 'newFbm', newFbm, 'usedFba', usedFba, 'usedFbm', usedFbm );

        const tableData = [
          [newBuyBox, usedBuyBox],
          [newFba, usedFba],
          [newFbm, usedFba],
        ];

        this.setState({ tableData, totalOfferCount: offers.totalOfferCount });
      } else {
        console.log('get.product.offers.summary::error', error);
      }
    });
  }

  render() {
    const { product, totalOfferCount, loading, tableHead, tableTitle, tableData } = this.state;
    const { title, asin, imageUrl, salesRank, category, listPrice, sizeTier, isInCatalog, status } = product;

    return (
      <ScrollView style={{ flex: 1 }}>
        <ActivityIndicator
          animating={loading}
          toast
          size="large"
          text="Loading..."
        />
        <Card full>
          <Card.Header
            title={title}
            thumbStyle={{ width: 30, height: 30 }}
            thumb={imageUrl ? getImageUrl({ imageUrl }) : require('../../assets/images/no-image.png')}
          />
          {/*<Card.Body>
            <View style={{ height: 42 }}>
              <Text style={{ marginLeft: 16 }}>Card Content</Text>
            </View>
          </Card.Body>*/}
          <Card.Footer
            content={`${salesRank} in ${category}`}
            extra={`${sizeTier}`}
          />
        </Card>
        <WhiteSpace size="lg" />
        <WingBlank>
          <SegmentedControl
            selectedIndex={0}
            values={[`${totalOfferCount} Offers`]}
          />
        </WingBlank>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Table borderStyle={{ backgroundColor: 'white', borderWidth: 2, borderColor: 'black' }}>
            <Row data={tableHead} flexArr={[1, 2, 2]} style={styles.title} textStyle={styles.text}/>
            <TableWrapper style={styles.wrapper}>
              <Col data={tableTitle} heightArr={[31]} style={styles.title} textStyle={styles.text}/>
            <Rows data={tableData} flexArr={[2, 2]} textStyle={styles.text}/>
          </TableWrapper>
          </Table>
        </WingBlank>
      </ScrollView>
    );
  }
}

const offersTest = {
  "status": "Success",
  "new": {
    "buyBoxPrice": {
      "condition": "New",
      "landedPrice": {
        "currencyCode": "USD",
        "amount": 14.89
      },
      "listingPrice": {
        "currencyCode": "USD",
        "amount": 14.89
      },
      "shipping": {
        "currencyCode": "USD",
        "amount": 0
      }
    },
    "fulfilmentByAmazon": {
      "offerCount": 24,
      "lowestOffers": [{
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 91,
          "feedbackCount": 387
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 14.89
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": true,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 14.89
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 98,
          "feedbackCount": 865
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 24.8
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 24.8
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 96,
          "feedbackCount": 482
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 24.92
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 24.92
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 98,
          "feedbackCount": 536
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 25.99
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 25.99
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 100,
          "feedbackCount": 1049
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 27.95
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 27.95
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 100,
          "feedbackCount": 60
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 28.33
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 28.33
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 99,
          "feedbackCount": 62726
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 28.65
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 28.65
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 99,
          "feedbackCount": 1112
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 28.99
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 28.99
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 98,
          "feedbackCount": 354
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 29.67
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 29.67
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 99,
          "feedbackCount": 579
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 30.25
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 30.25
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 98,
          "feedbackCount": 436
        },
        "shippingTime": {
          "minimumHours": 0,
          "maximumHours": 0,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 32.95
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "isFulfilledByAmazon": true,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 32.95
        }
      }]
    },
    "fulfilmentByMerchant": {
      "offerCount": 13,
      "lowestOffers": [{
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 91,
          "feedbackCount": 2819
        },
        "shippingTime": {
          "minimumHours": 96,
          "maximumHours": 120,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 20.99
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "shipsFrom": {
          "state": "CA",
          "country": "US"
        },
        "isFulfilledByAmazon": false,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 20.99
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 99,
          "feedbackCount": 3375
        },
        "shippingTime": {
          "minimumHours": 48,
          "maximumHours": 72,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 21.03
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "shipsFrom": {
          "country": ""
        },
        "isFulfilledByAmazon": false,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 21.03
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 92,
          "feedbackCount": 13713
        },
        "shippingTime": {
          "minimumHours": 96,
          "maximumHours": 120,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 25.47
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "shipsFrom": {
          "state": "NC",
          "country": "US"
        },
        "isFulfilledByAmazon": false,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 25.47
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 98,
          "feedbackCount": 754
        },
        "shippingTime": {
          "minimumHours": 24,
          "maximumHours": 48,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 20.75
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 5.24
        },
        "shipsFrom": {
          "state": "MI",
          "country": "US"
        },
        "isFulfilledByAmazon": false,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 25.99
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 89,
          "feedbackCount": 1130
        },
        "shippingTime": {
          "minimumHours": 24,
          "maximumHours": 48,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 26.8
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "shipsFrom": {
          "state": "FL",
          "country": "US"
        },
        "isFulfilledByAmazon": false,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 26.8
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 84,
          "feedbackCount": 839
        },
        "shippingTime": {
          "minimumHours": 48,
          "maximumHours": 72,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 27.1
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "shipsFrom": {
          "state": "IL",
          "country": "US"
        },
        "isFulfilledByAmazon": false,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 27.1
        }
      }, {
        "subCondition": "new",
        "sellerFeedbackRating": {
          "sellerPositiveFeedbackRating": 92,
          "feedbackCount": 8699
        },
        "shippingTime": {
          "minimumHours": 48,
          "maximumHours": 72,
          "availabilityType": "NOW"
        },
        "listingPrice": {
          "currencyCode": "USD",
          "amount": 32.59
        },
        "shipping": {
          "currencyCode": "USD",
          "amount": 0
        },
        "shipsFrom": {
          "state": "FL",
          "country": "US"
        },
        "isFulfilledByAmazon": false,
        "isBuyBoxWinner": false,
        "isFeaturedMerchant": true,
        "landedPrice": {
          "currencyCode": "USD",
          "amount": 32.59
        }
      }]
    }
  },
  "used": {
    "fulfilmentByAmazon": {
      "offerCount": 0,
      "lowestOffers": []
    },
    "fulfilmentByMerchant": {
      "offerCount": 0,
      "lowestOffers": []
    }
  },
  "totalOfferCount": 38
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#fff' },
  head: { height: 40 },
  text: { margin: 6 },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  wrapper: { flexDirection: 'row' },
  row: {  height: 50  },
});
