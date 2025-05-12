// document.addEventListener('DOMContentLoaded', async () => {
    async function fetchMedia() {
        try {
            const mediaTableBody = document.getElementById('media-table-body');
            const response = await fetch('/api/media/'); 
            if (!response.ok) throw new Error('Failed to fetch media data');
            const mediaList = await response.json();
            // mediaTableBody.innerHTML = "";
            console.log(mediaList);
            mediaList.forEach(media => {
                const row = document.createElement('tr');
                const urlCell = document.createElement('td');
                urlCell.textContent = media.url;
                row.appendChild(urlCell);
                const imageCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = media.url;
                img.alt = media.originalname;
                img.style.width = '100px'; 
                imageCell.appendChild(img);
                row.appendChild(imageCell);

                const actionCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteMedia(media._id));
                actionCell.appendChild(deleteButton);
                row.appendChild(actionCell);

                mediaTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching media:', error);
        }
    }

    async function deleteMedia(id) {
        try {
            const response = await fetch(`/api/media/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete media');
            alert('Media deleted successfully');
            fetchMedia(); // Refresh the table
        } catch (error) {
            console.error('Error deleting media:', error);
        }
    }
    fetchMedia();
// });