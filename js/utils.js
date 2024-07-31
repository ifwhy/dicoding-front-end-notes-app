// Fungsi untuk menambahkan data dummy
const addDummyNotes = () => {
    const notesData = [
        {
          id: 'notes-jT-jjsyz61J8XKiI',
          title: 'Welcome to Notes, Dimas!',
          body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
          createdAt: '2022-07-28T10:03:12.594Z',
          archived: false,
        },
        {
          id: 'notes-aB-cdefg12345',
          title: 'Meeting Agenda',
          body: 'Discuss project updates and assign tasks for the upcoming week.',
          createdAt: '2022-08-05T15:30:00.000Z',
          archived: false,
        },
        {
          id: 'notes-XyZ-789012345',
          title: 'Shopping List',
          body: 'Milk, eggs, bread, fruits, and vegetables.',
          createdAt: '2022-08-10T08:45:23.120Z',
          archived: false,
        },
        {
          id: 'notes-1a-2b3c4d5e6f',
          title: 'Personal Goals',
          body: 'Read two books per month, exercise three times a week, learn a new language.',
          createdAt: '2022-08-15T18:12:55.789Z',
          archived: false,
        },
        {
          id: 'notes-LMN-456789',
          title: 'Recipe: Spaghetti Bolognese',
          body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
          createdAt: '2022-08-20T12:30:40.200Z',
          archived: false,
        },
        {
          id: 'notes-QwErTyUiOp',
          title: 'Workout Routine',
          body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
          createdAt: '2022-08-25T09:15:17.890Z',
          archived: false,
        },
        {
          id: 'notes-abcdef-987654',
          title: 'Book Recommendations',
          body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
          createdAt: '2022-09-01T14:20:05.321Z',
          archived: false,
        },
        {
          id: 'notes-zyxwv-54321',
          title: 'Daily Reflections',
          body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
          createdAt: '2022-09-07T20:40:30.150Z',
          archived: false,
        },
        {
          id: 'notes-poiuyt-987654',
          title: 'Travel Bucket List',
          body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
          createdAt: '2022-09-15T11:55:44.678Z',
          archived: false,
        },
        {
          id: 'notes-asdfgh-123456',
          title: 'Coding Projects',
          body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
          createdAt: '2022-09-20T17:10:12.987Z',
          archived: false,
        },
        {
          id: 'notes-5678-abcd-efgh',
          title: 'Project Deadline',
          body: 'Complete project tasks by the deadline on October 1st.',
          createdAt: '2022-09-28T14:00:00.000Z',
          archived: false,
        },
        {
          id: 'notes-9876-wxyz-1234',
          title: 'Health Checkup',
          body: 'Schedule a routine health checkup with the doctor.',
          createdAt: '2022-10-05T09:30:45.600Z',
          archived: false,
        },
        {
          id: 'notes-qwerty-8765-4321',
          title: 'Financial Goals',
          body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
          createdAt: '2022-10-12T12:15:30.890Z',
          archived: false,
        },
        {
          id: 'notes-98765-54321-12345',
          title: 'Holiday Plans',
          body: 'Research and plan for the upcoming holiday destination.',
          createdAt: '2022-10-20T16:45:00.000Z',
          archived: false,
        },
        {
          id: 'notes-1234-abcd-5678',
          title: 'Language Learning',
          body: 'Practice Spanish vocabulary for 30 minutes every day.',
          createdAt: '2022-10-28T08:00:20.120Z',
          archived: false,
        },
      ];
      
    saveNotesToLocalStorage(notesData);
  };

// Fungsi untuk generate ID
const generateId = () => {
    const randomString = length => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    };

    return `notes-${randomString(2)}-${randomString(13)}`;
};

// Fungsi untuk format tanggal dan waktu ke dalam bahasa Indonesia
const formatDateTime = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Fungsi untuk menyimpan catatan ke local storage
const saveNotesToLocalStorage = notes => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Fungsi untuk mengambil catatan dari local storage
const getNotesFromLocalStorage = () => {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
};

// Tambahkan data dummy jika local storage kosong
  if(getNotesFromLocalStorage().length === 0) {
    addDummyNotes();
}

// Fungsi untuk menghapus catatan dari local storage
const deleteNoteFromLocalStorage = noteId => {
    const notes = getNotesFromLocalStorage();
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotesToLocalStorage(updatedNotes);
};

// Fungsi untuk memindahkan catatan ke arsip di local storage
const archiveNoteInLocalStorage = noteId => {
    const notes = getNotesFromLocalStorage();
    const updatedNotes = notes.map(note => {
        if (note.id === noteId) {
            note.archived = true;
        }
        return note;
    });
    saveNotesToLocalStorage(updatedNotes);
};

// Fungsi untuk mengembalikan catatan dari arsip di local storage
const unarchiveNoteInLocalStorage = noteId => {
    const notes = getNotesFromLocalStorage();
    const updatedNotes = notes.map(note => {
        if (note.id === noteId) {
            note.archived = false;
        }
        return note;
    });
    saveNotesToLocalStorage(updatedNotes);
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const judulCatatan = form.elements.judul;
    const isiCatatan = form.elements.isi_catatan;
    const noteIdInput = document.getElementById('noteId');
    const dateTimeInput = document.getElementById('date-time');

    const renderNotes = () => {
        const notes = getNotesFromLocalStorage();
        const activeNotesContainer = document.getElementById('card-aktif');
        const archivedNotesContainer = document.getElementById('card-arsip');

        activeNotesContainer.innerHTML = '';
        archivedNotesContainer.innerHTML = '';

        notes.forEach(note => {
            const noteCard = document.createElement('note-card');
            noteCard.setAttribute('title', note.title);
            noteCard.setAttribute('date-time', new Date(note.createdAt));
            noteCard.setAttribute('data-id', note.id);
            noteCard.setAttribute('body', note.body);

            if (note.archived) {
                archivedNotesContainer.appendChild(noteCard);
            } else {
                activeNotesContainer.appendChild(noteCard);
            }
        });
    };

    // Set nilai ID dan tanggal/waktu ketika form dimuat
    noteIdInput.value = generateId();
    dateTimeInput.value = new Date().toISOString().slice(0, 16);

    form.addEventListener('submit', event => {
        event.preventDefault();

        const noteId = noteIdInput.value;
        const title = judulCatatan.value;
        const content = isiCatatan.value;
        const createdAt = new Date(dateTimeInput.value).toISOString();

        const newNote = {
            id: noteId,
            title: title,
            body: content,
            createdAt: createdAt,
            archived: false
        };
        
        try {
            const notes = getNotesFromLocalStorage();
            notes.push(newNote);
            saveNotesToLocalStorage(notes);
    
            renderNotes();
    
            // Reset form setelah menambah catatan
            form.reset();
            noteIdInput.value = generateId();
            dateTimeInput.value = new Date().toISOString().slice(0, 16);
    
            Swal.fire({
                title: "Berhasil!",
                text: "Catatan berhasil ditambahkan!",
                icon: "success",
                iconColor: "#526D82",
                confirmButtonColor: "#526D82"
              });
        } catch {
            Swal.fire({
                title: "Gagal!",
                text: "Terjadi kesalahan saat menambah catatan!",
                icon: "error",
                iconColor: "#526D82",
                confirmButtonColor: "#526D82"
              });
        }

    });

    renderNotes();

});
