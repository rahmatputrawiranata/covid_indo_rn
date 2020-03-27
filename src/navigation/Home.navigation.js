import React, {useEffect, useState} from 'react';
import {SafeAreaView, Dimensions, View} from 'react-native';
import {Layout, Text, Select} from '@ui-kitten/components';
import Axios from 'axios';

const screenWidth = Math.round(Dimensions.get('window').width);

const screenWidthCard = screenWidth / 3 - 10;
function HomeNavigation() {
  const [cntryData, setCntryData] = useState([]);
  const [prvData, setPrvData] = useState([]);
  const [selectPrv, setSelectPrv] = useState(0);
  const [prvDataCustom, setPrvDataCustom] = useState([]);

  useEffect(() => {
    async function getCountry() {
      const resData = await Axios('https://api.kawalcorona.com/indonesia');
      setCntryData(resData.data);
      //onsole.log(resData.data);
    }

    async function getProvinsi() {
      const resData = await Axios(
        'https://api.kawalcorona.com/indonesia/provinsi',
      );
      setPrvData(resData.data);
      const ressData = resData.data;
      console.log(ressData);
      const prvName = await ressData.map(function(item) {
        const searchDataContainer = [];
        searchDataContainer.text = item.attributes.Provinsi;
        searchDataContainer.positiv = item.attributes.Kasus_Posi;
        searchDataContainer.sembuh = item.attributes.Kasus_Semb;
        searchDataContainer.meninggal = item.attributes.Kasus_Meni;

        return searchDataContainer;
      });
      setPrvDataCustom(prvName);
    }

    getCountry();
    getProvinsi();
  }, []);

  return (
    <SafeAreaView style={{margin: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Layout
          style={{
            backgroundColor: '#97BE11',
            marginVertical: 10,
            padding: 10,
            borderRadius: 4,
            width: screenWidthCard,
          }}>
          <Text category="p" style={{color: '#FFF'}}>
            Sembuh
          </Text>
          <Text category="h5" style={{color: '#FFF'}}>
            {cntryData.length != 0 ? cntryData[0].sembuh : ''}
          </Text>
        </Layout>

        <Layout
          style={{
            backgroundColor: '#ffd31d',
            marginVertical: 10,
            padding: 10,
            borderRadius: 4,
            width: screenWidthCard,
          }}>
          <Text category="p" style={{color: '#FFF'}}>
            Positif
          </Text>
          <Text category="h5" style={{color: '#FFF'}}>
            {cntryData.length != 0 ? cntryData[0].positif : ''}
          </Text>
        </Layout>

        <Layout
          style={{
            backgroundColor: '#d63447',
            marginVertical: 10,
            padding: 10,
            borderRadius: 4,
            width: screenWidthCard,
          }}>
          <Text category="p" style={{color: '#FFF'}}>
            Meninggal
          </Text>
          <Text category="h5" style={{color: '#FFF'}}>
            {cntryData.length != 0 ? cntryData[0].meninggal : ''}
          </Text>
        </Layout>
      </View>

      <Layout style={{marginVertical: 10, padding: 10, borderRadius: 4}}>
        <Select
          data={prvDataCustom}
          selectedOption={selectPrv}
          onSelect={setSelectPrv}
        />
        <View
          style={{
            marginVertical: 10,
            height: 80,
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text>Kasus Positif</Text>
            <Text>{selectPrv.positiv}</Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text>Kasus Sembuh</Text>
            <Text>{selectPrv.sembuh}</Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text>Kasus Meninggal</Text>
            <Text>{selectPrv.meninggal}</Text>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
}

export default HomeNavigation;
