import { defineStore } from 'pinia';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import logo from '../assets/images/logo_unas.png';
import { CreateUser, deleteUser, GetUser, GetUsers, updateUser } from '../api/users';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      users: [],
      error: '',
      loading: false,
      errorDetail: '',
      loadingDetail: false,
      errorAdd: '',
      loadingAdd: false,
      errorDelete: '',
      loadingDelete: false,
      errorUpdate: '',
      loadingUpdate: false,
      currentPage: 1,
      perPage: 15,
      totalItems: 0,
      paginatedData: [],
    };
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.totalItems / state.perPage);
    },
  },
  actions: {
    async fetchAddUser(data) {
      this.loadingAdd = true;
      try {
        const response = await CreateUser(data);
        if (response.status === 201) {
          await this.fetchUsers();
          return response;
        } else {
          throw new Error('Failed to add user');
        }
      } catch (error) {
        this.errorAdd = error;
        return error;
      } finally {
        this.loadingAdd = false;
      }
    },
    async fetchEditUser(id, data) {
      this.loadingUpdate = true;
      try {
        const response = await updateUser(id, data);
        if (response.status === 200) {
          await this.fetchUsers();
          return response;
        } else {
          throw new Error('Failed to add user');
        }
      } catch (error) {
        this.errorUpdate = error;
        return error;
      } finally {
        this.loadingUpdate = false;
      }
    },

    async fetchUsers() {
      this.loading = true;
      try {
        const response = await GetUsers();
        this.users = response.users;
        this.totalItems = response.users.length;
        this.currentPage = 1;
        this.updatePaginatedData();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserById(id) {
      this.loadingDetail = true;
      try {
        const response = await GetUser(id);
        this.user = response.user;
      } catch (error) {
        this.errorDetail = error;
      } finally {
        this.loadingDetail = false;
      }
    },

    async fetchDeleteUser(data) {
      this.loadingDelete = true;
      try {
        const response = await deleteUser(data._id);
        if (response.status === 200) {
          this.users = [...this.users.filter((dt) => dt._id !== data._id)];
          this.updatePaginatedData();
          return response;
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loadingDelete = false;
      }
    },

    setPage(page) {
      this.currentPage = page;
      this.updatePaginatedData();
    },

    updatePaginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.paginatedData = this.users.slice(startIndex, endIndex);
    },

    downloadPdf() {
      const doc = new jsPDF();
      const data = this.users;

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
        let title = 'Rekapitulasi pengguna keseluruhan instansi';

        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2;
        doc.text(title, x, 52);

        // Define columns and rows for the table
        const columns = ['Username', 'Nama Lengkap', 'Unit Kerja', 'Role'];
        const rows = data.map((tdata) => [
          tdata.username,
          tdata.nama_lengkap,
          tdata.unit_kerja,
          tdata.role,
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
            // halign: 'center', // Center-align the text in cells
          },
          headStyles: {
            fillColor: [18, 163, 70], // Header color (greenish)
            textColor: 255, // White text for the header
            fontStyle: 'bold',
            halign: 'start', // Header text alignment
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
        doc.save('data_user.pdf');
      };
    },
  },
});
