import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView 
                source={require('../../../assets/animations/splash.json')}
                autoPlay
                loop={false}
                speed={1.2}
                onAnimationFinish={() => {navigation.push('SignIn')}}
            />
        </View>
    );
}

export default Splash;