# Virtual Lawyer Chatbot

## 📌 Project Overview

The **Virtual Lawyer Chatbot** is a web-based legal assistant that helps users:

- Ask legal questions and get AI-generated answers (Q/A mode)
- Search for relevant legal cases (Search Cases mode)
- Upload a document and get AI-generated responses based on its content (Document Answering mode)
- **Multilingual Support**!!! Not Comfirtable with English, Dont Worry we got you with multilingual support in thousands of languages

The frontend is built with **HTML, JavaScript, and CSS**, while the backend is powered by **Flask, Sentence Transformers, Facebook Bart** for AI-driven responses.

---

## 📂 Project Structure

```plaintext
Vashisht-Hackathon/
│-- backend/                 # Flask Backend API
│   │-- app.py               # Main Flask app
│   │-- requirements.txt     # Python dependencies
│   │-- qa_model/
    |-- Database.zip 
    |-- Final.json 
    |-- Data.json               # Sentence Transformer model & embeddings
│-- frontend/                # Frontend Code (HTML, CSS, JS)
│   │-- index.html           # Main UI
│   │-- script.js            # Client-side JavaScript
│   │-- styles.css           # Styling
│-- README.md                # Documentation
```

---

## 🔧 Technologies Used

### **Frontend**

- HTML, CSS, JavaScript
- Fetch API for sending requests to backend

### **Backend**

- Python (Flask for API)
- Sentence Transformers (`all-MiniLM-L6-v2`)
- BART Model for RAG(Retrieval-Augmented Generation) tasks (`facebook/bart-large-cnn`)
- Google Translator API (for multilingual support)
- Sklearn (Cosine Similarity for question matching)
- Thresholding for prevention of garbage values.
- Numpy & JSON for data handling

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/yourusername/virtual-lawyer-chatbot.git
cd virtual-lawyer-chatbot
```

### **2️⃣ Setup Backend (Flask API)**

#### **🔹 Install Python Dependencies**

Make sure you have Python installed, then run:

```bash
cd backend
python -m venv env1   # Create a virtual environment
source env1/bin/activate  # (For macOS/Linux)
env1\Scripts\activate  # (For Windows)
pip install -r requirements.txt  # Install dependencies
```
### **3️⃣ Extract Database.zip**

#### **🔹 Start the Flask Server**

```bash
python app.py
```

The API will start at `http://127.0.0.1:5000`

### **4️⃣ Setup Frontend**

No dependencies required! Just open `frontend/index.html` in a browser.


---

## ⚙️ API Endpoints

### **1️⃣ Q/A Mode** (Ask legal questions)

```http
POST /api/qa
```

**Request Body:**

```json
{
  "question": "What is contract law?"
}
```

**Response:**

```json
{
  "answer": "Contract law is a legal framework governing agreements between parties."
}
```

### **2️⃣ Search Cases Mode** (Legal case search)

```http
POST /api/search
```

Similar to Q/A mode but searches in legal case data.

### **3️⃣ Document Answering Mode** (Upload document & get answers)

```http
POST /api/document
```

**Request Body:** FormData with `file`.

---

## 📌 How it Works

1. User selects a mode (`Q/A`, `Search Cases`, or `Document Answering`).
2. Inputs a legal query or uploads a document.
3. The frontend sends a request to the backend.
4. The backend processes the request using **Sentence Transformers** and **Cosine Similarity**.
5. Response is sent back to the frontend and displayed to the user.

---

## 🛠 Future Enhancements

- Improve response accuracy using **fine-tuned legal datasets**.
- Add **OCR support** for extracting text from images.
- Integrate **speech-to-text** for voice-based input.

---

## 🤝 Contributing

Feel free to submit **issues** or **pull requests** to improve this project!

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📧 Contact

For queries, reach out at [**adityapillai0803@gmail.com**](mailto\:adityapillai0803@gmail.com) or open an issue on GitHub!

