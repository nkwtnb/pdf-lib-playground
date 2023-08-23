const { PDFDocument } = require("pdf-lib")
const fs = require("fs")

const makePDF = (pdfBytes, fileName) => {
  try {
    fs.writeFileSync('./' + fileName, pdfBytes)
  } catch (err) {
    console.log(err)
    throw err
  }
}

const create = async () => {
  // PDF Creation
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  page.drawText('You can create PDFs!')
  const pdfBytes = await pdfDoc.save()
  makePDF(pdfBytes, "test.pdf")
}
const modify = async () => {
  // // PDF Modification
  const uint8Array = fs.readFileSync('./test.pdf')
  const pdfDoc = await PDFDocument.load(uint8Array)
  const pages = pdfDoc.getPages()
  pages[0].drawText('You can modify PDFs too!')
  const pdfBytes = await pdfDoc.save()
  makePDF(pdfBytes, "test2.pdf")
}
const main = async () => {
  await create()
  await modify()
}

main()