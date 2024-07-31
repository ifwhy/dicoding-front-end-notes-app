class NotesCard extends HTMLElement {
  constructor() {
    super();

    this.body = this.getAttribute('body');
  }
  
  connectedCallback() {
    this.innerHTML = `
      <div class="card flex flex-col justify-content items-center my-5 p-4 rounded-md" style="width:265px; max-width:325px; background-color: #DDE6ED; min-height:200px; position:relative;" id="card">
        <p class="text-base text-center font-semibold" id="card-title"></p>
        <p class="text-left mt-2" id="card-date-time" style="font-size:12px;"></p>
        <p class="text-sm text-justify mt-1" id="card-body">
          ${this.body || 'Isi catatan tidak tersedia'}
        </p>
        <div class="flex flex-row gap-6 justify-center mt-2 text-white" style="position:absolute; bottom: 10%;">

          <button class="px-2 py-1 bg-red-600 rounded-md text-sm font-thin hover:bg-red-800" title="Klik untuk Menghapus Catatan Ini" id="delete">
            <div class="flex gap-2 justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              <p>Hapus</p>
            </div>
          </button>
          <button class="px-2 py-1 bg-blue-600 rounded-md text-sm font-thin hover:bg-blue-800" id="change"></button>
        </div>
      </div>
    `;

    // Mengatur nilai-nilai
    this.querySelector('#card-title').innerText = this.getAttribute('title');
    const dateTimeString = this.getAttribute('date-time');
    const date = new Date(dateTimeString);
  
    // Periksa apakah tanggal valid
    if (!isNaN(date.getTime())) {
      const formattedDate = date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const formattedTime = date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });
      this.querySelector('#card-date-time').innerText = `${formattedDate} pukul ${formattedTime}`;
    } else {
      this.querySelector('#card-date-time').innerText = 'Tanggal tidak valid';
    }
  
    this.querySelector('#card').setAttribute('title', `Catatan ${this.getAttribute('title')}`);

    // Mengatur isi catatan
    this.querySelector('#card-body').innerText = this.getAttribute('body') || 'Isi catatan tidak tersedia';

    // Mengatur tombol arsipkan/aktifkan
    const changeButton = this.querySelector('#change');
    if (this.getAttribute('archived') === 'true') {
      changeButton.innerHTML = `
        <div class="flex gap-2 justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-up"><path d="M12 13V7"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 10 3-3 3 3"/></svg>
          <p>Aktifkan</p>
        </div>
      `;
      changeButton.title = 'Klik untuk Mengaktifkan Catatan ini';
    } else {
      changeButton.innerHTML = `
        <div class="flex gap-2 justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
          <p>Arsipkan</p>
        </div>
      `;
      changeButton.title = 'Klik untuk Mengarsipkan Catatan ini';
    }

    // Tambahkan event listener untuk tombol arsipkan/aktifkan
    changeButton.addEventListener('click', () => {
      if (this.getAttribute('archived') === 'true') {
        this.unarchiveNote();
      } else {
        this.archiveNote();
      }
    });

    // Tambahkan event listener untuk tombol hapus
    this.querySelector('#delete').addEventListener('click', () => {
      this.deleteNote();
    });
  }

  static get observedAttributes() {
    return ['title', 'date-time', 'body', 'archived'];
  }

  // Fungsi untuk mengarsipkan catatan
  archiveNote() {
    const noteId = this.getAttribute('data-id');
    archiveNoteInLocalStorage(noteId);
    renderNotes(); // Render notes setelah diarsipkan
  }

  // Fungsi untuk mengembalikan catatan dari arsip
  unarchiveNote() {
    const noteId = this.getAttribute('data-id');
    unarchiveNoteInLocalStorage(noteId);
    renderNotes(); // Render notes setelah dikembalikan
  }

  // Fungsi untuk menghapus catatan
  deleteNote() {
    const noteId = this.getAttribute('data-id');
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Catatan yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, Hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNoteFromLocalStorage(noteId);
        Swal.fire({
          title: "Catatan Terhapus!",
          text: "Catatan Telah Dihapus",
          icon: "success"
        });
        renderNotes(); // Render notes setelah dihapus
      }
    });
  }
}

customElements.define('note-card', NotesCard);

// Tambahkan fungsi renderNotes di luar kelas NotesCard
const renderNotes = () => {
  const notes = getNotesFromLocalStorage();
  const activeNotesContainer = document.getElementById('card-aktif');
  const archivedNotesContainer = document.getElementById('card-arsip');

  activeNotesContainer.innerHTML = '';
  archivedNotesContainer.innerHTML = '';

  notes.forEach(note => {
    const noteCard = document.createElement('note-card');
    noteCard.setAttribute('title', note.title);
    noteCard.setAttribute('date-time', new Date(note.createdAt).toISOString());
    noteCard.setAttribute('data-id', note.id);
    noteCard.setAttribute('body', note.body);
    noteCard.setAttribute('archived', note.archived);

    if (note.archived) {
      archivedNotesContainer.appendChild(noteCard);
    } else {
      activeNotesContainer.appendChild(noteCard);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const judulCatatan = form.elements.judul;
  const isiCatatan = form.elements.isi_catatan;
  const noteIdInput = document.getElementById('noteId');
  const dateTimeInput = document.getElementById('date-time');

  // Set nilai ID dan tanggal/waktu ketika form dimuat
  noteIdInput.value = generateId();
  dateTimeInput.value = new Date().toISOString().slice(0, 16);

  renderNotes();
});


class LogoTitle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-row justify-start items-center">
        <img src='' alt='' class="w-14 sm:w-16 md:w-18">
        <p class="text-white pl-2 font-bold text-sm sm:text-lg md:text-xl">
          Notes App - Dicoding
        </p>
      </div>
    `;
    const img = this.querySelector('img');
    img.src = this.getAttribute('src');
    img.alt = this.getAttribute('alt');
  }

  static get observedAttributes() {
    return ['src'];
  }
}

customElements.define('logo-title', LogoTitle);

class NameThanks extends HTMLElement {
  constructor() {
    super();
    // Tidak ada Shadow DOM
  }

  connectedCallback() {
    this.innerHTML = `
      <a href="https://instagram.com/ifwhy._" target="_blank">${this.getAttribute('nama')}</a>
      <p>
        <slot>Thank You Dicoding ❤️</slot>
      </p>
    `;
  }

  static get observedAttributes() {
    return ['nama'];
  }
}

customElements.define('name-thanks', NameThanks);
