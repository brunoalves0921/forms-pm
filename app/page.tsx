'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Passo1DadosPrimarios from '../components/Passo1DadosPrimarios'
import Passo2Natureza from '../components/Passo2Natureza'
import Passo3Apreensoes from '../components/Passo3Apreensoes'
import Passo4Pessoas from '../components/Passo4Pessoas'
import Passo5Finalizacao from '../components/Passo5Finalizacao'

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
    { nome: 'João da Silva', dataNasc: '1990-01-01', vulgo: 'Jão', genitora: 'Maria Silva', endereco: 'Rua A, 123', antecedentes: 'Art 157', vitima: '', acusado: ['Sim', 'Flagrante'], desfecho: ['Inquérito'], testemunha: false, preso: 'Sim' }
  ],
  narrativa: 'Durante patrulhamento...',
  delegacia: '34º DP', procedimentoDP: '12345/2026', horaEncerramento: '18:45',
  efetivo: [
    { posto: 'SGT', nomeGuerra: 'Ferreira', matricula: '112233-4', irso: 'S' }
  ],
  // Mock para teste
  assinaturaNome: 'SD Ferreira',
  assinaturaMatricula: '112233-4'
};

export default function RelatorioApp() {
  const [etapaAtual, setEtapaAtual] = useState(1)

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      fichaCiops: '', viatura: '', data: '', horario: '', lat: '', long: '', logradouro: '', numero: '', complemento: '', bairro: '',
      natureza: '', tipificacoes: [] as string[], tipificacaoOutro: '',
      apreensaoArmaFogo: '', apreensaoArmaBranca: '', apreensaoMunicoes: '', apreensaoSimulacro: '',
      apreensaoMoto: '', apreensaoCarro: '', apreensaoOutrosVeiculos: '',
      apreensaoMaconha: '', apreensaoCrack: '', apreensaoCocaina: '', apreensaoOutrasDrogas: '',
      detalheArmaTipo: '', detalheArmaMarca: '', detalheArmaModelo: '', detalheArmaCalibre: '', detalheArmaMunicoes: '',
      detalheVeiculoTipo: '', apreensaoDetalhamento: '',
      pessoas: [{ nome: '', dataNasc: '', vulgo: '', genitora: '', endereco: '', antecedentes: '', vitima: '', acusado: [] as string[], desfecho: [] as string[], testemunha: false, preso: '' }],
      narrativa: '', delegacia: '', procedimentoDP: '', horaEncerramento: '',
      efetivo: [{ posto: '', nomeGuerra: '', matricula: '', irso: '' }],
      // Adicionando as novas variaveis da assinatura no form
      assinaturaNome: '', assinaturaMatricula: ''
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
      {/* Adicionado print:hidden para o cabecalho nao aparecer no PDF no celular */}
      <header className="bg-blue-900 text-white p-4 shadow-md sticky top-0 z-10 print:hidden">
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
            // Adicionado print:hidden aqui
            className="w-full mb-6 bg-yellow-500 text-yellow-900 font-extrabold text-sm p-3 rounded-lg shadow-md border-2 border-yellow-600 hover:bg-yellow-400 active:scale-[0.98] transition-all print:hidden"
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