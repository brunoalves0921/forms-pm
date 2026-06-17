'use client'
import { useFormContext } from 'react-hook-form'

interface Props { proximaEtapa: () => void; etapaAnterior: () => void; }
const inputStyle = "w-full p-3 border-2 border-gray-400 rounded-xl bg-white text-black placeholder-gray-500 font-extrabold shadow-sm focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-600 outline-none transition-all";

export default function Passo3Apreensoes({ proximaEtapa, etapaAnterior }: Props) {
  const { register } = useFormContext()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Bloco 1: Quantidades */}
      <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4">
        <h2 className="text-xl font-extrabold text-black border-b-2 border-gray-100 pb-2">Armas e Afins (Qtd)</h2>
        <div className="grid grid-cols-4 gap-2">
          <div><label className="block text-sm font-bold text-black mb-1">Fogo</label><input type="number" {...register('apreensaoArmaFogo')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Branca</label><input type="number" {...register('apreensaoArmaBranca')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Munições</label><input type="number" {...register('apreensaoMunicoes')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Simulacro</label><input type="number" {...register('apreensaoSimulacro')} className={inputStyle} /></div>
        </div>

        <h2 className="text-xl font-extrabold text-black border-b-2 border-gray-100 pb-2 mt-6">Veículos (Qtd)</h2>
        <div className="grid grid-cols-3 gap-2">
          <div><label className="block text-sm font-bold text-black mb-1">Moto</label><input type="number" {...register('apreensaoMoto')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Carro</label><input type="number" {...register('apreensaoCarro')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Outros</label><input type="number" {...register('apreensaoOutrosVeiculos')} className={inputStyle} /></div>
        </div>

        <h2 className="text-xl font-extrabold text-black border-b-2 border-gray-100 pb-2 mt-6">Drogas (Gramas)</h2>
        <div className="grid grid-cols-4 gap-2">
          <div><label className="block text-sm font-bold text-black mb-1">Maconha</label><input type="number" {...register('apreensaoMaconha')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Crack</label><input type="number" {...register('apreensaoCrack')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Cocaína</label><input type="number" {...register('apreensaoCocaina')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Outras</label><input type="number" {...register('apreensaoOutrasDrogas')} className={inputStyle} /></div>
        </div>
      </div>

      {/* Bloco 2: Detalhamentos */}
      <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4">
        <h2 className="text-xl font-extrabold text-black border-b-2 border-gray-100 pb-2">Detalhamento</h2>
        
        <div>
          <label className="block text-sm font-extrabold text-black mb-2">Tipo de Arma</label>
          <div className="flex gap-2 flex-wrap">
            {['Revolver', 'Pistola', 'Espingarda', 'Outra'].map(tipo => (
              <label key={tipo} className="flex gap-2 items-center text-sm bg-gray-100 border-2 border-gray-300 p-2 rounded-lg text-black font-bold cursor-pointer">
                  <input type="radio" value={tipo} {...register('detalheArmaTipo')} className="w-5 h-5 text-blue-600" />{tipo}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div><label className="block text-sm font-bold text-black mb-1">Marca</label><input {...register('detalheArmaMarca')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Modelo</label><input {...register('detalheArmaModelo')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Calibre</label><input {...register('detalheArmaCalibre')} className={inputStyle} /></div>
          <div><label className="block text-sm font-bold text-black mb-1">Mun. Apreendidas</label><input {...register('detalheArmaMunicoes')} className={inputStyle} /></div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-extrabold text-black mb-2">Tipo de Veículo</label>
          <div className="flex gap-2 flex-wrap">
            {['Carro', 'Moto', 'Caminhão', 'Outro'].map(tipo => (
              <label key={tipo} className="flex gap-2 items-center text-sm bg-gray-100 border-2 border-gray-300 p-2 rounded-lg text-black font-bold cursor-pointer">
                  <input type="radio" value={tipo} {...register('detalheVeiculoTipo')} className="w-5 h-5 text-blue-600" />{tipo}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
            <label className="block text-sm font-extrabold text-black mb-2">Outros Detalhamentos</label>
            <textarea {...register('apreensaoDetalhamento')} rows={4} className={`${inputStyle} resize-none`} placeholder="Descreva outras apreensões..." />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex gap-3">
          <button type="button" onClick={etapaAnterior} className="w-1/3 bg-gray-300 text-black font-extrabold text-lg p-3 rounded-xl shadow-sm hover:bg-gray-400">Voltar</button>
          <button type="button" onClick={proximaEtapa} className="w-2/3 bg-blue-700 text-white font-extrabold text-lg p-3 rounded-xl shadow-md hover:bg-blue-800">Avançar</button>
        </div>
      </div>
    </div>
  )
}