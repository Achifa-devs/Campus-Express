import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Switch,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNRestart from 'react-native-restart';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomModal from '../reusables/BtmModal';
import Memory from '../utils/memoryHandler';

export default function AccountSecurity({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  let [overlay, setOverlay] = useState(false);
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;

  let openModal = () => setOverlay(true);
  let closeModal = () => setOverlay(false);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  let { user } = useSelector((s) => s.user);

  return (
    <>
      <BottomModal visible={modalVisible} onClose={toggleModal}>
        <ScrollView
          style={{
            width: '100%',
            height: 170,
            backgroundColor: '#fff',
            position: 'relative',
          }}
        >
          <View style={{ padding: 5, width: '100%' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('user-settings-1-pin')}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <View style={styles.iconCnt}>
                  <Icon name="keypad-outline" size={25} color="#000" />
                </View>
                <Text style={styles.rowTitle}>Change transfer pin</Text>
              </View>
              <View style={styles.arrowCnt}>
                <Icon name="chevron-forward-outline" size={25} color="#000" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('user-settings-1-biometrics')}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <View style={styles.iconCnt}>
                  <Icon name="finger-print-outline" size={25} color="#000" />
                </View>
                <Text style={styles.rowTitle}>Setup biometrics</Text>
              </View>
              <View style={styles.arrowCnt}>
                <Icon name="chevron-forward-outline" size={25} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomModal>

      <View style={styles.cnt}>
        <ScrollView>
          <Text style={styles.sectionLabel}>Security</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('user-email-update')}
            style={styles.rowItem}
          >
            <View style={styles.rowLeft}>
              <View style={styles.iconCnt}>
                <Icon name="mail-outline" size={25} color="#000" />
              </View>
              <View style={{ width: '100%' }}>
                <Text style={styles.rowTitle}>Change email</Text>
                <Text style={styles.rowSub}>{user?.email}</Text>
              </View>
            </View>
            <View style={styles.arrowCnt}>
              <Icon name="chevron-forward-outline" size={25} color="#000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('user-phone-update')}
            style={styles.rowItem}
          >
            <View style={styles.rowLeft}>
              <View style={styles.iconCnt}>
                <Icon name="call-outline" size={25} color="#000" />
              </View>
              <View style={{ width: '100%' }}>
                <Text style={styles.rowTitle}>Change primary phone number</Text>
                <Text style={styles.rowSub}>+234 {user?.phone}</Text>
              </View>
            </View>
            <View style={styles.arrowCnt}>
              <Icon name="chevron-forward-outline" size={25} color="#000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('user-pwd-update')}
            style={styles.rowItem}
          >
            <View style={styles.rowLeft}>
              <View style={styles.iconCnt}>
                <Icon name="lock-closed-outline" size={25} color="#000" />
              </View>
              <View style={{ width: '100%' }}>
                <Text style={styles.rowTitle}>Change passcode</Text>
                <Text style={styles.rowSub}>*********</Text>
              </View>
            </View>
            <View style={styles.arrowCnt}>
              <Icon name="chevron-forward-outline" size={25} color="#000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await Memory.clear();
              RNRestart.Restart();
            }}
            style={styles.rowItem}
          >
            <View style={styles.rowLeft}>
              <View style={styles.iconCnt}>
                <Icon name="log-out-outline" size={25} color="#000" />
              </View>
              <View style={{ width: '100%' }}>
                <Text style={styles.rowTitle}>Log out</Text>
                <Text style={styles.rowSub}>
                  Securely log out of your account
                </Text>
              </View>
            </View>
            <View style={styles.arrowCnt}>
              <Icon name="chevron-forward-outline" size={25} color="#000" />
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionLabel}>Privacy</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('user-data')}
            style={styles.rowItem}
          >
            <View style={[styles.rowLeft, { width: '80%' }]}>
              <View style={styles.iconCnt}>
                <Icon name="sync-outline" size={25} color="#000" />
              </View>
              <View style={{ width: '100%' }}>
                <Text style={styles.rowTitle}>Sync your contact</Text>
                <Text style={styles.rowSub}>
                  Send and request from contacts on your device who have a Campus
                  Sphere account.
                </Text>
              </View>
            </View>
            <View style={styles.arrowCnt}>
              <Switch
                trackColor={{ false: '#767577', true: '#FF4500' }}
                thumbColor={isEnabled ? '#f19472' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cnt: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
  rowItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row',
    borderRadius: 10,
    height: 75,
    width: '100%',
    backgroundColor: '#fff',
  },
  rowLeft: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconCnt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
    marginRight: 15,
    borderRadius: 50,
    padding: 10,
  },
  rowTitle: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 15,
    color: '#000',
  },
  rowSub: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 12,
    color: '#464646',
    width: '70%',
  },
  arrowCnt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
  },
  sectionLabel: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '800',
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 25,
    color: '#000',
  },
});
