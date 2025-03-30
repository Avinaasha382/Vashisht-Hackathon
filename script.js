document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = document.querySelectorAll('.mode-button');
    const qaSearchInput = document.querySelector('.qa-search-input');
    const documentUpload = document.querySelector('.document-upload');
    const qaInput = document.getElementById('qa-input'); // Input for Q/A & Search
    const documentInput = document.getElementById('document-input'); // Input for Document mode
    const qaForm = document.getElementById('qa-form');
    const documentForm = document.getElementById('document-form');
    const dropZone = document.getElementById('drop-zone');
    const resultsPlaceholder = document.querySelector('.results-placeholder');
    let currentMode = 'qa'; // Default mode
    let uploadedFile = null;

    // Mode switching
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentMode = button.dataset.mode;

            if (currentMode === 'document') {
                qaSearchInput.classList.remove('active');
                documentUpload.classList.add('active');
                resultsPlaceholder.textContent = `Your document summary will appear here`;
            } else {
                qaSearchInput.classList.add('active');
                documentUpload.classList.remove('active');
                qaInput.placeholder = currentMode === 'qa' 
                    ? 'Ask your legal question...' 
                    : 'Search legal cases...';
                resultsPlaceholder.textContent = `Your ${currentMode === 'qa' ? 'answers' : 'search results'} will appear here`;
            }
        });
    });

    // Form submission for Q/A & Search Cases
    qaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputText = qaInput.value.trim();
        if (!inputText) return;

        let apiUrl = `http://127.0.0.1:5000/api/${currentMode}`;
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: inputText })
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            resultsPlaceholder.innerHTML = ""; // Clear previous results

            if (result.answer) {
                // Display the found case details
                if(currentMode === "search")
                {
                    const caseDetails = document.createElement("div"); // Use a div instead of pre
                caseDetails.style.textAlign = "left"; // Ensure left alignment
                caseDetails.style.fontFamily = "Arial, sans-serif"; // Better readability
                caseDetails.style.lineHeight = "1.6"; // Improve spacing
                caseDetails.style.padding = "10px"; // Add padding for spacing
            
                // Pretty-print the case details
                let formattedText = "";
                for (const [key, value] of Object.entries(result.answer)) {
                    let formattedKey = `<strong style="font-size: 16px; color: #333;">${key}:</strong> `;
                    if (Array.isArray(value)) {
                        formattedText += `${formattedKey}<ul style="margin: 5px 0 10px 20px;">` + 
                            value.map(item => `<li>${item}</li>`).join("") + 
                            `</ul>`;
                    } else {
                        formattedText += `<p style="margin: 5px 0;"><strong>${formattedKey}</strong> ${value}</p>`;
                    }
                }
            
                caseDetails.innerHTML = formattedText;
                resultsPlaceholder.appendChild(caseDetails);

                }
                else
                {
                    const caseDetails = document.createElement("p");
                    caseDetails.textContent = JSON.stringify(result.answer, null, 2);
                    resultsPlaceholder.appendChild(caseDetails);
                }
                // Create the Download button (Only for search mode)
                if (currentMode === "search" && result.download_link) {
                    const downloadButton = document.createElement("button");
                    downloadButton.textContent = "Download Case";
                    downloadButton.classList.add("download-btn");

                    // Add event listener for downloading the file
                    downloadButton.addEventListener("click", async () => {
                        const downloadResponse = await fetch(result.download_link);
                        if (downloadResponse.ok) {
                            const blob = await downloadResponse.blob();
                            const url = URL.createObjectURL(blob);
                            console.log(url);
                            // Create an anchor element to trigger the download
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `${inputText}.txt`; // Name the file as case_id.txt
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        } else {
                            alert("Failed to download the case file.");
                        }
                    });

                    resultsPlaceholder.appendChild(downloadButton);
                }
            } else {
                resultsPlaceholder.innerHTML = "<p>Case not found.</p>";
            }
        } catch (error) {
            console.error('Error:', error);
            resultsPlaceholder.textContent = "Error processing request.";
        }

        qaInput.value = '';
    });

    // Form submission for Document Answering
    documentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputText = "Summarize";
        if (!uploadedFile) {
            alert("Please upload a document");
            return;
        }

        let apiUrl = `http://127.0.0.1:5000/api/document`;
        let formData = new FormData();
        formData.append('question', inputText);
        formData.append('file', uploadedFile);

        try {
            const response = await fetch(apiUrl, { method: 'POST', body: formData });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            resultsPlaceholder.textContent = result.answer || "No response received.";
        } catch (error) {
            console.error('Error:', error);
            resultsPlaceholder.textContent = "Error processing request.";
        }

        documentInput.value = '';
    });

    // Drag and drop functionality
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-active');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-active');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-active');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            uploadedFile = files[0];
            document.querySelector('.file-name').textContent = uploadedFile.name;
        }
    });

    // Browse files button
    const browseButton = document.querySelector('.browse-button');
    browseButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,.txt';
        input.style.display = 'none';

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                uploadedFile = file;
                document.querySelector('.file-name').textContent = uploadedFile.name;
            }
        });

        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    });
});
