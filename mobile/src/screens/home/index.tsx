import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import LogoImg from '../../assets/logo-nlw-esports.png';
import Background from '../../components/Background';
import { Gamecard, GameCardProps } from '../../components/Gamecard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {

    const [games, setGames] = useState<GameCardProps[]>([]);
    const navigation = useNavigation();


    useEffect(() => {
        fetch('http://192.168.5.8:3333/games')
            .then(response => response.json())
            .then(data => setGames(data))
    },
        []);

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl });
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={LogoImg}
                    style={styles.logo}
                />

                <Heading
                    title="Encontre seu duo!"
                    subtitle="Selecione o game que deseja jogar..."
                />

                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Gamecard
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />



            </SafeAreaView>
        </Background>
    );
}