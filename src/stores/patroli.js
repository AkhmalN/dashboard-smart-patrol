import { defineStore } from 'pinia'
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import logo from '../assets/images/logo_unas.png'
import { deleteAbsensi, getAbsensiById, getAbsensiByLokasi } from '../api/absensi'
import { DateFormat, TimeFormat } from '../utils/date'
import { getPatroliById, getPatroliByInstansi } from '../api/patroli'

export const usePatroliStore = defineStore('patroli', {
  state: () => {
    return {
      patroliDetail: null,
      patroliData: [],
      selected: 'All',
      error: '',
      loading: false,
      errorDetail: '',
      loadingDetail: false,
      errorDelete: '',
      loadingDelete: false,
      currentPage: 1,
      perPage: 15,
      totalItems: 0,
      paginatedData: [],
      dataAman: [],
      dataDemonstrasi: [],
      dataKebakaran: [],
      dataPencurian: [],
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
    async fetchPatroli() {
      this.loading = true
      try {
        const response = await getPatroliByInstansi({ nama_instansi: this.selected })
        this.patroliData = response.patrols
        this.totalItems = response.patrols.length
        this.currentPage = 1

        this.patroliData.forEach((item) => {
          switch (item.status) {
            case 'Aman':
              this.dataAman.push(item)
              break
            case 'Demonstrasi':
              this.dataDemonstrasi.push(item)
              break
            case 'Kebakaran':
              this.dataKebakaran.push(item)
              break
            case 'Pencurian':
              this.dataPencurian.push(item)
              break
            default:
              break
          }
        })
        this.patroliData.forEach((item) => {
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

    async fetchPatroliById(id) {
      this.loadingDetail = true
      try {
        const response = await getPatroliById(id)
        this.patroliDetail = response.findPatrolSpesific
      } catch (error) {
        this.errorDetail = error
      } finally {
        this.loadingDetail = false
      }
    },
    setSelected(value) {
      this.selected = value
      this.fetchPatroli()
    },
    setPage(page) {
      this.currentPage = page
      this.updatePaginatedData()
    },

    updatePaginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      this.paginatedData = this.patroliData.slice(startIndex, endIndex)
    },

    downloadPdf() {
      const doc = new jsPDF()
      const data = this.patroliData // Assuming patroliData is an array of patroli objects

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
        doc.text(`Rekap Data Patroli ${this.selected}`, 60, 20)

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

        // Define columns for the table
        const columns = [
          'Nama Lengkap',
          'Instansi',
          'Lokasi Pos',
          'Status',
          'Notes',
          'Tanggal',
          'jam',
        ]

        // Map the patroli data to rows for the table
        const rows = data.map((patroli) => [
          patroli.nama_lengkap, // Nama Lengkap
          patroli.nama_instansi, // Instansi
          patroli.lokasi_pos, // Lokasi Pos
          patroli.status, // Status
          patroli.notes, // Notes
          DateFormat(patroli.createdAt), // Tanggal Patroli (formatted)
          TimeFormat(patroli.createdAt), // Waktu Masuk (assuming createdAt is the entry time)
        ])

        // Set up AutoTable options
        const options = {
          margin: { top: 60 }, // Start the table after the header
          head: [columns], // Table header
          body: rows, // Table rows
          theme: 'grid', // Grid style for the table
          styles: {
            fontSize: 10, // Font size for table content
            cellPadding: 3, // Padding inside cells
          },
          headStyles: {
            fillColor: [22, 160, 133], // Header color (greenish)
            textColor: 255, // White text for the header
            fontStyle: 'normal',
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
        doc.save('data_patroli.pdf')
      }
    },
  },
})
