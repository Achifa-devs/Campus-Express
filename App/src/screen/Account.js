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
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Security Settings</Text>
          
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('settings-1-pin');
              toggleModal();
            }}
            style={styles.modalItem}
          >
            <View style={styles.modalItemLeft}>
              <View style={[styles.modalIconCnt, { backgroundColor: '#E3F2FD' }]}>
                <Icon name="keypad-outline" size={22} color="#1976D2" />
              </View>
              <Text style={styles.modalItemTitle}>Change Transfer PIN</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#757575" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('settings-1-biometrics');
              toggleModal();
            }}
            style={styles.modalItem}
          >
            <View style={styles.modalItemLeft}>
              <View style={[styles.modalIconCnt, { backgroundColor: '#E8F5E9' }]}>
                <Icon name="finger-print-outline" size={22} color="#388E3C" />
              </View>
              <Text style={styles.modalItemTitle}>Setup Biometrics</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#757575" />
          </TouchableOpacity>
        </View>
      </BottomModal>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>ACCOUNT SECURITY</Text>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('email-update')}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.iconCnt, { backgroundColor: '#efefef' }]}>
                  <Icon name="mail-outline" size={22} color="#000" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.rowTitle}>Change Email</Text>
                  <Text style={styles.rowSub} numberOfLines={1}>{user?.email}</Text>
                </View>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#757575" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              onPress={() => navigation.navigate('phone-update')}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.iconCnt, { backgroundColor: '#efefef' }]}>
                  <Icon name="call-outline" size={22} color="#000" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.rowTitle}>Change Phone Number</Text>
                  <Text style={styles.rowSub}>+234 {user?.phone}</Text>
                </View>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#757575" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              onPress={() => navigation.navigate('pwd-update')}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.iconCnt, { backgroundColor: '#efefef' }]}>
                  <Icon name="lock-closed-outline" size={22} color="#000" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.rowTitle}>Change Passcode</Text>
                  <Text style={styles.rowSub}>Update your account password</Text>
                </View>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#757575" />
            </TouchableOpacity>

            {/* <View style={styles.divider} /> */}

            {/* <TouchableOpacity
              onPress={toggleModal}
              style={styles.rowItem}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.iconCnt, { backgroundColor: '#BBDEFB' }]}>
                  <Icon name="shield-checkmark-outline" size={22} color="#1976D2" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.rowTitle}>Security Features</Text>
                  <Text style={styles.rowSub}>PIN, Biometrics & more</Text>
                </View>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#757575" />
            </TouchableOpacity> */}
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 18 }]}>ACCOUNT ACTIONS</Text>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={async () => {
                await Memory.clear();
                RNRestart.Restart();
              }}
              style={[styles.rowItem, styles.logoutItem]}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.iconCnt, { backgroundColor: '#FFCDD2' }]}>
                  <Icon name="log-out-outline" size={22} color="#D32F2F" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.rowTitle, { color: '#D32F2F' }]}>Log Out</Text>
                  <Text style={styles.rowSub}>Securely log out of your account</Text>
                </View>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#D32F2F" />
            </TouchableOpacity>
          </View>

          <View style={styles.securityTip}>
            <Icon name="shield-checkmark" size={18} color="#388E3C" />
            <Text style={styles.securityTipText}>
              Your security is our priority. Keep your information up to date.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    minHeight: 72,
  },
  logoutItem: {
    backgroundColor: '#FFF',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCnt: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
    marginBottom: 4,
  },
  rowSub: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#757575',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 72,
    marginRight: 16,
  },
  sectionLabel: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    minHeight: 200,
  },
  modalTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#212121',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  modalItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIconCnt: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  modalItemTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
  },
  securityTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  securityTipText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#388E3C',
    marginLeft: 12,
    flex: 1,
  },
});