'use client'
import { useFormContext, useFieldArray } from 'react-hook-form'

interface Props { proximaEtapa: () => void; etapaAnterior: () => void; }
const inputStyle = "w-full p-3 border-2 border-gray-400 rounded-xl bg-white text-black placeholder-gray-500 font-extrabold shadow-sm focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-600 outline-none transition-all";

export default function Passo4Pessoas({ proximaEtapa, etapaAnterior }: Props) {
  const { register, control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: "pessoas" });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {fields.map((field, index) => (
        <div key={field.id} className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4 relative">
          
          <div className="flex justify-between border-b-2 border-gray-100 pb-2">
            <h2 className="text-xl font-extrabold text-black">Envolvido {index + 1}</h2>
            {index > 0 && <button type="button" onClick={() => remove(index)} className="text-red-600 font-extrabold text-lg bg-red-50 px-3 rounded-lg border border-red-200">X Remover</button>}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2"><label className="block text-sm font-bold text-black mb-1">Nome Completo</label><input {...register(`pessoas.${index}.nome`)} className={inputStyle} /></div>
             <div><label className="block text-sm font-bold text-black mb-1">Data Nasc.</label><input type="date" {...register(`pessoas.${index}.dataNasc`)} className={inputStyle} /></div>
             <div><label className="block text-sm font-bold text-black mb-1">Vulgo</label><input {...register(`pessoas.${index}.vulgo`)} className={inputStyle} /></div>
             <div className="col-span-2"><label className="block text-sm font-bold text-black mb-1">Antecedentes</label><input {...register(`pessoas.${index}.antecedentes`)} className={inputStyle} /></div>
             <div className="col-span-2"><label className="block text-sm font-bold text-black mb-1">Genitora</label><input {...register(`pessoas.${index}.genitora`)} className={inputStyle} /></div>
             <div className="col-span-2"><label className="block text-sm font-bold text-black mb-1">Endereço</label><input {...register(`pessoas.${index}.endereco`)} className={inputStyle} /></div>
          </div>

          {/* Qualificações */}
          <div className="pt-4 border-t-2 border-gray-100 mt-6 space-y-5">
             <div className="bg-red-50 p-3 rounded-xl border-2 border-red-100">
               <label className="block text-sm font-extrabold mb-2 text-red-700 uppercase">Situação da Vítima:</label>
               <div className="flex gap-4">
                 {['Fatal', 'Não fatal'].map(t => (
                   <label key={t} className="flex gap-2 items-center text-red-900 font-bold cursor-pointer">
                       <input type="radio" value={t} {...register(`pessoas.${index}.vitima`)} className="w-5 h-5 text-red-600" />{t}
                   </label>
                 ))}
               </div>
             </div>

             <div className="bg-orange-50 p-3 rounded-xl border-2 border-orange-100">
               <label className="block text-sm font-extrabold mb-2 text-orange-800 uppercase">Acusado:</label>
               <div className="flex flex-wrap gap-4">
                 {['Sim', 'Ignorado', 'Foragido', 'Óbito', 'Flagrante', 'Apreendido'].map(t => (
                   <label key={t} className="flex gap-2 items-center text-orange-900 font-bold cursor-pointer">
                       <input type="checkbox" value={t} {...register(`pessoas.${index}.acusado`)} className="w-6 h-6 text-orange-600 rounded" />{t}
                   </label>
                 ))}
               </div>
             </div>

             <div className="bg-blue-50 p-3 rounded-xl border-2 border-blue-100">
               <label className="block text-sm font-extrabold mb-2 text-blue-800 uppercase">Procedimento / Outros:</label>
               <div className="flex flex-wrap gap-4">
                 {['Inquérito', 'TCO', 'BO', 'Auto de Apreensão'].map(t => (
                   <label key={t} className="flex gap-2 items-center text-blue-900 font-bold cursor-pointer">
                       <input type="checkbox" value={t} {...register(`pessoas.${index}.desfecho`)} className="w-6 h-6 text-blue-600 rounded" />{t}
                   </label>
                 ))}
                 <label className="flex gap-2 items-center text-blue-900 font-bold cursor-pointer">
                     <input type="checkbox" {...register(`pessoas.${index}.testemunha`)} className="w-6 h-6 text-blue-600 rounded" />Testemunha
                 </label>
               </div>
             </div>

             <div className="bg-gray-100 p-3 rounded-xl border-2 border-gray-300">
               <label className="block text-sm font-extrabold mb-2 text-black uppercase">Ficou preso?</label>
               <div className="flex gap-6">
                 <label className="flex gap-2 items-center text-black font-bold cursor-pointer">
                     <input type="radio" value="Sim" {...register(`pessoas.${index}.preso`)} className="w-6 h-6 text-blue-600" />Sim
                 </label>
                 <label className="flex gap-2 items-center text-black font-bold cursor-pointer">
                     <input type="radio" value="Não" {...register(`pessoas.${index}.preso`)} className="w-6 h-6 text-blue-600" />Não
                 </label>
               </div>
             </div>
          </div>
        </div>
      ))}

      {fields.length < 6 && (
        <button type="button" onClick={() => append({ nome: '', dataNasc: '', vulgo: '', genitora: '', endereco: '', antecedentes: '', vitima: '', acusado: [], desfecho: [], testemunha: false, preso: '' })}
          className="w-full bg-blue-100 text-blue-900 font-extrabold text-lg p-4 rounded-xl border-4 border-dashed border-blue-300 hover:bg-blue-200 transition-all uppercase">
          + Adicionar Outro Envolvido
        </button>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex gap-3">
          <button type="button" onClick={etapaAnterior} className="w-1/3 bg-gray-300 text-black font-extrabold text-lg p-3 rounded-xl shadow-sm hover:bg-gray-400">Voltar</button>
          <button type="button" onClick={proximaEtapa} className="w-2/3 bg-blue-700 text-white font-extrabold text-lg p-3 rounded-xl shadow-md hover:bg-blue-800">Avançar</button>
        </div>
      </div>
    </div>
  )
}