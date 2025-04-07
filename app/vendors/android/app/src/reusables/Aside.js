import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';
import { useDispatch, useSelector } from 'react-redux';
import { set_drawer } from '../../../../redux/drawer';
import Svg, { Circle, G, Path } from 'react-native-svg';

export default function Aside() {

    let {drawer} = useSelector(s=> s.drawer)
    let dispatch = useDispatch()
      
    let [left, set_left] = useState(0)
    toggleOpen = () => {
        dispatch(set_drawer(!drawer))
    };
    
    function toggleClose() {
        dispatch(set_drawer(!drawer))
    }

    useEffect(() => {
        drawer ?
        set_left('-1000%')
        :set_left(0)
    }, [drawer])
    
    return (
        <>
            <TouchableOpacity onPress={e => {
                toggleClose()
            }} activeOpacity={1} style={{
                position: 'absolute',
                top: 0,
                left: left,
                width: '100%',
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                justifyContent: 'flex-start', 
                alignItems: 'flex-start',
                zIndex: 10
            }}>
                <View style={{
                    height: '100%',
                    width: '75%',
                    backgroundColor: '#FFF',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <ScrollView>
                        <View style={{padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
                            <View >
                                <View>
                                    <View style={{ height: 55, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 55, borderRadius: 50, backgroundColor: '#000', alignItems: 'center', padding: 20, marginBottom: 10}}>
                        
                                    </View>
                                </View>
                                <View>
                                    <Text>@shop_name</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={{fontWeight: 'bold', fontSize: 20, borderColor: '#000', color: '#000', borderRadius: 50, borderStyle: 'solid', borderWidth: 2, height: 28, width: 28, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: -9, color: '#000', height: 'auto', width: 'auto'}}>...</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{padding: 20}}>
                            <TouchableOpacity style={{ marginBottom: 30, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <View>
                                    <Svg width="35px" height="35px" viewBox="0 0 1024 1024" class="icon"  version="1.1" ><Path d="M951.87 253.86c0-82.18-110.05-144.14-256-144.14s-256 61.96-256 144.14c0 0.73 0.16 1.42 0.18 2.14h-0.18v109.71h73.14v-9.06c45.77 25.81 109.81 41.33 182.86 41.33 67.39 0 126.93-13.33 171.71-35.64 6.94 7.18 11.15 14.32 11.15 20.58 0 28.25-72.93 70.98-182.86 70.98h-73.12v73.14h73.12c67.4 0 126.96-13.33 171.74-35.65 6.95 7.17 11.11 14.31 11.11 20.6 0 28.27-72.93 71-182.86 71l-25.89 0.12c-15.91 0.14-31.32 0.29-46.34-0.11l-1.79 73.11c8.04 0.2 16.18 0.27 24.48 0.27 7.93 0 16-0.05 24.2-0.12l25.34-0.12c67.44 0 127.02-13.35 171.81-35.69 6.97 7.23 11.04 14.41 11.04 20.62 0 28.27-72.93 71-182.86 71h-73.12v73.14h73.12c67.44 0 127.01-13.35 171.81-35.69 6.98 7.22 11.05 14.4 11.05 20.62 0 28.27-72.93 71-182.86 71h-73.12v73.14h73.12c145.95 0 256-61.96 256-144.14 0-0.68-0.09-1.45-0.11-2.14h0.11V256h-0.18c0.03-0.72 0.2-1.42 0.2-2.14z m-438.86 0c0-28.27 72.93-71 182.86-71s182.86 42.73 182.86 71c0 28.25-72.93 70.98-182.86 70.98s-182.86-42.73-182.86-70.98z" fill="#0F1F3C" /><Path d="M330.15 365.71c-145.95 0-256 61.96-256 144.14 0 0.73 0.16 1.42 0.18 2.14h-0.18v256c0 82.18 110.05 144.14 256 144.14s256-61.96 256-144.14V512h-0.18c0.02-0.72 0.18-1.42 0.18-2.14 0-82.18-110.05-144.15-256-144.15zM147.29 638.93c0-6.32 4.13-13.45 11.08-20.62 44.79 22.33 104.36 35.67 171.78 35.67 67.39 0 126.93-13.33 171.71-35.64 6.94 7.18 11.15 14.32 11.15 20.58 0 28.25-72.93 70.98-182.86 70.98s-182.86-42.72-182.86-70.97z m182.86-200.07c109.93 0 182.86 42.73 182.86 71 0 28.25-72.93 70.98-182.86 70.98s-182.86-42.73-182.86-70.98c0-28.27 72.93-71 182.86-71z m0 400.14c-109.93 0-182.86-42.73-182.86-71 0-6.29 4.17-13.43 11.11-20.6 44.79 22.32 104.34 35.66 171.75 35.66 67.4 0 126.96-13.33 171.74-35.65 6.95 7.17 11.11 14.31 11.11 20.6 0.01 28.26-72.92 70.99-182.85 70.99z" fill="#0F1F3C" /></Svg> 
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 20, color: '#000', marginLeft: 8}}>Payment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 30, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <View>
                                    <Svg width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M4 1C3.44772 1 3 1.44772 3 2V22C3 22.5523 3.44772 23 4 23C4.55228 23 5 22.5523 5 22V13.5983C5.46602 13.3663 6.20273 13.0429 6.99251 12.8455C8.40911 12.4914 9.54598 12.6221 10.168 13.555C11.329 15.2964 13.5462 15.4498 15.2526 15.2798C17.0533 15.1004 18.8348 14.5107 19.7354 14.1776C20.5267 13.885 21 13.1336 21 12.3408V5.72337C21 4.17197 19.3578 3.26624 18.0489 3.85981C16.9875 4.34118 15.5774 4.87875 14.3031 5.0563C12.9699 5.24207 12.1956 4.9907 11.832 4.44544C10.5201 2.47763 8.27558 2.24466 6.66694 2.37871C6.0494 2.43018 5.47559 2.53816 5 2.65249V2C5 1.44772 4.55228 1 4 1ZM5 4.72107V11.4047C5.44083 11.2247 5.95616 11.043 6.50747 10.9052C8.09087 10.5094 10.454 10.3787 11.832 12.4455C12.3106 13.1634 13.4135 13.4531 15.0543 13.2897C16.5758 13.1381 18.1422 12.6321 19 12.3172V5.72337C19 5.67794 18.9081 5.66623 18.875 5.68126C17.7575 6.18804 16.1396 6.81972 14.5791 7.03716C13.0776 7.24639 11.2104 7.1185 10.168 5.55488C9.47989 4.52284 8.2244 4.25586 6.83304 4.3718C6.12405 4.43089 5.46427 4.58626 5 4.72107Z" fill="#0F0F0F"/>
                                    </Svg>
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 20, color: '#000', marginLeft: 8}}>Reports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 30, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <View>
                                    <Svg width="35px" height="35px" viewBox="0 0 1920 1920">
                                        <G fill-rule="evenodd" clip-rule="evenodd" stroke="none" stroke-width="1">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M746.667 106.667V1493.33H1173.33V106.667H746.667ZM1056 224H864V1376H1056V224ZM106.667 533.333H533.333V1493.33H106.667V533.333ZM224 650.667H416V1376H224V650.667Z"/>
                                            <Path d="M1920 1706.67H0V1824H1920V1706.67Z"/>
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M1386.67 746.667H1813.33V1493.33H1386.67V746.667ZM1504 864H1696V1376H1504V864Z"/>
                                        </G>
                                    </Svg>
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 20, color: '#000', marginLeft: 8}}>Analytics</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 30, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <View>
                                    <Svg width="35px" height="35px" viewBox="0 0 16 16">
                                        <Path fill="#000000" fill-rule="evenodd" d="M8,0 C8.55228,0 9,0.447715 9,1 L11,1 L11,2 L13,2 C13.5523,2 14,2.44772 14,3 L14,15 C14,15.5523 13.5523,16 13,16 L3,16 C2.44772,16 2,15.5523 2,15 L2,3 C2,2.44772 2.44772,2 3,2 L5,2 L5,1 L7,1 C7,0.447715 7.44772,0 8,0 Z M5,4 L4,4 L4,14 L12,14 L12,4 L11,4 L11,5 L5,5 L5,4 Z M6,10 L10,10 C10.5523,10 11,10.4477 11,11 C11,11.51285 10.613973,11.9355092 10.1166239,11.9932725 L10,12 L6,12 C5.44772,12 5,11.5523 5,11 C5,10.48715 5.38604429,10.0644908 5.88337975,10.0067275 L6,10 Z M10,7 C10.5523,7 11,7.44772 11,8 C11,8.55228 10.5523,9 10,9 L6,9 C5.44772,9 5,8.55228 5,8 C5,7.44772 5.44772,7 6,7 L10,7 Z M8,2 C7.44772,2 7,2.44772 7,3 C7,3.55228 7.44772,4 8,4 C8.55228,4 9,3.55228 9,3 C9,2.44772 8.55228,2 8,2 Z"/>
                                    </Svg>
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 20, color: '#000', marginLeft: 8}}>Reviews</Text>
                            </TouchableOpacity>
                            {/* <View style={{margin: 10}}>
                                <Text style={{fontWeight: '500', fontSize: 20, color: '#000'}}>Settings</Text>
                            </View> */}
                        </View>
                    </ScrollView>

                    <View style={{padding: 15}}>
                        
                        <View style={{ margin: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ height: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 28, borderRadius: 50, backgroundColor: '#000', alignItems: 'center', padding: 20, marginBottom: 10}}>
                        
                            </View>
                            <Text>&nbsp;&nbsp;&nbsp;</Text>
                            <Text style={{fontWeight: '500', fontSize: 15, height: 28, color: '#000'}}>Akpulu.F</Text>
                        </View>
                        
                    </View>
                </View>
            </TouchableOpacity>
        </>
    ) 
}
