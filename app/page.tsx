'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Passo1DadosPrimarios from '../components/Passo1DadosPrimarios'
import Passo2Natureza from '../components/Passo2Natureza'
import Passo3Apreensoes from '../components/Passo3Apreensoes'
import Passo4Pessoas from '../components/Passo4Pessoas'
import Passo5Finalizacao from '../components/Passo5Finalizacao'

// DADOS MOCKADOS (MÁXIMOS) PARA TESTAR A QUEBRA DE PÁGINAS
const dadosDeTeste = {
  fichaCiops: '20260601-9988', viatura: 'CP-4321', data: '2026-06-01', horario: '14:30', 
  lat: '-3.71722', long: '-38.5434', logradouro: 'Avenida Beira Mar', numero: '1000', complemento: 'Próximo à estátua', bairro: 'Meireles',
  natureza: 'Delituosa', tipificacoes: ['Roubo/Furto/Receptação', 'Porte ilegal de arma', 'Tráfico/Apreensão de drogas/Uso'], tipificacaoOutro: 'Desobediência',
  apreensaoArmaFogo: '2', apreensaoArmaBranca: '1', apreensaoMunicoes: '45', apreensaoSimulacro: '0',
  apreensaoMoto: '1', apreensaoCarro: '1', apreensaoOutrosVeiculos: '0',
  apreensaoMaconha: '550', apreensaoCrack: '120', apreensaoCocaina: '45', apreensaoOutrasDrogas: '10',
  detalheArmaTipo: 'Pistola', detalheArmaMarca: 'Taurus / Glock', detalheArmaModelo: 'PT380 / G19', detalheArmaCalibre: '.380 / 9mm', detalheArmaMunicoes: '45',
  detalheVeiculoTipo: 'Moto', apreensaoDetalhamento: '1 Moto Honda CG 160 vermelha adulterada.\n1 Veículo Gol prata clonado.\n3 Aparelhos celulares iPhone recolhidos com os suspeitos.\nBalança de precisão e material para embalagem.',
  pessoas: [
    { nome: 'João da Silva', dataNasc: '1990-01-01', vulgo: 'Jão', genitora: 'Maria Silva', endereco: 'Rua A, 123', antecedentes: 'Art 157', vitima: '', acusado: ['Sim', 'Flagrante'], desfecho: ['Inquérito'], testemunha: false, preso: 'Sim' },
    { nome: 'Pedro Henrique', dataNasc: '1992-05-12', vulgo: 'Pedrinho', genitora: 'Ana Costa', endereco: 'Rua B, 456', antecedentes: 'Art 33', vitima: '', acusado: ['Foragido'], desfecho: [], testemunha: false, preso: 'Não' },
    { nome: 'Lucas Almeida', dataNasc: '1985-08-22', vulgo: 'Luquinhas', genitora: 'Clara Almeida', endereco: 'Rua C, 789', antecedentes: 'Nenhum', vitima: 'Não fatal', acusado: [], desfecho: ['BO'], testemunha: true, preso: 'Não' },
    { nome: 'Marcos Vinicius', dataNasc: '1998-11-30', vulgo: 'MV', genitora: 'Lúcia Oliveira', endereco: 'Rua D, 101', antecedentes: 'Furto', vitima: '', acusado: ['Apreendido'], desfecho: ['Auto de Apreensão'], testemunha: false, preso: 'Sim' },
    { nome: 'José Carlos', dataNasc: '1975-02-15', vulgo: 'Zeca', genitora: 'Teresa Carlos', endereco: 'Rua E, 202', antecedentes: 'Homicídio', vitima: '', acusado: ['Sim'], desfecho: ['Inquérito'], testemunha: false, preso: 'Sim' },
    { nome: 'Antônio Marcos', dataNasc: '2001-07-07', vulgo: 'Tonho', genitora: 'Rita Marcos', endereco: 'Rua F, 303', antecedentes: 'Nenhum', vitima: 'Fatal', acusado: ['Óbito'], desfecho: ['BO'], testemunha: false, preso: 'Não' }
  ], 
  narrativa: 'Durante patrulhamento ostensivo e preventivo pela Avenida Beira Mar, a composição da CP-4321 avistou dois indivíduos em atitude suspeita em uma motocicleta vermelha sem placa. Ao ser dada a ordem de parada com sinais sonoros e luminosos, os suspeitos empreenderam fuga, iniciando um acompanhamento tático que se estendeu por cerca de 3 quilômetros.\n\nNa Rua D, os indivíduos perderam o controle da motocicleta e colidiram com um veículo estacionado. Durante a abordagem e busca pessoal, foi encontrada na cintura do garupa uma pistola Taurus calibre .380, municiada, além de uma mochila contendo entorpecentes fracionados para comercialização e três aparelhos celulares de origem duvidosa.\n\nFoi dado voz de prisão aos suspeitos, sendo necessário o uso de algemas conforme a Súmula Vinculante 11 do STF, visando resguardar a integridade física da composição e dos próprios conduzidos. Os indivíduos foram encaminhados à UPA para exames de corpo de delito e, posteriormente, apresentados no 34º DP para os procedimentos cabíveis, juntamente com todo o material apreendido.', 
  delegacia: '34º DP', procedimentoDP: '12345/2026', horaEncerramento: '18:45',
  efetivo: [
    { posto: 'SGT', nomeGuerra: 'Ferreira', matricula: '112233-4', irso: 'S' },
    { posto: 'CB', nomeGuerra: 'Mendes', matricula: '765432-1', irso: 'N' },
    { posto: 'SD', nomeGuerra: 'Oliveira', matricula: '123456-7', irso: 'S' },
    { posto: 'SD', nomeGuerra: 'Carvalho', matricula: '987654-3', irso: 'S' }
  ]
};

