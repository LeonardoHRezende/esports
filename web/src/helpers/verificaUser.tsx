import axios from "axios";

export default async function verificaUser(dados: any) {
    const uuid = dados;

    sessionStorage.setItem('uuid', uuid);

    var config = {
        method: 'post',
        url: `http://127.0.0.1:3333/users/${uuid}/consult`
    }

    const retorno_consulta = await axios(config)

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
        props: { dados: retorno_consulta },
    }

}