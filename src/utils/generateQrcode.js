import QRCode from 'qrcode'

export const generateQrCode = async (data) => {
  try {
    const url = JSON.stringify(data)
    const qrCodeURL = await QRCode.toDataURL(url, {
      width: 800,
      margin: 2,
      color: {
        dark: '#2F3E46',
      },
    })
    return qrCodeURL
  } catch (error) {
    throw error
  }
}
