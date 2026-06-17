'use client'
import { useFormContext } from 'react-hook-form'

interface Props { proximaEtapa: () => void; etapaAnterior: () => void; }
const tipificacoesLista = ["Homicídio", "Lesão Corporal", "Veículo localizado", "Tráfico/Apreensão de drogas/Uso", "Porte ilegal de arma", "Violência doméstica", "Roubo/Furto/Receptação", "Colisão/Dano/Acidente VTR", "Mandado em aberto", "Crime sexual"];

const inputStyle = "w-full p-3 border-2 border-gray-400 rounded-xl bg-white text-black placeholder-gray-500 font-extrabold shadow-sm focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-600 outline-none transition-all";

export default function Passo2Natureza({ proximaEtapa, etapaAnterior }: Props) {
  const { register } = useFormContext()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4">
        <h2 className="text-xl font-extrabold text-black border-b-2 border-gray-100 pb-2">Natureza da Ocorrência</h2>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 p-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-black font-bold flex-1 cursor-pointer">
            <input type="radio" value="Delituosa" {...register('natureza')} className="w-6 h-6 text-blue-600" />
            Delituosa
          </label>
          <label className="flex items-center gap-2 p-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-black font-bold flex-1 cursor-pointer">
            <input type="radio" value="Não delituosa" {...register('natureza')} className="w-6 h-6 text-blue-600" />
            Não delituosa
          </label>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4">
        <h2 className="text-xl font-extrabold text-black border-b-2 border-gray-100 pb-2">Tipificação</h2>
        <div className="grid grid-cols-1 gap-3">
          {tipificacoesLista.map((tipo) => (
            <label key={tipo} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-2 border-gray-300 text-black font-bold cursor-pointer hover:bg-gray-100">
              <input type="checkbox" value={tipo} {...register('tipificacoes')} className="w-6 h-6 text-blue-600 rounded" />
              {tipo}
            </label>
          ))}
          <div className="mt-4">
            <label className="block text-sm font-extrabold text-black mb-2">Outro (Especifique):</label>
            <input {...register('tipificacaoOutro')} className={inputStyle} placeholder="Digite aqui..." />
          </div>
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