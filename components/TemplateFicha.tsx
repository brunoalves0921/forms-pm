'use client'
import React, { forwardRef } from 'react'

const TemplateFicha = forwardRef(({ dados }: { dados: any }, ref: any) => {
  const d = dados || {};
  const pessoas = d.pessoas || [];
  const efetivo = d.efetivo || [];

  const headerBg = "bg-green-100";

  return (
    <div className="hidden print:block relative">
      {/* CORRIGIDO: dangerouslySetInnerHTML em vez de Content */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { margin: 15mm 10mm; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />

      <div ref={ref} className="bg-white text-black p-4 w-[210mm] mx-auto text-[11px] font-sans leading-tight relative z-10">
        
        {/* CABEÇALHO OFICIAL */}
        <div className="flex flex-col mb-4 break-inside-avoid">
          
          {/* Logo e Títulos (Reorganizados e logo menor h-28) */}
          <div className="flex items-center gap-6 mb-4">
            <img src="/logo.png" alt="Logo PMCE" className="h-28 w-auto object-contain" />
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-extrabold uppercase tracking-wide mt-1">Relatório de Ocorrência</h3>
              <p className="text-xs font-bold uppercase mt-1 text-gray-700">17º BPM - AIS 17</p>
            </div>
          </div>

          {/* Quadro: Para uso do P3 (AGORA EM LINHA HORIZONTAL) */}
          <div className="border-[1.5px] border-black p-1.5 bg-white text-[10px] flex items-center">
            <div className="font-extrabold border-r-[1.5px] border-black pr-3 mr-3 uppercase">Para uso do P3:</div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1"><div className="w-3 h-3 border border-black"></div> RC</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 border border-black"></div> MG</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 border border-black"></div> MC</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 border border-black"></div> RP</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 border border-black"></div> RSP</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 border border-black"></div> RSD</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 border border-black"></div> RSV</div>
            </div>
          </div>

        </div>

        {/* DADOS PRIMÁRIOS */}
        <div className="border-[1.5px] border-black mb-3 break-inside-avoid bg-white">
          <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-[10px]`}>
            Dados Primários
          </div>
          
          <div className="flex border-b border-black">
            <div className="w-1/4 p-1 border-r border-black"><b>Ficha Ciops:</b> {d.fichaCiops}</div>
            <div className="w-1/4 p-1 border-r border-black"><b>Viatura:</b> {d.viatura}</div>
            <div className="w-1/4 p-1 border-r border-black"><b>Data:</b> {d.data}</div>
            <div className="w-1/4 p-1"><b>Horário:</b> {d.horario}</div>
          </div>
          
          <div className="flex border-b border-black">
            <div className="w-1/4 p-1 border-r border-black"><b>Lat (Sul):</b> {d.lat}</div>
            <div className="w-1/4 p-1 border-r border-black"><b>Long (Oeste):</b> {d.long}</div>
            <div className="w-2/4 p-1"><b>Bairro:</b> {d.bairro}</div>
          </div>
          
          <div className="flex">
            <div className="w-1/2 p-1 border-r border-black"><b>Logradouro:</b> {d.logradouro}</div>
            <div className="w-1/6 p-1 border-r border-black"><b>Nº:</b> {d.numero}</div>
            <div className="w-2/6 p-1"><b>Complemento:</b> {d.complemento}</div>
          </div>
        </div>

        {/* NATUREZA E TIPIFICAÇÃO */}
        <div className="border-[1.5px] border-black mb-3 flex break-inside-avoid bg-white">
          <div className="w-1/3 border-r-[1.5px] border-black flex flex-col">
            <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-center text-[10px]`}>
              Natureza da Ocorrência
            </div>
            <div className="p-2 text-center font-bold text-sm flex-1 flex items-center justify-center uppercase">
              {d.natureza}
            </div>
          </div>
          <div className="w-2/3 flex flex-col">
             <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-center text-[10px]`}>
               Tipificação
             </div>
             <div className="p-2 flex-1 flex items-center font-bold">
               {d.tipificacoes?.join(' - ')} {d.tipificacaoOutro && ` - ${d.tipificacaoOutro}`}
             </div>
          </div>
        </div>

        {/* APREENSÕES */}
        <div className="border-[1.5px] border-black mb-3 break-inside-avoid bg-white">
          <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-[10px]`}>
            Apreensões
          </div>
          
          <div className="flex border-b border-black text-center font-bold bg-gray-50">
             <div className="w-1/3 border-r border-black p-1">Armas e Afins</div>
             <div className="w-1/3 border-r border-black p-1">Veículos</div>
             <div className="w-1/3 p-1">Entorpecentes (g)</div>
          </div>

          <div className="flex border-b border-black">
             <div className="w-1/3 flex border-r border-black">
                <div className="w-1/4 p-1 border-r border-black text-center"><b>Fogo</b><br/>{d.apreensaoArmaFogo || 0}</div>
                <div className="w-1/4 p-1 border-r border-black text-center"><b>Branca</b><br/>{d.apreensaoArmaBranca || 0}</div>
                <div className="w-1/4 p-1 border-r border-black text-center"><b>Mun.</b><br/>{d.apreensaoMunicoes || 0}</div>
                <div className="w-1/4 p-1 text-center"><b>Simul.</b><br/>{d.apreensaoSimulacro || 0}</div>
             </div>
             <div className="w-1/3 flex border-r border-black">
                <div className="w-1/3 p-1 border-r border-black text-center"><b>Moto</b><br/>{d.apreensaoMoto || 0}</div>
                <div className="w-1/3 p-1 border-r border-black text-center"><b>Carro</b><br/>{d.apreensaoCarro || 0}</div>
                <div className="w-1/3 p-1 text-center"><b>Outro</b><br/>{d.apreensaoOutrosVeiculos || 0}</div>
             </div>
             <div className="w-1/3 flex">
                <div className="w-1/4 p-1 border-r border-black text-center"><b>Mac.</b><br/>{d.apreensaoMaconha || 0}</div>
                <div className="w-1/4 p-1 border-r border-black text-center"><b>Crack</b><br/>{d.apreensaoCrack || 0}</div>
                <div className="w-1/4 p-1 border-r border-black text-center"><b>Coc.</b><br/>{d.apreensaoCocaina || 0}</div>
                <div className="w-1/4 p-1 text-center"><b>Outr.</b><br/>{d.apreensaoOutrasDrogas || 0}</div>
             </div>
          </div>
          
          <div className="p-2 min-h-[40px] whitespace-pre-wrap">
             <b>Detalhamento de Apreensões:</b> {d.apreensaoDetalhamento}
          </div>
        </div>

        {/* PESSOAS ENVOLVIDAS */}
        <div className="border-[1.5px] border-black mb-3 bg-white">
          <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-[10px] break-inside-avoid`}>
            Pessoas Envolvidas
          </div>
          {pessoas.map((p: any, i: number) => (
            <div key={i} className="border-b border-black p-1.5 last:border-b-0 break-inside-avoid">
              <div className="flex mb-1">
                 <div className="w-1/2"><b>{i+1}. Nome:</b> {p.nome}</div>
                 <div className="w-1/4"><b>Nascimento:</b> {p.dataNasc}</div>
                 <div className="w-1/4"><b>Vulgo:</b> {p.vulgo}</div>
              </div>
              <div className="mb-1 flex">
                 <div className="w-1/2"><b>Genitora:</b> {p.genitora}</div>
                 <div className="w-1/2"><b>Endereço:</b> {p.endereco}</div>
              </div>
              <div className="mb-1"><b>Antecedentes:</b> {p.antecedentes}</div>
              
              <div className="flex gap-2 text-[10px]">
                 <div className="border border-black p-1 flex-1 flex gap-2 items-center bg-white">
                    <b>Vítima:</b> 
                    <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 border border-black flex items-center justify-center font-bold text-[8px]">{p.vitima === 'Fatal' ? 'X' : ''}</div> Fatal</span>
                    <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 border border-black flex items-center justify-center font-bold text-[8px]">{p.vitima === 'Não fatal' ? 'X' : ''}</div> Não fatal</span>
                 </div>
                 <div className="border border-black p-1 flex-1 flex gap-2 items-center bg-white">
                    <b>Ficou Preso?</b> 
                    <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 border border-black flex items-center justify-center font-bold text-[8px]">{p.preso === 'Sim' ? 'X' : ''}</div> Sim</span>
                    <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 border border-black flex items-center justify-center font-bold text-[8px]">{p.preso === 'Não' ? 'X' : ''}</div> Não</span>
                 </div>
              </div>
              <div className="mt-1 font-bold">
                 Qualificação: <span className="font-normal">{p.acusado?.join(', ')}</span> | Procedimento: <span className="font-normal">{p.desfecho?.join(', ')} {p.testemunha ? '- Testemunha' : ''}</span>
              </div>
            </div>
          ))}
        </div>

        {/* NARRATIVA DOS FATOS */}
        <div className="border-[1.5px] border-black mb-3 bg-white">
          <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-[10px] break-inside-avoid`}>
            Dados Complementares - Narrativa dos Fatos
          </div>
          <div className="p-2 whitespace-pre-wrap min-h-[120px] text-[12px]">{d.narrativa}</div>
        </div>

        {/* EFETIVO E DELEGACIA */}
        <div className="flex gap-3 mb-4 break-inside-avoid bg-white">
            <div className="border-[1.5px] border-black flex-[2]">
                <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-[10px]`}>
                  Dados do Efetivo
                </div>
                <div className="flex font-bold border-b border-black text-[10px] bg-gray-50">
                  <div className="flex-1 p-1 border-r border-black">Posto/Grad</div>
                  <div className="flex-[2] p-1 border-r border-black">Nome de Guerra</div>
                  <div className="flex-1 p-1 border-r border-black">Matrícula</div>
                  <div className="flex-1 p-1">IRSO</div>
                </div>
                {efetivo.map((pm: any, i: number) => (
                <div key={i} className="flex border-b border-black last:border-b-0 break-inside-avoid">
                    <div className="flex-1 p-1 border-r border-black">{pm.posto}</div>
                    <div className="flex-[2] p-1 border-r border-black">{pm.nomeGuerra}</div>
                    <div className="flex-1 p-1 border-r border-black">{pm.matricula}</div>
                    <div className="flex-1 p-1 flex items-center justify-center">{pm.irso}</div>
                </div>
                ))}
            </div>

            <div className="border-[1.5px] border-black flex-1 flex flex-col">
                <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-[10px]`}>
                  Dados da Delegacia
                </div>
                <div className="p-1.5 border-b border-black"><b>Delegacia:</b> {d.delegacia}</div>
                <div className="p-1.5 border-b border-black"><b>Nº Procedimento:</b> {d.procedimentoDP}</div>
                <div className="p-1.5"><b>Hora de Encerramento:</b> {d.horaEncerramento}</div>
            </div>
        </div>

        {/* ÁREA DE ASSINATURAS */}
        <div className="border-[1.5px] border-black mb-1 break-inside-avoid bg-white">
          <div className={`${headerBg} font-extrabold p-1 border-b-[1.5px] border-black uppercase text-[10px] text-center`}>
            Assinaturas
          </div>
          <div className="flex">
              <div className="flex-1 p-2 flex flex-col items-center justify-end border-r border-black min-h-[90px]">
                  {d.assinaturaResp ? (
                      <img src={d.assinaturaResp} alt="Assinatura" className="h-14 object-contain mb-1" />
                  ) : (
                      <div className="h-14 mb-1"></div>
                  )}
                  <div className="border-t border-black w-[80%] text-center pt-1 font-bold uppercase text-[9px]">
                      Responsável pelo Preenchimento
                  </div>
              </div>
              <div className="flex-1 p-2 flex flex-col items-center justify-end min-h-[90px]">
                  <div className="h-14 mb-1"></div>
                  <div className="border-t border-black w-[80%] text-center pt-1 font-bold uppercase text-[9px]">
                      Supervisor
                  </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  )
})

TemplateFicha.displayName = 'TemplateFicha';
export default TemplateFicha;