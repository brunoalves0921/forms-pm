'use client'
import { useFormContext } from 'react-hook-form'


interface Props { proximaEtapa: () => void; }
// ATUALIZE ESTA LINHA EM TODOS OS PASSOS
const inputStyle = "w-full p-3 border-2 border-gray-400 rounded-xl bg-white text-black placeholder-gray-500 font-extrabold shadow-sm focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-600 outline-none transition-all";
export default function Passo1DadosPrimarios({ proximaEtapa }: Props) {
  const { register } = useFormContext()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Dados Básicos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Ficha Ciops</label><input {...register('fichaCiops')} className={inputStyle} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Viatura</label><input {...register('viatura')} className={inputStyle} placeholder="CP-1701" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Data</label><input type="date" {...register('data')} className={inputStyle} /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Horário</label><input type="time" {...register('horario')} className={inputStyle} /></div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Local da Ocorrência</h2>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Lat. (Sul)</label><input {...register('lat')} className={inputStyle} placeholder="-3.7..." /></div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Long. (Oeste)</label><input {...register('long')} className={inputStyle} placeholder="-38.5..." /></div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Logradouro</label><input {...register('logradouro')} className={inputStyle} /></div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1"><label className="block text-sm font-semibold text-gray-700 mb-1">Número</label><input {...register('numero')} className={inputStyle} /></div>
          <div className="col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-1">Complemento</label><input {...register('complemento')} className={inputStyle} /></div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Bairro</label><input {...register('bairro')} className={inputStyle} /></div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <button type="button" onClick={proximaEtapa} className="w-full max-w-md mx-auto block bg-blue-700 text-white font-bold text-lg p-3 rounded-xl shadow-md hover:bg-blue-800">Avançar para Natureza</button>
      </div>
    </div>
  )
}