import { defineStore } from 'pinia'
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import logo from '../assets/images/logo_unas.png'
import { deleteAbsensi, getAbsensiById, getAbsensiByLokasi } from '../api/absensi'
import { DateFormat, TimeFormat } from '../utils/date'

export const useAbsensiStore = defineStore('absensi', {
  state: () => {
    return {
      absensiDetail: null,
      absensiData: [],
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
    }
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.totalItems / state.perPage)
    },
  },
  actions: {
    async fetchAbsensi() {
      this.loading = true
      try {
        const response = await getAbsensiByLokasi({ lokasi_absen: this.selected })
        this.absensiData = response.absen
        this.totalItems = response.absen.length
        this.currentPage = 1
        this.updatePaginatedData()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchAbsensiById(id) {
      this.loadingDetail = true
      try {
        const response = await getAbsensiById(id)
        this.absensiDetail = response.absen
      } catch (error) {
        this.errorDetail = error
      } finally {
        this.loadingDetail = false
      }
    },

    async fetchDeleteAbsensi(data) {
      this.loadingDelete = true
      try {
        const response = await deleteAbsensi(data)
        if (response.status === 201) {
          this.absensiData = [...this.absensiData.filter((dt) => dt._id !== data)]
          this.updatePaginatedData()
          return response
        } else {
          throw new Error('Failed to delete absensi')
        }
      } catch (error) {
        this.errorDelete = error
      } finally {
        this.loadingDelete = false
      }
    },
    setSelected(value) {
      this.selected = value
      this.fetchAbsensi()
    },
    setPage(page) {
      this.currentPage = page
      this.updatePaginatedData()
    },

    updatePaginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      this.paginatedData = this.absensiData.slice(startIndex, endIndex)
    },

    downloadPdf() {
      const doc = new jsPDF()
      const data = this.absensiData

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
        doc.text(`Rekap Data Absensi ${this.selected}`, 60, 20)

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
        const columns = [
          'Petugas',
          'Lokasi Absen',
          'Tanggal Absensi',
          'Jam Masuk',
          'Jam Keluar',
          'Total Jam Kerja',
        ]
        const rows = data.map((tdata) => [
          tdata.nama_lengkap,
          tdata.lokasi_absen,
          DateFormat(tdata.createdAt),
          TimeFormat(tdata.checkInTime),
          TimeFormat(tdata.checkOutTime),
          tdata.total_jam_kerja,
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
        doc.save('data_absensi.pdf')
      }
    },
  },
})
