import axios from "axios";

export default async function criaUser(dados: any) {
    const uuid = dados && dados.idGoogle ? dados.idGoogle : null;
    const discordUser = dados && dados.discordUser ? dados.discordUser : null;
    const nickName = dados && dados.nickName ? dados.nickName : null; 

    

    var config = {
        method: 'post',
        url: `http://127.0.0.1:3333/users/${uuid}/create`,
        data:{

            "discordUser": discordUser,
            "nickName": nickName 
        }
    }

    const criacao_usuario = await axios(config)

        .then(function (response) {
            
            const consulta = response && response.data

            return consulta;

        })
        .catch(function (error) {
            

            const status = error.response && error.response.status
            const data = error.response && error.response.data
            const erro = {
                status: status,
                data: data,
            }
            return erro;

        })

    return {
        props: { dados: criacao_usuario },
    }

}