export default function RelatorioApp() {
  const [etapaAtual, setEtapaAtual] = useState(1)

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      fichaCiops: '', viatura: '', data: '', horario: '', lat: '', long: '', logradouro: '', numero: '', complemento: '', bairro: '',
      natureza: '', tipificacoes: [], tipificacaoOutro: '',
      apreensaoArmaFogo: '', apreensaoArmaBranca: '', apreensaoMunicoes: '', apreensaoSimulacro: '',
      apreensaoMoto: '', apreensaoCarro: '', apreensaoOutrosVeiculos: '',
      apreensaoMaconha: '', apreensaoCrack: '', apreensaoCocaina: '', apreensaoOutrasDrogas: '',
      detalheArmaTipo: '', detalheArmaMarca: '', detalheArmaModelo: '', detalheArmaCalibre: '', detalheArmaMunicoes: '',
      detalheVeiculoTipo: '', apreensaoDetalhamento: '',
      pessoas: [{ nome: '', dataNasc: '', vulgo: '', genitora: '', endereco: '', antecedentes: '', vitima: '', acusado: [], desfecho: [], testemunha: false, preso: '' }], 
      narrativa: '', delegacia: '', procedimentoDP: '', horaEncerramento: '',
      efetivo: [{ posto: '', nomeGuerra: '', matricula: '' }]
    }
  })

  const proximaEtapa = () => setEtapaAtual((prev) => prev + 1)
  const etapaAnterior = () => setEtapaAtual((prev) => prev - 1)

  const preencherDadosMock = () => {
    methods.reset(dadosDeTeste);
    alert("Carga máxima de dados inserida! Vá para a última etapa gerar o PDF.");
  }

  const onSubmit = async (data: any) => {
    console.log("Submit ignorado. A impressão é feita no Passo 5.")
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-28 relative font-sans">
      <header className="bg-blue-900 text-white p-4 shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">Relatório PMCE</h1>
        <p className="text-xs text-center text-blue-200 mt-1">Passo {etapaAtual} de 5</p>
        <div className="w-full bg-blue-950 rounded-full h-1.5 mt-3">
          <div className="bg-blue-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${(etapaAtual / 5) * 100}%` }}></div>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {etapaAtual === 1 && (
          <button 
            onClick={preencherDadosMock} 
            className="w-full mb-6 bg-yellow-500 text-yellow-900 font-extrabold text-sm p-3 rounded-lg shadow-md border-2 border-yellow-600 hover:bg-yellow-400 active:scale-[0.98] transition-all"
          >
            ⚡ AUTO-PREENCHER CARGA MÁXIMA (TESTE PDF)
          </button>
        )}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {etapaAtual === 1 && <Passo1DadosPrimarios proximaEtapa={proximaEtapa} />}
            {etapaAtual === 2 && <Passo2Natureza proximaEtapa={proximaEtapa} etapaAnterior={etapaAnterior} />}
            {etapaAtual === 3 && <Passo3Apreensoes proximaEtapa={proximaEtapa} etapaAnterior={etapaAnterior} />}
            {etapaAtual === 4 && <Passo4Pessoas proximaEtapa={proximaEtapa} etapaAnterior={etapaAnterior} />}
            {etapaAtual === 5 && <Passo5Finalizacao etapaAnterior={etapaAnterior} />}
          </form>
        </FormProvider>
      </main>
    </div>
  )
}