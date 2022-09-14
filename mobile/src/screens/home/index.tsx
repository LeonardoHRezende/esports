import { View, Image } from 'react-native';

import LogoImg from '../../assets/logo-nlw-esports.png';
import { Gamecard } from '../../components/Gamecard';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';

import { styles } from './styles';

export function Home() {
    return (
        <View style={styles.container}>
            <Image
                source={LogoImg}
                style={styles.logo}
            />

            <Heading
                title="Encontre seu duo!"
                subtitle="Selecione o game que deseja jogar..."
            />

            <Gamecard
                data={GAMES[0]}
            />

        </View>
    );
}