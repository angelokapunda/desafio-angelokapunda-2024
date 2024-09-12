class RecintosZoo {

    constructor() {
        this.animais = {
            "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };

        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
        ];
    }

    analisaRecintos(animal, quantidade) {

        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }
        // Valida quantidade
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animalInformado = this.animais[animal];
        const tamanhoNecessario = animalInformado.tamanho * quantidade;


        

        let recintosViaveis = [];


        this.recintos.forEach(recinto => {

            let biomaEncontrado = false;
            animalInformado.biomas.forEach(biomaAnimal => {
                if(recinto.bioma.includes(biomaAnimal))
                    biomaEncontrado = true;
            })

            let tamanhoDisponivel = recinto.animais.length == 0 ? recinto.tamanho : recinto.tamanho - (this.animais[recinto.animais[0].especie].tamanho * recinto.animais[0].quantidade);

            let tamanhoNecessarioReal = tamanhoNecessario;

            
            
            if(biomaEncontrado && recinto.animais.length > 0 && this.animais[recinto.animais[0].especie] != animalInformado) {
                tamanhoNecessarioReal = tamanhoNecessarioReal + 1;
            }
            
            if(biomaEncontrado) {
                if(tamanhoDisponivel >= tamanhoNecessarioReal) {
                    if(recinto.animais.length > 0  && tamanhoNecessarioReal > tamanhoNecessario) {
                        if(!this.animais[recinto.animais[0].especie].carnivoro && !animalInformado.carnivoro)
                        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${tamanhoDisponivel - tamanhoNecessarioReal} total: ${recinto.tamanho})`);

                    } else {
                        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${tamanhoDisponivel - tamanhoNecessarioReal} total: ${recinto.tamanho})`);

                    }
                }
            }


        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        console.log(recintosViaveis);
        

        return { recintosViaveis };
    }
}


export { RecintosZoo as RecintosZoo };
