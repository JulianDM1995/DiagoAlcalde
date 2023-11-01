import fs from 'fs'
import https from 'https'
import pdftopic from 'pdftopic'

export type Descarga = {
  pdfLink: string
  nombre: string
}

export async function descargarArchivosDeClaveros(archivos: Descarga[]) {
  const pdfsCarpeta = './public/CLAVEROS/PDF'
  if (!fs.existsSync(pdfsCarpeta)) {
    fs.mkdirSync(pdfsCarpeta, { recursive: true })
  }

  const imgsCarpeta = './public/CLAVEROS/IMG'
  if (!fs.existsSync(imgsCarpeta)) {
    fs.mkdirSync(imgsCarpeta, { recursive: true })
  }

  let cont = 0
  for (const archivo of archivos) {
    const rutaPdf = `${pdfsCarpeta}/${archivo.nombre}`
    const rutaImg = `${imgsCarpeta}/${archivo.nombre.split('.')[0]}.png`
    console.log(`${cont}: `)
    cont++
    if (!fs.existsSync(rutaPdf)) {
      console.log(`⬇️ Comenzando descarga de: ${archivo.nombre}`)
      const file = fs.createWriteStream(rutaPdf)
      await new Promise((resolve, reject) => {
        https
          .get(archivo.pdfLink, (response) => {
            response.pipe(file)
            file.on('finish', () => {
              file.close()
              resolve(true)
            })
          })
          .on('error', (err) => {
            fs.unlink(rutaPdf, () => reject(err))
          })
      })
    } else {
      console.log(
        `🚫 El archivo ${archivo.nombre} ya existe, se omite la descarga`
      )
    }

    if (!fs.existsSync(rutaImg)) {
      console.log(`🔄 Convirtiendo a imagen: ${archivo.nombre}`)
      const pdf = fs.readFileSync(rutaPdf)
      const converted_result = await pdftopic.pdftobuffer(pdf, 0)
      fs.writeFileSync(rutaImg, converted_result[0])
    } else {
      console.log(
        `🚫 La imagen para ${archivo.nombre} ya existe, se omite la conversión`
      )
    }
  }
}
