# Payment Management System

A full-stack application for managing payments, built with Angular, Material
Design, FastAPI, and MongoDB.

## Features

- **Frontend**: Built with Angular 19 and Material 3 for a responsive and
  interactive UI.
- **Backend**: Powered by FastAPI (Python 3.11) with Pydantic for data
  validation.
- **Database**: MongoDB 8.0 for efficient and scalable data storage.
- **Functionalities**:
  - Display a paginated list of payments.
  - Edit payment details via a modal.
  - Delete payments with confirmation.
  - Datepicker integration for date fields.
  - Notifications for update and delete actions.

---

## Getting Started

### Prerequisites

1. **Frontend**:

   - Node.js (v18 or above)
   - Angular CLI

2. **Backend**:
   - Python 3.11
   - MongoDB 8.0

---

### Installation

#### Clone the Repository

```bash
git clone https://github.com/RainbowGenie/PaymentListManagement.git
cd PaymentListManagement
```

#### Install Dependencies

1. **Frontend**:
   ```bash
    cd frontend
    npm install
   ```
2. **Backend**:
   ```bash
   cd backend
   python -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

#### Running the Applicaion

Update the entironment.tx file with your backend API URL

1. **Frontend**: Start the Angular development server:
   ```bash
    cd frontend
    ng serve
   ```
   Access the application at http://localhost:4200.
2. **Backend**: Start the FastAPI server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   Access the API documentation at http://localhost:8000/docs.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please reach out at danielhagosdev@gmail.com or call
at +1 343 542 3727
