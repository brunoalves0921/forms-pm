import { PDFDocument, rgb } from 'pdf-lib'

export async function preencherPDF(dados: any) {
  try {
    const url = '/relatorio_molde.pdf' // O PDF em branco oficial da PMCE na pasta public
    const response = await fetch(url)
    const pdfBytesOriginal = await response.arrayBuffer()

    const pdfDoc = await PDFDocument.load(pdfBytesOriginal)
    const pages = pdfDoc.getPages()
    
    const primeiraPagina = pages[0] 
    const segundaPagina = pages[1]
    
    const alturaPagina = primeiraPagina.getSize().height;

    // ESSA FUNÇÃO CONVERTE AS COORDENADAS DOS SITES (PDFESCAPE) PARA O CÓDIGO
    const desenharTexto = (pagina: any, texto: string, x: number, y: number) => {
      if (!texto) return
      // Converte o Y do site (top-down) para o Y da biblioteca (bottom-up) com -10 pra ajustar a altura da letra
      const yCorrigido = (alturaPagina - y) - 10;
      pagina.drawText(texto.toUpperCase(), { x: x, y: yCorrigido, size: 10, color: rgb(0, 0, 0) })
    }

    const desenharCheck = (pagina: any, x: number, y: number) => {
      const yCorrigido = (alturaPagina - y) - 10;
      pagina.drawText('X', { x: x, y: yCorrigido, size: 12, color: rgb(0, 0, 0) })
    }

    // =========================================================
    // COMO MAPEAR AS COORDENADAS:
    // 1. Acesse www.pdfescape.com e faça upload do relatorio_molde.pdf
    // 2. Coloque o mouse em cima da linha onde quer a "Viatura"
    // 3. Olhe no topo do site e pegue os números X e Y.
    // 4. Substitua abaixo.
    // =========================================================
    
    // === PASSO 1: DADOS PRIMÁRIOS ===
    // Exemplo de coordenadas (substitua pelos números que você pegar no site)
    desenharTexto(primeiraPagina, dados.viatura, 100, 150) 
    desenharTexto(primeiraPagina, dados.data, 200, 150)
    desenharTexto(primeiraPagina, dados.horario, 300, 150)
    desenharTexto(primeiraPagina, dados.fichaCiops, 400, 150) 
    
    desenharTexto(primeiraPagina, dados.lat, 100, 200) 
    desenharTexto(primeiraPagina, dados.long, 200, 200) 
    desenharTexto(primeiraPagina, dados.logradouro, 100, 250)
    desenharTexto(primeiraPagina, dados.numero, 300, 250)
    desenharTexto(primeiraPagina, dados.complemento, 400, 250) 
    desenharTexto(primeiraPagina, dados.bairro, 100, 300)

    // Exemplo de Checkboxes da Natureza
    if (dados.natureza === 'Delituosa') desenharCheck(primeiraPagina, 100, 350)
    if (dados.natureza === 'Não delituosa') desenharCheck(primeiraPagina, 150, 350)

    // (Continue adicionando desenharTexto e desenharCheck para os outros campos aqui...)
    
    // Efetivo Policial (Tabela na página 2)
    const efetivo = dados.efetivo || []
    efetivo.forEach((pm: any, index: number) => {
        // A cada policial adicionado, ele desce o eixo Y em 20 pontos para a próxima linha da tabela
        let yLinha = 200 + (index * 20); 
        desenharTexto(segundaPagina, pm.posto, 50, yLinha) 
        desenharTexto(segundaPagina, pm.nomeGuerra, 150, yLinha) 
        desenharTexto(segundaPagina, pm.matricula, 350, yLinha) 
        desenharTexto(segundaPagina, pm.irso, 450, yLinha) 
    })

    // Download do arquivo Oficial Perfeito
    const pdfBytesPreenchido = await pdfDoc.save()
    const blob = new Blob([pdfBytesPreenchido as any], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `Relatorio_Oficial_${dados.viatura || ''}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

  } catch (error) {
    console.error("Erro ao gerar o PDF:", error)
    alert("Houve um erro ao gerar o PDF. Verifique o console.")
  }
}