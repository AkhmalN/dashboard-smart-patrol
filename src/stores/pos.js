import { defineStore } from 'pinia'
import { CreatePos, deletePos, GetPosByInstansi } from '../api/pos'
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import logo from '../assets/images/logo_unas.png'

export const usePosStore = defineStore('pos', {
  state: () => {
    return {
      pos: [],
      error: '',
      loading: false,
      selected: 'All',
      errorAdd: '',
      loadingAdd: false,
      errorDelete: '',
      loadingDelete: false,
      currentPage: 1,
      perPage: 15,
      totalItems: 0,
      paginatedData: [],
      dataPejaten: [],
      dataRagunan: [],
      dataBambuKuning: [],
    }
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.totalItems / state.perPage)
    },
  },
  actions: {
    async fetchAddPos(data) {
      this.loadingAdd = true
      try {
        const response = await CreatePos(data)
        if (response.data.success) await this.fetchPos()

        return response.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingAdd = false
      }
    },

    async fetchPos() {
      this.loading = true
      try {
        const response = await GetPosByInstansi({ lokasi_pos: this.selected })
        this.pos = response
        this.totalItems = response.length
        this.currentPage = 1
        this.pos.forEach((item) => {
          switch (item.nama_instansi) {
            case 'UNAS Pejaten':
              this.dataPejaten.push(item)
              break
            case 'UNAS Ragunan':
              this.dataRagunan.push(item)
              break
            case 'UNAS Bambu Kuning':
              this.dataBambuKuning.push(item)
              break

            default:
              break
          }
        })
        this.updatePaginatedData()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchDeletePos(data) {
      this.loadingDelete = true
      try {
        const response = await deletePos(data._id)
        this.pos = [...this.pos.filter((dt) => dt._id !== data._id)]
        this.updatePaginatedData()
        return response.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDelete = false
      }
    },

    setSelected(value) {
      this.selected = value
      this.fetchPos()
    },

    setPage(page) {
      this.currentPage = page
      this.updatePaginatedData()
    },

    updatePaginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      this.paginatedData = this.pos.slice(startIndex, endIndex)
    },

    downloadPdf() {
      const doc = new jsPDF()
      const data = this.pos

      // Set title and font for the PDF
      doc.setFontSize(18)
      doc.setTextColor(40)
      doc.setFont('helvetica', 'normal')

      // Add logo (convert the image to base64 for jsPDF)
      const img = new Image()
      img.src = logo // The logo imported as a URL
      img.onload = () => {
        // Add the logo to the PDF
        doc.addImage(img, 'JPEG', 20, 10, 30, 30) // Adjust the dimensions (x, y, width, height)

        doc.setFontSize(20)
        doc.setTextColor(100)
        doc.text(`Rekap Data Pos ${this.selected}`, 60, 20)

        doc.setFontSize(10)
        doc.setTextColor(100)
        doc.text(
          'Jl. Sawo Manila No.61, RT.14/RW.7, Pejaten Bar., Ps. Minggu, Kota Jakarta Selatan',
          60,
          30,
        )
        doc.text('Daerah Khusus Ibukota Jakarta 12520', 60, 35)
        doc.text('Telepon: (021) 7806700 | Email: info@unas.ac.id', 60, 40)

        // Draw a line under the header to separate it from the content
        doc.line(20, 45, 190, 45)

        // Define columns and rows for the table
        const columns = ['Nama Instansi', 'Lokasi Pos']
        const rows = data.map((tdata) => [tdata.nama_instansi, tdata.lokasi_barcode])

        // Set up AutoTable options
        const options = {
          margin: { top: 60 }, // Start the table after the header
          head: [columns], // Table header
          body: rows, // Table rows
          theme: 'grid', // Grid style for the table
          styles: {
            fontSize: 10, // Font size for table content
            cellPadding: 3, // Padding inside cells
            // halign: 'center', // Center-align the text in cells
          },
          headStyles: {
            fillColor: [22, 160, 133], // Header color (greenish)
            textColor: 255, // White text for the header
            fontStyle: 'bold',
            // halign: 'start', // Header text alignment
          },
          bodyStyles: {
            fillColor: [255, 255, 255], // White background for body cells
            textColor: [0, 0, 0], // Black text for body cells
          },
          columnStyles: {
            0: { cellWidth: 'auto' }, // Automatic width for the first column
            1: { cellWidth: 'auto' }, // Automatic width for the second column
          },
        }

        // Generate the table with the configured options
        autoTable(doc, options)

        // Save the generated PDF with a proper filename
        doc.save('data_pos.pdf')
      }
    },
    downloadQrcode(value) {
      console.log(value)
      try {
        const canvas = document.createElement('canvas')
        const img = new Image()
        img.src = value
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)

          const link = document.createElement('a')
          link.href = canvas.toDataURL('image/png')
          link.download = `qrcode.png`
          link.click()
        }
      } catch (error) {
        console.error('Error downloading QR code:', error)
      }
    },
  },
})
