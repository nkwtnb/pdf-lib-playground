const { PDFDocument, rgb } = require("pdf-lib")

const fs = require("fs")

const makePDF = (pdfBytes: ArrayBuffer, fileName: string) => {
  try {
    fs.writeFileSync('./' + fileName, pdfBytes)
  } catch (err) {
    console.log(err)
    throw err
  }
}

const to01from256 = (r: number, g: number, b: number) => {
  if (r < 0 || r > 255) {
    throw new Error("r is invalid value : " + r)
  }
  if (g < 0 || g > 255) {
    throw new Error("g is invalid value : " + r)
  }
  if (b < 0 || b > 255) {
    throw new Error("b is invalid value : " + r)
  }
  return [
    (r / 255),
    (g / 255),
    (b / 255),
  ]
}

const create = async () => {
  // PDF Creation
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const [r, g, b] = to01from256(248,180,0)
  page.drawText(
    'You can create PDFs!',
    {
      color: rgb(r, g, b),
    }
  )
  const pdfBytes = await pdfDoc.save()
  makePDF(pdfBytes, "test.pdf")
}
const modify = async () => {
  // // PDF Modification
  const uint8Array = fs.readFileSync('./test.pdf')
  const pdfDoc = await PDFDocument.load(uint8Array)
  const pages = pdfDoc.getPages()
  pages[0].drawText(
    'You can modify PDFs too!',
    {
      color: rgb(0, 0.5, 0),
    }
  )
  const pdfBytes = await pdfDoc.save()
  makePDF(pdfBytes, "test2.pdf")
}
const main = async () => {
  await create()
  await modify()
}

main()