'use client'
import { useRef } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import SignatureCanvas from 'react-signature-canvas'
import { useReactToPrint } from 'react-to-print'
import TemplateFicha from './TemplateFicha'

interface Props { etapaAnterior: () => void; }
const inputStyle = "w-full p-3 border-2 border-gray-400 rounded-xl bg-white text-black placeholder-gray-500 font-extrabold shadow-sm focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-600 outline-none transition-all";

export default function Passo5Finalizacao({ etapaAnterior }: Props) {
  const { register, control, watch, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: "efetivo" });
  
  const sigCanvas = useRef<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const dadosAtuais = watch();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Relatorio_Ocorrencia_${dadosAtuais.viatura || 'PMCE'}`,
  });

  const prepararEImprimir = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setValue('assinaturaResp', sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    }
    
    setTimeout(() => {
        handlePrint();
    }, 300);
  }

  const limparAssinatura = () => {
    if (sigCanvas.current) sigCanvas.current.clear();
    setValue('assinaturaResp', null);
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Envolvemos a interface do usuário com print:hidden para NUNCA sair no PDF do celular */}
      <div className="space-y-6 print:hidden">
        
        <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4">
          <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2">
              <h2 className="text-xl font-extrabold text-black">Efetivo Policial</h2>
              <button type="button" onClick={() => append({ posto: '', nomeGuerra: '', matricula: '' })} className="text-blue-700 font-extrabold bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">+ ADD PM</button>
          </div>
          {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-3 gap-3 border-b-2 border-dashed border-gray-200 pb-4 pt-2 relative">
                  {index > 0 && <button type="button" onClick={() => remove(index)} className="absolute top-0 right-0 text-white font-bold bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">X</button>}
                  <div><label className="block text-xs font-bold text-black mb-1">Posto/Grad</label><input {...register(`efetivo.${index}.posto`)} className={inputStyle} placeholder="Ex: SD" /></div>
                  <div className="col-span-2"><label className="block text-xs font-bold text-black mb-1">Nome Guerra</label><input {...register(`efetivo.${index}.nomeGuerra`)} className={inputStyle} /></div>
                  <div className="col-span-2"><label className="block text-xs font-bold text-black mb-1">Matrícula</label><input {...register(`efetivo.${index}.matricula`)} className={inputStyle} /></div>
                  <div><label className="block text-xs font-bold text-black mb-1">IRSO</label><input {...register(`efetivo.${index}.irso`)} className={inputStyle} placeholder="S/N" /></div>
              </div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4">
          <h2 className="text-xl font-extrabold text-black border-b-2 border-gray-100 pb-2">Narrativa dos Fatos</h2>
          <textarea {...register('narrativa')} rows={6} className={`${inputStyle} resize-none`} placeholder="Descreva a ocorrência detalhadamente..." />
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4">
          <h2 className="text-xl font-extrabold text-black border-b-2 border-gray-100 pb-2">Dados da Delegacia</h2>
          <div><label className="block text-sm font-bold text-black mb-1">Delegacia</label><input {...register('delegacia')} className={inputStyle} /></div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><label className="block text-sm font-bold text-black mb-1">Nº Procedimento</label><input {...register('procedimentoDP')} className={inputStyle} /></div>
            <div><label className="block text-sm font-bold text-black mb-1">Hora Encerr.</label><input type="time" {...register('horaEncerramento')} className={inputStyle} /></div>
          </div>
        </div>

        {/* ÁREA DE ASSINATURA NA TELA DO CELULAR */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-gray-200 space-y-4">
          <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2">
              <h2 className="text-xl font-extrabold text-black">Assinatura do Policial</h2>
              <button type="button" onClick={limparAssinatura} className="text-red-600 font-bold text-sm bg-red-50 px-2 py-1 rounded">Limpar</button>
          </div>
          <p className="text-sm font-bold text-gray-500">Assine com o dedo no quadro abaixo:</p>
          <div className="border-4 border-dashed border-gray-300 rounded-xl bg-gray-50 touch-none">
            <SignatureCanvas 
              ref={sigCanvas} 
              penColor="black"
              canvasProps={{ className: 'w-full h-40 rounded-xl' }} 
            />
          </div>
          
          {/* NOVOS CAMPOS DE NOME E MATRÍCULA (Abaixo do desenho) */}
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-sm font-bold text-black mb-1">Nome de Guerra</label>
              <input {...register('assinaturaNome')} className={inputStyle} placeholder="Ex: SD Silva" />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1">Matrícula</label>
              <input {...register('assinaturaMatricula')} className={inputStyle} placeholder="Ex: 123456-7" />
            </div>
          </div>

        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-md mx-auto flex gap-3">
            <button type="button" onClick={etapaAnterior} className="w-1/3 bg-gray-300 text-black font-extrabold text-lg p-3 rounded-xl shadow-sm hover:bg-gray-400">Voltar</button>
            <button type="button" onClick={prepararEImprimir} className="w-2/3 bg-green-600 text-white font-extrabold text-lg p-3 rounded-xl shadow-md hover:bg-green-700 uppercase">
              Gerar Ficha Oficial
            </button>
          </div>
        </div>
      </div>

      {/* TEMPLATE INVISÍVEL PARA IMPRESSÃO - Fica fora do print:hidden */}
      <TemplateFicha ref={printRef} dados={dadosAtuais} />

    </div>
  )
}