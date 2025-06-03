import { defineStore } from 'pinia';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import logo from '../assets/images/logo_unas.png';
import { DateFormat, TimeFormat } from '../utils/date';
import { getPatroliById, getPatroliByInstansi } from '../api/patroli';
import { getAktivitasById, getAktivitasByInstansi } from '../api/aktivitas';

export const useAktivitasStore = defineStore('aktivitas', {
  state: () => {
    return {
      aktivitasDetail: null,
      aktivitasData: [],
      selected: 'All',
      error: '',
      loading: false,
      errorDetail: '',
      loadingDetail: false,
      currentPage: 1,
      perPage: 15,
      totalItems: 0,
      paginatedData: [],
      dataPejaten: [],
      dataRagunan: [],
      dataBambuKuning: [],
    };
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.totalItems / state.perPage);
    },
  },
  actions: {
    async fetchAktivitas() {
      this.loading = true;
      try {
        const response = await getAktivitasByInstansi({ nama_instansi: this.selected });
        this.aktivitasData = response.activities;
        this.totalItems = response.activities.length;
        this.currentPage = 1;

        this.aktivitasData.forEach((item) => {
          switch (item.instansi_aktivitas) {
            case 'UNAS Pejaten':
              this.dataPejaten.push(item);
              break;
            case 'UNAS Ragunan':
              this.dataRagunan.push(item);
              break;
            case 'UNAS Bambu Kuning':
              this.dataBambuKuning.push(item);
              break;
            default:
              break;
          }
        });
        this.updatePaginatedData();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async fetchAktivitasById(id) {
      this.loadingDetail = true;
      try {
        const response = await getAktivitasById(id);
        console.log(response);
        // this.aktivitasDetail = response.findPatrolSpesific
      } catch (error) {
        this.errorDetail = error;
      } finally {
        this.loadingDetail = false;
      }
    },
    setSelected(value) {
      this.selected = value;
      this.fetchAktivitas();
    },
    setPage(page) {
      this.currentPage = page;
      this.updatePaginatedData();
    },

    updatePaginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.paginatedData = this.aktivitasData.slice(startIndex, endIndex);
    },

    downloadPdf() {
      const doc = new jsPDF();
      const data = this.aktivitasData; // Assuming patroliData is an array of patroli objects

      // Set title and font for the PDF
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFont('helvetica', 'normal');

      // Add logo (convert the image to base64 for jsPDF)
      const img = new Image();
      img.src = logo; // The logo imported as a URL
      img.onload = () => {
        // Add the logo to the PDF
        doc.addImage(img, 'JPEG', 20, 15, 25, 25); // Adjust the dimensions (x, y, width, height)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(18, 163, 70);
        doc.text('Universitas Nasional', 50, 20);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Badan Administrasi Umum.`, 50, 25);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(
          'Jl. Sawo Manila No.61, RT.14/RW.7, Pejaten Barat., Ps. Minggu, Kota Jakarta Selatan',
          50,
          30,
        );
        doc.text('Daerah Khusus Ibukota Jakarta 12520', 50, 35);
        doc.text('Telepon: (021) 7806700 | Email: info@unas.ac.id', 50, 40);

        // Draw a line under the header to separate it from the content
        doc.line(20, 45, 190, 45);

        doc.setFontSize(10);
        doc.setTextColor(100);
        // Center the text "Rekapitulasi keseluruhan instansi"
        let title = '';
        if (this.selected === 'All') {
          title = 'Rekapitulasi keseluruhan instansi';
        } else {
          title = `Rekapitulasi aktivitas di ${this.selected}`;
        }
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2;
        doc.text(title, x, 52);

        // Define columns for the table
        const columns = ['Petugas', 'Instansi', 'Lokasi Pos', 'Notes', 'Tanggal', 'jam'];

        // Map the patroli data to rows for the table
        const rows = data.map((row) => [
          row.nama_lengkap, // Nama Lengkap
          row.instansi_aktivitas, // Instansi
          row.pos_aktivitas, // Lokasi Pos
          row.notes_aktivitas, // Notes
          DateFormat(row.createdAt), // Tanggal Patroli (formatted)
          TimeFormat(row.createdAt), // Waktu Masuk (assuming createdAt is the entry time)
        ]);

        // Set up AutoTable options
        const options = {
          margin: { top: 55 }, // Start the table after the header
          head: [columns], // Table header
          body: rows, // Table rows
          theme: 'grid', // Grid style for the table
          styles: {
            fontSize: 8, // Font size for table content
            cellPadding: 2, // Padding inside cells
          },
          headStyles: {
            fillColor: [18, 163, 70], // Header color (greenish)
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
        };

        // Generate the table with the configured options
        autoTable(doc, options);

        // Save the generated PDF with a proper filename
        doc.save(`data_aktivitas_${this.selected}.pdf`);
      };
    },
  },
});
